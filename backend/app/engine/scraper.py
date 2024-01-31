from io import BytesIO
import re
import requests

def get_pdf_urls(folder_url):
    # Make a request to the Google Drive API to get file information
    api_url = f'https://www.googleapis.com/drive/v3/files?q=%27{folder_url.split("/")[-1]}%27%20in%20parents&key=AIzaSyCyCRyfMF6Gqwl8XaB6WrHG9HUI2MDZ4MQ'
    response = requests.get(api_url)
    #test non access auth to folder
    if response.status_code == 200:
        data = response.json()
        pdf_urls = [f'https://drive.google.com/uc?id={file["id"]}' for file in data.get('files', []) if file['mimeType'] == 'application/pdf']
        return pdf_urls
    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
        return None

def download_pdf_from_url(url):
    try :
        response = requests.get(url, timeout=20)
        if response.status_code == 200:
            return BytesIO(response.content)
        else:
            return None
    except Exception as e:
        print(e)

def extract_head_text(text):
    lines = text.split('\n')
    extract_lines = []
    head_text = ''

    for i, line in enumerate(lines, start=1):
        # extract the lines from the beginning of the text until meeting the keyword 'abstract'
        pattern_abstract = re.compile(r'\b(?:abstract|a b s t r a c t|summary|abstract:|summary:|a b s t r a c t :)\b', re.IGNORECASE)
        match_abstract = re.search(pattern_abstract, line.strip())
        
        if match_abstract:
            break
        
        extract_lines.append(line)

    head_text = '\n'.join(extract_lines)
    
    return head_text 

def extract_title(article_text):
    """Extracts the title of an article from its text."""
    lines = article_text.split('\n')
    extract_lines = []
    data = []

    for i, line in enumerate(lines, start=0):
        if lines[i].strip() == '' :
            break        
        extract_lines.append(lines[i])
        i += 1

    data = '\n'.join(extract_lines)    
    data = data.replace("\n"," ")
    
    return data, i
    
def remove_empty_lines(text):
    return re.sub(r'\n\s*\n', '\n', text)      

def is_email(line):
    email_pattern = re.compile(r'\S+@\S+')
    return bool(re.match(email_pattern, line))

def split_text(input_text,k):
    lines = input_text.split('\n')
    lines = lines[k:]
    # Create a new list excluding lines containing emails
    lines_without_emails = [line if not is_email(line.strip()) else '' for line in lines]

    # Join the lines to reconstruct the text without emails
    input_text_without_emails = '\n'.join(lines_without_emails)

    # Split the text without emails into blocks
    text_blocks = input_text_without_emails.strip().split('\n\n')

    # Trim each block to remove leading and trailing whitespaces
    text_blocks = [block.strip() for block in text_blocks]

    return text_blocks

def extract_authors_institutions(input_text, k):
    text_blocks = split_text(input_text, k)

    authors = []
    institutions = []

    for block in text_blocks:
        # Split each block into lines
        lines = block.split('\n')

        if lines:
            # The first line is the author, append to authors list
            authors.append(lines[0].strip())

            # The rest of the lines are institutions, append to institutions list
            institutions_block = '\n'.join(line.strip() for line in lines[1:] if line.strip())
            institutions.append(institutions_block)

    # Filter out empty strings from authors and institutions
    authors = list(filter(None, authors))
    institutions = list(filter(None, institutions))

    return authors, institutions
 
def extract_references(input_text):
    lines = input_text.split('\n')
    references_started = False
    references_lines = []

    for line in lines:
        # Convert the line to lowercase for case-insensitive matching
        lower_line = line.lower()

        # Check if the line contains the keyword 'references'
        if 'references' in lower_line:
            references_started = True
            continue  # Skip the line containing 'references' itself

        # If 'references' has been found, append the lines to the list
        if references_started:
            references_lines.append(line)
    
    references = '\n'.join(references_lines)
    separator = "["
    references = references.split(separator)
    i = 0
    while i < len(references):
        # Check if the item is empty or contains only spaces
        if references[i] == "" or references[i].isspace():
            del references[i]
        else:
            # Replace '\n' with ' ' in the non-empty item
            references[i] = references[i].replace('\n', ' ')
            i += 1 

    return references               
                            
def extract_keywords(input_text):
    lines = input_text.split('\n')
    keyword_lines = []
    keywords_to_stop = ['introduction', 'css concepts', 'acm reference format:', '1 introduction','1. introduction']
    keywords_started = False
    
    for line in lines:
        # Convert the line to lowercase for case-insensitive matching
        lower_line = line.lower()

        if 'keywords' in lower_line or 'index terms' in lower_line:
            keywords_started = True
            continue 

        if keywords_started:
            # Append the line to the abstract_lines
            keyword_lines.append(line)
                # Check if the line is empty or contains specific keywords to stop
            if not line.strip() or any(lower_line.startswith(keyword) for keyword in keywords_to_stop):
                break
        
    keywords = '\n'.join(keyword_lines).strip() 
    separators = [",", ";", "|", "&",'\n']
    separator_pattern = "|".join(map(re.escape, separators))
    _keywords = re.split(separator_pattern, keywords)
    __keywords = [item for item in _keywords if item.strip() != ""]
    keywords = [item for item in __keywords if item.strip() != " "] ##

    return keywords
  
def extract_abstract(input_text):
    lines = input_text.split('\n')
    abstract_lines = []
    keywords_to_stop = ['introduction', 'css concepts', 'keywords', '1 introduction']
    abstract_started = False
    
    for line in lines:
        # Convert the line to lowercase for case-insensitive matching
        lower_line = line.lower()

        if 'abstract' in lower_line or '1 abstract' in lower_line:
            abstract_started = True
            continue 

        if abstract_started:
            # Append the line to the abstract_lines
            abstract_lines.append(line)
                # Check if the line is empty or contains specific keywords to stop
            if not line.strip() or any(lower_line.startswith(keyword) for keyword in keywords_to_stop):
                break
        

    # Join the lines to form the abstract text
    abstract_text = '\n'.join(abstract_lines).strip()
    abstract_text = abstract_text.replace("\n"," ")

    return abstract_text

def extract_full_text(input_text):
    lines = input_text.split('\n')
    text_lines = []
    keywords_to_stop = ['references', 'acknowledgments']
    text_started = False
    
    for line in lines:
        # Convert the line to lowercase for case-insensitive matching
        lower_line = line.lower()
        
        if 'introduction' in lower_line or '1 introduction' in lower_line or 'i. introduction' in lower_line  or '1. introduction' in lower_line or 'use cases' in lower_line:
            text_started = True
            continue 

        if text_started:
            # Append the line to the abstract_lines
            text_lines.append(line)
                # Check if the line is empty or contains specific keywords to stop
            if any(lower_line.startswith(keyword) for keyword in keywords_to_stop):
                break
        

    # Join the lines to form the abstract text
    text = '\n'.join(text_lines).strip()
    text = text.replace("\n"," ")
    
    return text

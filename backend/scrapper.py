from io import BytesIO
import re
import requests
from pdfminer.high_level import extract_text


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
        response = requests.get(url, timeout=10)
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

def extract_title(article_text,new_text):
    """Extracts the title of an article from its text."""
    lines = article_text.split('\n')
    extract_lines = []
    data = []

    for i, line in enumerate(lines, start=0):
        if lines[i].strip() == '' :
            break        
        new_text=new_text.replace(lines[i],'')
        extract_lines.append(lines[i])
        i += 1

    data = '\n'.join(extract_lines)    
    data = data.replace("\n"," ")
    

    return data, i, new_text

def extract_authors(article_text,k,new_text):
    """Extracts the authors of an article from its text."""
    lines = article_text.split('\n')
    extract_lines = []
    data = []
    words= ['laboratory','institute','university','department','center','school','college']

    if lines[k]=='':
        k+=1
        
    for i, line in enumerate(lines, start=k):
        if lines[i].strip() == '' or lines[i].lower().replace(" ", "").startswith(tuple(words)) or lines[i][0].isdigit()  :
            break    
        
        new_text=new_text.replace(lines[i],'')    
        extract_lines.append(lines[i])
        i += 1

    data = '\n'.join(extract_lines)    
    
    separators = [",", ";", "|", "&", "and"]
    # Create a regular expression pattern that matches any of the separators
    separator_pattern = "|".join(map(re.escape, separators))
    
    _authors = ''.join(char for char in data if not char.isdigit())
    authors = re.split(separator_pattern, _authors)
    data = [item for item in authors if item.strip() != ""]

    return data, i,new_text

def extract_intitutions(article_text,k,new_text):
    """Extracts institutions of an article from its text."""
    lines = article_text.split('\n')
    extract_lines = []
    data = []

    if lines[k]=='':
        k+=1
                
    for i, line in enumerate(lines, start=k):
        if i >= len(lines):
            break    
        new_text=new_text.replace(lines[i],'')
        extract_lines.append(lines[i])
        i += 1

    data = '\n'.join(extract_lines)    
    separator = "\n"
    data = data.split(separator)

    return data,new_text

def extract_abstract_keywords_references_final_text(text):
    """Extracts abstract & keywords & references & final_text of an article from its text."""
    
    lines = text.split('\n')
    extract_lines = []
    abstract=''
    keywords=''
    references=''
    my_text=text

    for i, line in enumerate(lines, start=1):

        ### extract abstract ###
        pattern = re.compile(r'\b(?:abstract|a b s t r a c t|summary|abstract:|summary:|a b s t r a c t :)\b', re.IGNORECASE)
        match = re.search(pattern, line.strip())  
        if match:
            my_text=my_text.replace(line,'')
            extract_lines.append(line)
            line_without_spaces = line.replace(" ", "")            
            if(len(line_without_spaces)<=9):
                # Find the first non-empty line after the match
                while i < len(lines) and not lines[i].strip():
                    i += 1
            # Collect lines until the first empty line or i find 'keyword'
            while i < len(lines) and lines[i].strip():
                if lines[i].lower().replace(" ", "").startswith('keyword') or lines[i].lower().replace(" ", "").startswith('introduction'):
                    break
                my_text=my_text.replace(lines[i],'')
                extract_lines.append(lines[i])
                i += 1
                
            abstract = '\n'.join(extract_lines)
            matched_string = match.group()
            abstract = abstract.replace(matched_string,"")
            abstract = abstract.replace("\n"," ")
            
        ### extract keywords ###
        extract_lines = []
        pattern = re.compile(r'\b(?:keyword|keywords|k e y w o r d s|k e y w o r d|keyword:|keywords:|k e y w o r d s :|k e y w o r d :)\b', re.IGNORECASE)
        match = re.search(pattern, line.strip())  
        if match:
            my_text=my_text.replace(line,'')
            extract_lines.append(line)
            line_without_spaces = line.replace(" ", "")            
            if(len(line_without_spaces)<=9):
                while i < len(lines) and not lines[i].strip():
                    i += 1    
            while i < len(lines) and lines[i].strip():
                my_text=my_text.replace(lines[i],'')
                extract_lines.append(lines[i])
                i += 1
                
            keywords = '\n'.join(extract_lines)    
            matched_string = match.group()
            keywords = keywords.replace(matched_string,"")
            separators = [",", ";", "|", "&",'\n']
            separator_pattern = "|".join(map(re.escape, separators))
            _keywords = re.split(separator_pattern, keywords)
            keywords = [item for item in _keywords if item.strip() != ""]
                        
        ### extract references ###   
        extract_lines = []
        pattern = re.compile(r'\b(?:reference|references|r e f e r e n c e s|r e f e r e n c e|reference:|references:|r e f e r e n c e s :|r e f e r e n c e :)\b', re.IGNORECASE)
        match = re.search(pattern, line.strip())          
        if match:
            my_text=my_text.replace(line,'')
            extract_lines.append(line)            
            line_without_spaces = line.replace(" ", "")
            if(len(line_without_spaces)<=11):
                while i < len(lines) and not lines[i].strip():
                    i += 1    
            # Collect lines until the end
            while i < len(lines) :
                my_text=my_text.replace(lines[i],'')
                extract_lines.append(lines[i])
                i += 1
            references = '\n'.join(extract_lines)
            matched_string = match.group()
            references = references.replace(matched_string,"")
            
    my_text = re.sub('\n+', '\n', my_text).strip()
    return abstract, keywords, references, my_text
    
def remove_empty_lines(text):
    return re.sub(r'\n\s*\n', '\n', text)      

def extract_text_from_list_pdf(pdf_urls):
    if pdf_urls:
        for pdf_url in pdf_urls:
            pdf_buffer = download_pdf_from_url(pdf_url)
            if pdf_buffer:
                
                text=extract_text(pdf_buffer)
                # abstract, keywords, references
                abstract, keywords, references, ne_text=extract_abstract_keywords_references_final_text(text)
                
                b_text = extract_head_text(text)
                print('abstract :\n',abstract,'keywords:\n',keywords,'references:\n',references)
                #titles, authors,institutions
                titles, i, n_text =extract_title(b_text,new_text=ne_text)
                authors, j, _text=extract_authors(b_text,k=i,new_text=n_text)
                institutions,new_text=extract_intitutions(b_text,k=j,new_text=_text)
                print('title :\n',titles,'authors:\n',authors,'institutions:\n',institutions)
                #text of the article
                new_text = re.sub('\n+', '\n', new_text).strip()
                ################send to elastic search
            else:
                print(f"Failed to download PDF from {pdf_url}")
            
if __name__ == '__main__':

    folder_url = 'https://drive.google.com/drive/u/1/folders/1HPpYklybqUbP2Mik6vwSs3prGsdjddlD'
    text=extract_text_from_list_pdf(get_pdf_urls(folder_url))


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

def extract_text_from_list_pdf(pdf_urls):
    if pdf_urls:
        for pdf_url in pdf_urls:
            #print(pdf_url)
            pdf_buffer = download_pdf_from_url(pdf_url)
            if pdf_buffer:
                # Extract text from the PDF buffer
                
                extract_abstract(extract_text_from_pdf_buffer(pdf_buffer))
            else:
                print(f"Failed to download PDF from {pdf_url}")
   
def download_pdf_from_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        return BytesIO(response.content)
    else:
        return None

def extract_text_from_pdf_buffer(pdf_buffer):
    text = extract_text(pdf_buffer,page_numbers=[0])
    return text

def extract_title(text):
    pass

def extract_abstract(text):
    lines = text.split('\n')
    abstract_lines = []
    
    for i, line in enumerate(lines, start=1):
        pattern = re.compile(r'\b(?:abstract|a b s t r a c t|summary|abstract:|summary:|a b s t r a c t :)\b', re.IGNORECASE)
        match = re.search(pattern, line.strip())  # Use fullmatch to match the entire line
        
        if match:
           break
        #before exiting the loop i want to keep the line where the match was found 

    # Find the first non-empty line after the match
    while i < len(lines) and not lines[i].strip():
        i += 1
    
    # Collect lines until the first empty line
    while i < len(lines) and lines[i].strip():
        abstract_lines.append(lines[i])
        i += 1
          
    abstract_paragraph = '\n'.join(abstract_lines)
    print(abstract_paragraph) 
            

def extract_authors(text):
    pass

def extract_intitutions(text):
    pass
 
def extract_keywords(text):
    pass
 
def extract_refrences(text):
    pass

def extract_final_text_article(text):
    #delete contributions,...
    pass


if __name__ == '__main__':
    # Example Usage
    folder_url = 'https://drive.google.com/drive/u/1/folders/1HPpYklybqUbP2Mik6vwSs3prGsdjddlD'
    pdf_urls = get_pdf_urls(folder_url)
    text=extract_text_from_list_pdf(pdf_urls)


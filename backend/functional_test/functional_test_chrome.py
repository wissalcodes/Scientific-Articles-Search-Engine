from selenium import webdriver
import time

# TEST SELENIUM AVEC CHROME DRIVER #
# se connecter à un compte utilisateur puis tester la recherche #

url = "http://localhost:5173/sign_in"

driver = webdriver.Chrome()

try:
    # Open the website
    driver.get(url)
    
    #se connecter à un compte utilisateur #
    email_element = driver.find_element('css selector', 'input[type="text"]')
    email_element.send_keys("test_func@example.com")  

    password_element = driver.find_element('css selector', 'input[type="password"]')
    password_element.send_keys("test")  

    connecter_button = driver.find_element('css selector', 'button')
    connecter_button.click()
    
    time.sleep(3)

    # tester la recherche #
    
    # Find the input element by class name
    input_element = driver.find_element('css selector', 'input[placeholder="Rechercher des articles..."]')

    # Input search terms
    input_element.send_keys("a")

    # Find the button by class name and click it
    button_element = driver.find_element('class name', 'font-lora')
    button_element.click()

    time.sleep(3)

    # Check if the expected result is displayed
    result_element = driver.find_element('class name', 'font-merryweather')
    result_text = result_element.text

    assert "Résultats de la recherche" in result_text

finally:
    # Close the browser window
    driver.quit()

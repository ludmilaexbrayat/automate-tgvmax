from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions
import re
from time import sleep

url = "https://www.oui.sncf/"

information = {
    'depart': 'Montpellier',
    'arrivee': 'Paris',
    'numero_carte': '500381016',
    'jour_naissance': '23',
    'mois_naissance': '08',
    'annee_naissance': '1995',
    'specific_age': '24', # automate this
    'day': '29',
    'month': '10',
    'year': '2019',
    'hour': '7'
}

location = {
    'depart': "vsb-origin-train-launch",
    'arrivee': "vsb-destination-train-launch",
    'depart_first_result': "vsb-origin-0",
    'arrivee_first_result': "vsb-destination-0",
    'close_policy': 'cookie-policy-close',
    'close_bot': 'js__ouibot-ancrage__close',
    'carte_reduction': "passenger_1_train-launch-discount-card-type",
    'numero_carte': "passenger_1_train-launch-discount-card-number",
    'date_naissance': "passenger_1_train-launch-discount-card-dateofbirth",
    'jour_naissance': '//*[@id="passenger_1_train-launch-discount-card-dateofbirth"]/div[1]/input[1]',
    'mois_naissance': '//*[@id="passenger_1_train-launch-discount-card-dateofbirth"]/div[1]/input[2]',
    'annee_naissance': '//*[@id="passenger_1_train-launch-discount-card-dateofbirth"]/div[1]/input[3]',
    'rechercher_button': "vsb-booking-train-launch-submit",
    'tranche_age': 'passenger_1_train-launch-typology',
    'specific_age': 'passenger_1_train-launch_age',
    'open_calendar': '//*[@id="vsb-departure-train-launch-date-time"]/div[1]/div/div[1]',
    'date': 'train-launch-d-'+information['day']+'-'+information['month']+'-'+information['year'],
    'hour': 'vsb-departure-train-launch-modal-start-time',
    'close_calendar': "vsb-departure-train-launch-modal-submit",
    'prices': "//button[@class='price-button price-button-best-price' or @class='price-button']",
    'je_choisis_cet_aller': "//button[@class='oui-button___3560 travel-card__submit']",
    'je_valide_cet_aller': "//button[@class='oui-button___3560 oui-button__placement']",
    'afficher_les_trajets_suivants': '//span[contains(text(), "Afficher les trajets suivants")]',
    'continuer_1': "//button[@class='oui-button___3635 oui-button--medium___3635']",
    'continuer_2': '//*[@id="cart-container"]/div/div[1]/div[1]/div[2]/span[2]/button',
    'genre': '//*[@id="contact-container"]/div/section/div[3]/form/div[1]/div[1]/div/section/div[3]/div[1]/div/div[1]/label[1]',
    'check_box': '//*[@id="contact-container"]/div/section/div[3]/form/div[2]/div[3]/div/div/label',
    'valider_ma_commande': '//*[@id="contact-container"]/div/section/div[3]/form/div[2]/div[5]/button'
}


def launch_search(request):
    # Starting a webdriver
    driver = webdriver.Chrome(ChromeDriverManager().install())

    # Opening Chrome
    driver.get(url)

    # Closing pop ups
    driver.find_element_by_id(location['close_policy']).click()
    driver.find_element_by_id(location['close_bot']).click()

    # Filling the information for the depart
    driver.find_element_by_id(location['depart']).send_keys(information['depart'])
    WebDriverWait(driver, 30).until(expected_conditions.element_to_be_clickable((By.ID, location['depart_first_result']))).click()

    # Filling the information for the arrivee
    #driver.implicitly_wait(10)
    driver.find_element_by_id(location['arrivee']).send_keys(information['arrivee'])
    WebDriverWait(driver, 30).until(expected_conditions.element_to_be_clickable((By.ID, location['arrivee_first_result']))).click()

    # Filling the information for the date
    driver.find_element_by_xpath(location['open_calendar']).click()
    driver.find_element_by_id(location['date']).click()
    driver.implicitly_wait(10)
    Select(driver.find_element_by_id(location['hour'])).select_by_value(information['hour'])
    driver.find_element_by_id(location['close_calendar']).click()

    # Selecting age range
    driver.implicitly_wait(10)
    Select(driver.find_element_by_id(location['tranche_age'])).select_by_value('typology-YOUNG')
    driver.find_element_by_id(location['specific_age']).send_keys(information['specific_age'])

    # Selecting TGVMax option
    Select(driver.find_element_by_id(location['carte_reduction'])).select_by_value('HAPPY_CARD')

    # Filling information on TGVMax
    #driver.implicitly_wait(10)
    WebDriverWait(driver, 30).until(expected_conditions.presence_of_element_located((By.ID, location['numero_carte']))).send_keys(information['numero_carte'])
    driver.find_element_by_id(location['date_naissance']).click()
    driver.find_element_by_xpath(location['jour_naissance']).send_keys(information['jour_naissance'])
    driver.find_element_by_xpath(location['mois_naissance']).send_keys(information['mois_naissance'])
    driver.find_element_by_xpath(location['annee_naissance']).send_keys(information['annee_naissance'])

    # Launching the search
    driver.implicitly_wait(10)
    driver.find_element_by_id(location['rechercher_button']).click()

    found_train = False
    continue_search = True

    # Scrapping the results
    myElem = WebDriverWait(driver, 10).until(expected_conditions.presence_of_element_located((By.XPATH, location['prices'])))
    print("Page is loaded")
    sleep(15)

    while continue_search:
        print('Checking if a TGVMax is available')
        # Check if there is a TGVMax available
        all_spans = driver.find_elements_by_xpath(location['prices'])
        for index, span in enumerate(all_spans):
            if span.text.find('€') != -1:
                price = re.findall('\d+', span.text[:span.text.find('€')])[0]
                if price == '0':
                    print('Found a train!')
                    found_train = True
                    sleep(5)
                    print('Clicking the train')
                    span.click()
                    break

        if found_train:
            # If a train was found, click it
            print('Clicking Je choisis cet aller')
            WebDriverWait(driver, 10).until(expected_conditions.element_to_be_clickable((By.XPATH, location['je_choisis_cet_aller']))).click()
            sleep(5)
            print('Clicking Je valide cet aller')
            WebDriverWait(driver, 10).until(expected_conditions.element_to_be_clickable((By.XPATH, location['je_valide_cet_aller']))).click()
            continue_search = False
        else:
            # If no train was found, expand the list of trains available
            try:
                WebDriverWait(driver, 30).until(expected_conditions.presence_of_element_located((By.XPATH, location['afficher_les_trajets_suivants']))).click()
                print('Expanding the list')
            except:
                continue_search = False
                print('No TGVMax available for this day')
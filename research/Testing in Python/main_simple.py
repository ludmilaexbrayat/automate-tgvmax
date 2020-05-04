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
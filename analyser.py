import pandas as pd

DATA = pd.read_csv('data.csv').drop(['client_id', 'card_id'], axis=1)
DATA['client_age'] = 2022 - DATA['birth_date']


def mean_age() -> int:
    return DATA['client_age'].mean()


def mean_gender() -> str:
    return DATA['gender'].value_counts()

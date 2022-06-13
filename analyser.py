import pandas as pd

DATA = pd.read_csv('data.csv').drop(['client_id', 'card_id'], axis=1)
DATA['client_age'] = 2022 - DATA['birth_date']


def mean_age() -> int:
    ''' Return mean age '''
    return DATA['client_age'].mean()


def mean_gender() -> str:
    ''' Return mean gender '''
    return DATA['gender'].value_counts().to_dict()


def popular_cities() -> dict[str, int]:
    ''' Return 5 cities with the biggest number of clients '''
    cities = DATA['city'].value_counts().to_dict()

    cities_filtered = {}
    n_of_city = 0
    for key, value in cities.items():
        if n_of_city < 5:
            cities_filtered[key] = value
            n_of_city += 1
        else:
            if 'Остальные' not in cities_filtered.keys():
                cities_filtered['Остальные'] = 0
            cities_filtered['Остальные'] += value
    return cities_filtered


def ad_analytics() -> dict[str, list]:
    ''' Return list with of people joined in bank this year
    '2022': [1111, 2222, 3333,...], where 1111 - January, 2222 - February, 3333 - March .. etc. '''
    create_dates = DATA['create_date'].value_counts().sort_index(ascending=False).to_dict()

    research = {}
    for key, value in create_dates.items():
        year, month, _ = key.split('-')
        if year not in research.keys():
            research[year] = {}
        if month not in research[year].keys():
            research[year][month] = 0
        research[year][month] += value

    result_values = {}
    for key in research.keys():
        for month in sorted(research[key]):
            if key not in result_values.keys():
                result_values[key] = []
            result_values[key].append(research[key][month])

    return result_values


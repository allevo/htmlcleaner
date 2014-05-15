from bs4 import BeautifulSoup

import requests


class Gazzetta:
    def __init__(self, url):
        self.url = url

    def get_data(self):
        response = requests.get(url)

        soup = BeautifulSoup(response.text)
        header = soup.find(class_='container-header-article', recursive=True).find_all(['h1', 'h2'])
        header = map(lambda x: x.text, header)

        content = map(lambda x: x.text, soup.find_all(class_='desc-article'))

        return {
            'header': header,
            'content': content,
        }

class CNN:
    def __init__(self, url):
        self.url = url

    def get_data(self):
        response = requests.get(url)

        soup = BeautifulSoup(response.text)
        header = soup.find(class_='cnn_storyarea').find('h1').text
        content = map(lambda x: x.text, soup.find(class_='cnn_storyarea').find_all(class_='cnn_storypgraphtxt'))
        return {
            'header': header,
            'content': content
        }

url = 'http://edition.cnn.com/2014/05/14/world/europe/uk-teenage-cancer-fundraiser/index.html'
cnn = CNN(url)
print cnn.get_data()


#url = 'http://www.gazzetta.it/Nuoto/07-05-2014/nuoto-pellegrini-segnata-giochi-londra-ora-penso-solo-rio-80596557935.shtml'
#gaz = Gazzetta(url)
#parsed = gaz.get_data()
#print parsed



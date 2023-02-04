from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from decouple import config

from aggregate_data import aggrgate_animal_data

DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)
session = requests.Session()

pf_base = 'https://api.petfinder.com/v2'

data = {
  'grant_type': 'client_credentials',
  'client_id': config('PETFINDER_CLIENT', default=''),
  'client_secret': config('PETFINDER_SECRET', default='')
}

CORS(app)

'''
    Routes
'''

@app.route('/get_animals', methods=['GET'])
def get_animals_route():
    get_authentiated()
    response_object = {'status': 'unsuccessful'}

    page = request.args.get('page')
    if page is None: 
        page = 1
    
    animals = get_animals_multipage(int(page))
    if len(animals) > 0:
        response_object['status'] = 'success'
        response_object['animals'] = animals
    
    return jsonify(response_object)

@app.route('/get_animals_multipage', methods=['GET'])
def get_animals_multipage_route():
    get_authentiated()
    response_object = {'status': 'unsuccessful'}

    take = request.args.get('take')
    if take is None: 
        take = 1

    take = int(take)
    
    animals = get_animals_multipage(take)
    if len(animals) > 0:
        response_object['status'] = 'success'
        response_object['animals'] = animals
    
    return jsonify(response_object)

''' 
    Methods
'''

def get_animals(page = 1):
    response = requests.get(
        f'{pf_base}/animals?page={page}', 
        headers = session.headers
    )

    if response.status_code == 401:
        get_authentiated()
    else:
        return response.json()

def get_animals_multipage(take = 5):
    response = {
        'animals': [],
        'data': {},
        'pagination': {}
    }

    response_list = []
    
    for num in range(take):
        animal_page = get_animals(num + 1)
        if num + 1 == 1:
            response['pagination'] = animal_page['pagination']
        
        response_list = response_list + animal_page['animals']
    
    response['animals'] = response_list

    response['data'] = aggrgate_animal_data(response_list)

    return response

def get_authentiated():
    response = session.post(f'{pf_base}/oauth2/token', data = data)
    token = response.json()['access_token']
    session.headers.update({'Authorization': f'Bearer {token}'})
    get_animals()

'''
    Initialization
'''

if __name__ == "__main__":
    app.run()
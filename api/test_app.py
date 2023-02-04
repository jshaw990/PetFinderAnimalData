import json

from app import app

def test_get_animals_route():
    response = app.test_client().get('/get_animals')
    res = json.loads(response.data.decode('utf-8')).get('animals')
    assert response.status_code == 200
    assert type(res) is dict

def test_get_animals_multipage_route():
    response = app.test_client().get('/get_animals_multipage')
    res = json.loads(response.data.decode('utf-8')).get('animals')
    assert response.status_code == 200
    assert type(res) is dict

test_get_animals_route()
test_get_animals_multipage_route()
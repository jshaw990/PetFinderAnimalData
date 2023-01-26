from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/ping', methods=['GET'])
def ping_pong():
    response_object = {'status': 'success'}
    return jsonify(response_object)

if __name__ == "__main__":
    app.run()
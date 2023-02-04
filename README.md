# PetFinder Animal Data

## Author
[Jayden Shaw](https://github.com/jshaw990)

## Setup instructions
1. Clone or [download](https://github.com/jshaw990/PetFinderAnimalData/archive/refs/heads/master.zip) the Github repository
2. Visit [petfinder.com](https://www.petfinder.com/developers/v2/docs/#get-animals), create an account or login, and acquire a client and secret key
3. Complete the client and server installation steps below

### Client
1. In a terminal window from the project directory (aggregateDashboard) run the command:
~~~
cd client
~~~
2. In the client folder, run the following command in the terminal:
~~~
npm install
~~~
3. Once the node_modules have been installed, run:
~~~
npm run jest
~~~
Where you should see seven passed tests
4. Run in the terminal: 
~~~
npm run dev
~~~
5. Navigate in your browser to [localhost:3000](http://localhost:3000/)

### Server
1. In a terminal window from the project directory (aggregateDashboard) run the command:
~~~
cd api
~~~
2. In the api folder, run the either of the following commands in the terminal:
~~~
pip install -r requirements.txt
~~~
~~~
pip3 install -r requirements.txt
~~~
3. In the api directory, create a file called *.env*
4. In the *.env* file, add the following: 
~~~
PETFINDER_CLIENT = "<ADD YOUR CLIENT KEY HERE>"
PETFINDER_SECRET = "<ADD YOUR SECRET KEY HERE>"
~~~
5. Once the packages have been installed and you've added your Pet Finder keys, run either of the two commands: 
~~~
python -m pytest
~~~
~~~
python3 -m pytest
~~~
Where you should see two passed tests
6. Run in the terminal either of the two commands:
~~~
python app.py
~~~
~~~
python3 app.py
~~~
7. The flask server will now be running at [127.0.0.1:5000](http://127.0.0.1:5000)

## Technologies utilized
### Client
- Vue/Nuxt
- Typescript
- Jest
- Vuetify
- uuidv4

### Server
- Python 3
- Flask
- Requests
- Pandas
- PyTest

## Features
- Responsive user interface
- Client side caching of data utilizing local storage
- Full typescript compatability
- Informative data tables with sorting functionality
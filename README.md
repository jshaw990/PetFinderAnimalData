# Pet Finder Animal Data

## Author
[Jayden Shaw](https://github.com/jshaw990)

## Setup instructions
1. Clone or download the Github repository
2. Complete the client and server installation steps below

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
3. Once the packages have been installed, run either of the two commands: 
~~~
python -m pytest
~~~
~~~
python3 -m pytest
~~~
Where you should see two passed tests
4. Run in the terminal either of the two commands:
~~~
python app.py
~~~
~~~
python3 app.py
~~~
5. The flask server will now be running at [127.0.0.1:5000](http://127.0.0.1:5000)
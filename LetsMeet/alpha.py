from flask import Flask, render_template, request, redirect
from models import *
from db_helper import setup_db
from tinydb import Query
app = Flask(__name__)

events = setup_db('events.json')

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/new_event', methods=['GET', 'POST'])
def new_event():
    if request.method == 'GET':
        return render_template('new_event.html')
    event = make_event(request.form)
    id = events.insert(event)
    return redirect("/event/"+str(id), code=302)


@app.route('/event/<event_id>', methods=['GET'])
def get_event(event_id):
    event = events.get(eid = int(event_id) )
    return render_template('event.html', event=event)

if __name__ == '__main__':
    app.run()

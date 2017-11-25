from flask import Flask, render_template, request
from models import *


app = Flask(__name__)
events = {} # Who needs a DB when you've got a globalish variable


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/new_event', methods=['GET', 'POST'])
def new_event():
    if request.method == 'GET':
        return render_template('new_event.html')
    event = make_event(request.form)
    id = 0 if not events else max(events.keys()) + 1
    events[id] = event

    return "Created event with id "+str(id)


@app.route('/event/<event_id>', methods=['GET'])
def get_event(event_id):
    event = events[int(event_id)]
    return render_template('event.html', event=event)


if __name__ == '__main__':
    app.run()
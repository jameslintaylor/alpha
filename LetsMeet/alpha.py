from flask import Flask, render_template, request, redirect
from models import *
from db_helper import setup_db
from tinydb import Query

app = Flask(__name__)

db = setup_db('events.json')
events = db.table('events')
users = db.table('users')


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/new_event', methods=['GET', 'POST'])
def new_event():
    if request.method == 'GET':
        return render_template('new_event.html')
    form = request.form
    event = make_event(form)
    host = users.get(Query().name == form['username'], Query().contact == form['contact'])
    event['host'] = host.eid if host else users.insert({'name': form['username'], 'contact': form['contact']})
    eid = events.insert(event)
    return redirect("/event/" + str(eid), code=302)


@app.route('/event/<event_id>', defaults={'identity': None}, methods=['GET'])
@app.route('/event/<event_id>/<identity>', methods=['GET'])
def get_event(event_id, identity):
    event = events.get(eid=int(event_id))
    host = users.get(eid=event['host'])
    user = identity and users.get(eid=int(identity))
    return render_template('event.html', event=event, host_name=host['name'], user = user)



if __name__ == '__main__':
    app.run()

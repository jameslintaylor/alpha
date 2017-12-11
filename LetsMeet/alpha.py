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


@app.route('/new_event/', methods=['GET'])
def new_event_page():
    return render_template('new_event.html')


def get_or_create_user(name, contact):
    user = users.get(Query().name == name, Query().contact == contact)
    return user.eid if user else users.insert({'name': name, 'contact': contact})


def str_slot(slot):
    return str(slot[0]) + ' to ' + str(slot[1])


@app.route('/new_event/', methods=['POST'])
def create_new_event():
    form = request.form
    event = make_event(form)
    event['host'] = get_or_create_user(form['username'], form['contact'])
    eid = events.insert(event)
    return redirect("/event/" + str(eid), code=302)


@app.route('/event/<event_id>/', defaults={'identity': None}, methods=['GET'])
@app.route('/event/<event_id>/<identity>/', methods=['GET'])
def event_page(event_id, identity):
    event = events.get(eid=int(event_id))
    host = users.get(eid=event['host'])
    user = identity and users.get(eid=int(identity))

    good_times = event.get('good_times', {})
    attendees = [users.get(eid=int(user_id)) for user_id in good_times.keys()]
    attendee_names = list(map(lambda a: a['name'], attendees))

    attendance_table = {str_slot(slot): [] for slot in event['slots']}
    for slot, availability in attendance_table.items():
        for attendee in attendees:
            availability.append(True)

    return render_template('event.html',
                           event=event,
                           host_name=host['name'],
                           user=user,
                           attendee_names=attendee_names,
                           attendance_table=attendance_table)


@app.route('/event/<event_id>/', defaults={'identity': None}, methods=['POST'])
@app.route('/event/<event_id>/<identity>/', methods=['POST'])
def post_availability(event_id, identity):
    form = request.form
    event = events.get(eid=int(event_id))
    identity = identity or str(get_or_create_user(form['username'], form['contact']))

    attendance = event.get('good_times', {})

    # TODO Finding out how to update by EID is hard, this is a real bugaboo waiting to cause trouble
    events.update({'good_times': {identity: list(map(lambda s: s.split(' to '), form.getlist('goodtime')))}}, Query().name == event['name'])

    return redirect("/event/" + str(event.eid) + '/' + str(identity), code=302)


if __name__ == '__main__':
    app.run()

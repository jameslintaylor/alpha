from flask import Flask, render_template, request, redirect, jsonify
from db_helper import setup_db
from tinydb import Query
from tinydb.operations import delete

app = Flask(__name__)

db = setup_db('events.json')
events = db.table('events')
invitees = db.table('invitee')


def fresh_id_for(table):
    return max(map(lambda e: e['id'], table.all())) + 1


def get_or_create_user(name, email, number):
    invitee = invitees.get(Query().name == name, Query().email == email, Query().number == number)
    if invitee:
        return invitee['id']
    else:
        fresh_id = fresh_id_for(invitees)
        invitee.insert({'id': fresh_id,
                        'name': name,
                        'email': email,
                        'number': number})
        return fresh_id


def str_slot(slot):
    return str(slot[0]) + ' to ' + str(slot[1])


'''
{
  "id": 0,
  "name": "Vegan Barbecue",
  "owner": "drodman@dprk.nk",
  "timeslots": [
    {
      "id": 0,
      "start": "2017-09-30T12:30:00",
      "end": "2017-09-30T16:30:00",
      "yes": [0],
      "no": []
    },
    {
      "id": 1,
      "start": "2017-09-31T12:00:00",
      "end": "2017-09-31T15:00:00",
      "yes": [],
      "no": [0]
    }
  ],
  "invitees": [
    {
      "id": 0,
      "name": "Sally",
      "email": "inabarbieworld@aol.com",
      "number": "123-456-7891"
    },
    {
      "id": 1,
      "name": "Enrique",
      "email": "enriqueiglasias@gmail.com",
      "number": "123-321-1144"
    }
  ],
}
'''


@app.route('/event/', methods=['POST'])
def create_event():
    event = request.get_json()
    events.insert(event)
    return jsonify(event)


@app.route('/event/<event_id>/', methods=['GET'])
def read_event(event_id):
    event = events.get(Query().id == int(event_id))
    return jsonify(event)


@app.route('/event/<event_id>/', methods=['PUT'])
def update_event(event_id):
    event = events.get(Query().id == int(event_id))
    if not event:
        return '', 404
    event.update(request.get_json())
    events.remove(Query().id == int(event_id))
    events.insert(event)
    return jsonify(event)


@app.route('/event/<invitee_id>/', methods=['DELETE'])
def delete_event(invitee_id):
    invitees.remove(Query().id == int(invitee_id))
    return ('', 204)



'''
{
  id: 0,
  name: "Sally",
  email: "inabarbieworld@aol.com",
  number: "123-456-7891"
}
'''
@app.route('/invitee/', methods=['POST'])
def create_invitee():
    invitee = request.get_json()
    invitees.insert(invitee)
    return jsonify(invitee)


@app.route('/invitee/<invitee_id>/', methods=['GET'])
def read_invitee(invitee_id):
    invitee = invitees.get(Query().id == int(invitee_id))
    return jsonify(invitee)


@app.route('/invitee/<invitee_id>/', methods=['PUT'])
def update_invitee(invitee_id):
    invitee = invitees.get(Query().id == int(invitee_id))
    if not invitee:
        return '', 404
    invitee.update(request.get_json())
    invitees.remove(Query().id == int(invitee_id))
    invitees.insert(invitee)
    return jsonify(invitee)


@app.route('/invitee/<invitee_id>/', methods=['DELETE'])
def delete_invitee(invitee_id):
    invitees.remove(Query().id == int(invitee_id))
    return '', 204


if __name__ == '__main__':
    app.run()

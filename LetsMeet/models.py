from datetime import datetime, timedelta
import math

def make_event(details):
    startTime = datetime.strptime(details['date'] + ' ' + details['start'], '%Y-%m-%d %H:%M')
    endTime = datetime.strptime(details['date'] + ' ' + details['end'], '%Y-%m-%d %H:%M')

    event = {
        'length': timedelta(hours=float(details['length'])),
        'name': details['eventname'],
    }

    event['slots'] = [[startTime + (n) * event['length'],
                       startTime + (n + 1) * event['length']]
                      for n in range(0, math.floor((endTime - startTime) / event['length']))]

    return event
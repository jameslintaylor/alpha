from dateutil.tz import tzutc, tzlocal
from tinydb import TinyDB
from tinydb.storages import JSONStorage
from tinydb_serialization import SerializationMiddleware, Serializer
from tinydb import Query
from datetime import datetime, date, timedelta

class DateTimeSerializer(Serializer):
    """
    This class handles both aware and naive datetime objects.

    Encoding: If the datetime object is aware, it is first converted to UTC and then encoded with an 'A' appended to the serialization. Otherwise it is serialized without conversion and an 'N' is appended.

    Decoding: If the serialization ends with 'A', the datetime object is treated as UTC and then converted to localtime. Otherwise, the datetime object is treated as localtime and no conversion is necessary.

    This serialization discards both seconds and microseconds but preserves hours and minutes.
    """

    OBJ_CLASS = datetime

    def encode(self, obj):
        """
        Serialize naive datetimes objects without conversion but with 'N' for 'Naive' appended. Convert aware datetime objects to UTC and then serialize them with 'A' for 'Aware' appended.
        """
        if obj.tzinfo is None:
            return obj.strftime('%Y%m%dT%H%MN')
        else:
            return obj.astimezone(tzutc()).strftime('%Y%m%dT%H%MA')

    def decode(self, s):
        """
        Return the serialization as a datetime object. If the serializaton ends with 'A',  first converting to localtime and returning an aware datetime object. If the serialization ends with 'N', returning without conversion as a naive datetime object.
        """
        if s[-1] == 'A':
            return datetime.strptime(s[:-1], '%Y%m%dT%H%M').replace(tzinfo=tzutc()).astimezone(tzlocal())
        else:
            return datetime.strptime(s[:-1], '%Y%m%dT%H%M')


class DateSerializer(Serializer):
    OBJ_CLASS = date  # The class handles date objects

    def encode(self, obj):
        """
        Serialize the naive date object without conversion.
        """
        return obj.strftime('%Y%m%d')

    def decode(self, s):
        """
        Return the serialization as a date object.
        """
        return datetime.strptime(s, '%Y%m%d').date()


class TimeDeltaSerializer(Serializer):
    OBJ_CLASS = timedelta  # The class handles timedelta objects

    def encode(self, obj):
        """
        Serialize the timedelta object as days.seconds.
        """
        return "{0}.{1}".format(obj.days, obj.seconds)

    def decode(self, s):
        """
        Return the serialization as a timedelta object.
        """
        days_seconds = (int(x) for x in s.split('.'))
        return timedelta(*days_seconds)

def setup_db(file):
    serialization = SerializationMiddleware(JSONStorage)
    serialization.register_serializer(DateTimeSerializer(), 'TinyDatetime')
    serialization.register_serializer(DateSerializer(),'TinyDate')
    serialization.register_serializer(TimeDeltaSerializer(),'TinyTimeDelta')

    db = TinyDB(file, storage=serialization)
    return db
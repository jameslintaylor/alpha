export default [
  {
    url: "http://127.0.0.1:5000/event/",
    method: "post",
    contentType: 'application/json',
    data: {
      name: "vegan barbecue",
      owner: "drodman@dprk.nk",
      timeslots: [
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
      ]
    }
  }
]

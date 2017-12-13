import axios from 'axios';

const idmap = (selections, value) => {
  return {
    '1': true
  }
}

export const vote = (name, event, selections) => {
  console.log("voting!!!!");

  axios({
    url: `http://52.15.63.64:5000/event/${event}/vote`,
    method: "post",
    contentType: 'application/json',
    data: {
      name: name,
      ...idmap(selections)
    }
  })
    .then(console.log)
    .catch(console.error)
}

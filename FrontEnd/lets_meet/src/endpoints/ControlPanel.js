import React from 'react'
import axios from 'axios'

import tests from './tests'

const testButton = (request) => {

  const send = () => {
    axios(request)
      .then(console.log)
      .catch(console.error)
  }
  
  return (
    <button
      onClick={send}>
      {request.url}
    </button>
  )
}

const ControlPanel = ({_}) => (
  <div>
    {tests.map(testButton)}
  </div>
)

export default ControlPanel

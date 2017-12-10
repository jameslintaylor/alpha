import React from 'react'
import { connect } from 'react-redux'
import { showPopup } from '../actions'

import TimeSlot from '../Components/TimeSlot'
import Popup from '../Components/Popup'
import LMDialog from '../Components/LMDialog'

import Logo from '../images/Logo.svg'
import './Results.css'

const green = "#A2DE97"
const red = "#FC847E"

const div = (props, content) => (
  <div {...props}>{content}</div>
)

const partial = (f, ...fixed) => (...rest) => f(...fixed, ...rest)
const first = (f, xs) => {
  for (let i in xs)
    if (f(xs[i])) return xs[i]
  return null
}
const contains = (x, xs) => {
  if (first((y) => x == y, xs) != null)
    return true
  return false
}

// what's that, just use a hash table you say? no!
const emailForInvitee = (invitees, id) => first((x) => x.id == id, invitees).email

const splitByStatus = (invitees, date) => {
  let all = invitees.map((x) => x.id)
  let yes = date.yes
  let no = date.no
  let pending = all.filter((x) => !contains(x, yes) && !contains(x, no))
  return { all, yes, no, pending }
}

const percentageBar = (pct) => (
  <div className="pct-bar-container">
    <div className="pct-bar-bg">
      <div className="pct-bar-fg" style={{width: `${pct}%`, backgroundColor: (pct > 50) ? green : red}}>
      </div>
    </div>
    <div className="pct-label"> {`${pct}%`} </div>
  </div>
)  

const resultForDate = (popup, invitees, date) => {
  let { all, yes, no, pending } = splitByStatus(invitees, date)
  let [emailsYes, emailsPending, emailsNo] = [yes, no, pending]
      .map((xs) => xs.map(partial(emailForInvitee, invitees)))

  let pct = (yes.length/invitees.length)*100

  let selectDialogContents = (
    <LMDialog style={{width: 400, height: 300}}>
      <div>
        {date.id}
      </div>
    </LMDialog>
  )

  return (
    <div key={date.id} className="result-container">
      <div className="timeslot-container">
        <TimeSlot />
      </div>
      {percentageBar(pct)}
      <button onClick={() => popup(selectDialogContents)}> Select </button>
    </div>
  )
}

const Results = ({invitees, dates, popup}) => {

  return (
    <div id="results-page">
      <a href="/"><img src={Logo} alt="logo" id="top-logo" /></a>
      <div id="results-container">
        {dates.map(partial(resultForDate, popup, invitees))}
      </div>
      <Popup />
    </div>
  )
}

const mockInvitees = [
  {
    id: 0,
    email: "johnnya@gmail.com"
  },
  {
    id: 1,
    email: "alicern@gmail.com"
  },
  {
    id: 2,
    email: "carlyk@gmail.com"
  },
  {
    id: 3,
    email: "mary@gmail.com"
  },
  {
    id: 4,
    email: "jake@gmail.com"
  }
]

// for testing
const mockDates = [
  {
    id: 0,
    start: Date("2017-09-30T10:30:00"),
    end: Date("2017-09-30T11:30:00"),
    yes: [0, 1],
    no: [2, 3]
  },
  {
    id: 1,
    start: Date("2017-09-31T15:30:00"),
    end: Date("2017-09-31T16:30:00"),
    yes: [1, 3, 4],
    no: [0]
  }
]

const mapStateToProps = (state) => ({
  invitees: mockInvitees,
  dates: mockDates
})

const mapDispatchToProps = (dispatch) => ({
  popup: (body) => dispatch(showPopup(body))
})

export default connect(mapStateToProps, mapDispatchToProps)(Results);

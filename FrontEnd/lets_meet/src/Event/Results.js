import React from 'react'
import { connect } from 'react-redux'
import { showPopup } from '../actions'

import TimeSlot from '../Components/TimeSlot'
import Popup from '../Components/Popup'
import LMDialog from '../Components/LMDialog'

import Logo from '../images/Logo.svg'
import './Results.css'

import _forward from '../images/Progress_Arrow.svg';

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

const emailElement = (email) => (<div key={email} className='select-email'>{email}</div>)

const resultForDate = (popup, invitees, date) => {
  let { all, yes, no, pending } = splitByStatus(invitees, date)
  let [emailsYes, emailsPending, emailsNo] = [yes, no, pending]
      .map((xs) => xs.map(partial(emailForInvitee, invitees)))
  
  let pct = (yes.length/invitees.length)*100

  let selectDialogContents = (
    <LMDialog style={{width: 400, height: 300}}
              onSuccess={() => console.log("yeah!!!")}>
      <div id='select-dialog-container'>
        <div id='select-dialog-title'>Confirm Event Time?</div>
        <div id='select-dialog-date'>Sep 30 10:30-11:30am</div>
        <div className='select-header'>These invitees cannot attend</div>
        {emailsNo.map(emailElement)}
        <div className='select-header'>These invitees have not responded</div>
        {emailsPending.map(emailElement)}
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

  console.log("the dates bruv", dates);

  // kind of a poor choice was made when structuring state but oh well
  let { pending } = splitByStatus(invitees, dates[0])
  let awaitingText = `Awaiting ${pending.length} Response${pending.length > 1 ? 's' : ''} from Invitees`

  let emailsPending = pending
      .map(partial(emailForInvitee, invitees))
  
  let awaitingDialogContents = (
    <LMDialog style={{width: 400, height: 300}}
              onSuccess={() => console.log("yeah!!!")}>
      <div id='select-dialog-container'>
        <div className='select-header'>These invitees have not responded</div>
        {emailsPending.map(emailElement)}
      </div>
    </LMDialog>
  )

  return (
    <div id='results-page'>
      <a href="/"><img src={Logo} alt="logo" id="top-logo" /></a>
      <div id="results-container">
        {dates.map(partial(resultForDate, popup, invitees))}
      </div>
      <div id='results-footer'>
        <img
          id='footer-back-button'
          alt=''
          src={_forward}
          onClick={null} />
        <div id='awaiting-dialog-button'
             onClick={() => popup(awaitingDialogContents)}>
          {awaitingText}
        </div>
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
    yes: [1],
    no: [2]
  },
  {
    id: 1,
    start: Date("2017-09-31T15:30:00"),
    end: Date("2017-09-31T16:30:00"),
    yes: [2],
    no: [1]
  }
]

// idk what I'm doing anymore
const deserializethisdatebruv = ({id, start, end, yes, no}) => ({
  id,
  start: Date(start),
  end: Date(end),
  yes,
  no
})

const mapStateToProps = ({ managedEvent }) => {
  return {
    invitees: managedEvent.invitees,
    dates: managedEvent.timeslots.map(deserializethisdatebruv)
  }
}

const mapDispatchToProps = (dispatch) => ({
  popup: (body) => dispatch(showPopup(body))
})

export default connect(mapStateToProps, mapDispatchToProps)(Results);

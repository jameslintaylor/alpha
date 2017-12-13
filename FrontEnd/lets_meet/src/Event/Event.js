import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import axios from 'axios';
import FormInputText from '../Components/FormInputText';
import EventManagement from './EventManagement';

import { setManagedEvent } from '../actions'

import Logo from '../images/Logo.svg';
import ProgressArrow from '../images/Progress_Arrow.svg';
import './Event.css';

class Event extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    var content = <NoCode {...this.props}/>
        return (
          <div className="page" id="event-page">
            <a href="/"><img src={Logo} alt="logo" id="top-logo" /></a>
            <div className="content">
              {content}
            </div>
          </div>
        )
  }

}

class NoCode extends React.Component{

  componentWillMount(){
    this.setState({code:""})
  }

  render(){
    
    const submit = ()=>{
      axios({
        url: `http://52.15.63.64:5000/link/${this.state.code}`,
        method: "get",
        contentType: 'application/json',
      })
        .then((response) =>{
          this.props.manageEvent(response.data)
          this.props.push("/event/" + response.data.id)
        })
        .catch((error)=>{
          console.log("no such event!");
        })
    }

    const setCode = (text)=>{
      this.setState({code:text.trim()})
    };

    return (
      <div className="padded-top">
        <h2>Enter Invite code</h2>
        <label style={{fontWeight:"200"}}>Check your inbox or cellphone</label><br/>
        <FormInputText onChange={setCode} onDone={submit} prompt="Invite Code" />
        <button onClick={submit}  style={{marginTop:"20px",transform:"translateY(18px)"}}  className="arrow"><img alt="continue"src={ProgressArrow} className="continue" /></button>
      </div>
    )
  }
}

const mapStateToProps = ({ managedEvent }) => {
  return {
    ok: "things"
  }
}

const mapDispatchToProps = (dispatch) => ({
  push: (url) => dispatch(push(url)),
  manageEvent: (event) => dispatch(setManagedEvent(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(Event);

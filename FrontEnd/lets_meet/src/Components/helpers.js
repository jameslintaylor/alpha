import React from 'react'
import axios from 'axios';

// idk what I'm doing anymore
const deserializethisdatebruv = ({id, start, end, yes, no}) => ({
  id,
  start: new Date(start),
  end: new Date(end),
  yes,
  no
})

export const withManagedEvent = (Wrapped) => {
  return class extends React.Component {

    componentWillMount() {
      console.log("fetching event");
      this.setState({ pendingEvent: true })
      
      axios({
        url: `http://52.15.63.64:5000/event/${this.props.match.params.id}`,
        method: "get",
        contentType: 'application/json',
      })
        .then((response) => {
          console.log("got an event!")
          // deserialize the dates here because I don't care
          this.setState({
            event: {
              ...response.data,
              dates: response.data.timeslots.map(deserializethisdatebruv)
            },
            pendingEvent: false
          })
        })
        .catch((error) => {
          console.log("no such event!");
          this.setState({
            event: null,
            pendingEvent: false
          })
        })
    }
    
    render() {

      console.log("event: ", this.state.event);
      
      switch (this.state.pendingEvent) {
      case true:
        return (<div>fetching event</div>)
      case false:
        return this.state.event && (
          <Wrapped
            managedEvent={this.state.event}
            {...this.props} />
        ) || (<div>event does not exist</div>)
      }
    }
  }
}


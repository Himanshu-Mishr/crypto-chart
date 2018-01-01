import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import io from 'socket.io-client';
import CCC from '../CCC.js';

class ChartContainer extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      // BTC for default
      symbol : this.props.match.params.symbol || 'BTC',
      data : {}
    }
    this.dataUnpack = this.dataUnpack.bind(this);
  }

  
  componentDidMount() {

    // this is an "echo" websocket service for testing pusposes
    this.connection = io('https://streamer.cryptocompare.com', {
      reconnection : true,
      reconnectionAttempts : Infinity,
      reconnectionDelay : 1000,
      reconnectionDelayMax : 1000
    });

    
    let subscription = ['2~Bitstamp~BTC~USD'];
    this.connection.emit('SubAdd', { subs: subscription }, (message) => {
      console.log('emit : ', message);
    });

    // restart connection is disconnected
    this.connection.on('disconnect', () => {
      this.connection.open();
    });

    this.connection.on('error', (message) => {
      console.log('error', message);
    });

    this.connection.on("m", (message) => {
      var messageType = message.substring(0, message.indexOf("~"));
			var res = CCC.CURRENT.unpack(message);
			this.dataUnpack(res);
    });
    
    // this.connection.on("e", function(message) {
      //   this.setState({messages : message });
      // });
      
      // Give some time for socket to establish connection
      // setTimeout(() => {
        //   this.connection.send('create-react-app');
        // }, 2000);
        
  }
  
  componentWillUnmount() {
    // this.connection.close();
  }
  
  dataUnpack(data) {
    console.log(data);
    this.setState({data : data});        
  };
  
  render() {
    
    console.log(this.state.messages);

    return (
      <div>
        Chart container : {this.state.data.PRICE}
      </div>
    );
  }
}


export default withRouter(ChartContainer);
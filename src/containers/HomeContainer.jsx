import React from 'react';
import axios from 'axios';
import { Spin, Alert } from 'antd';
import SearchTable from '../components/SearchTable';

class HomeContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource : [],
      isFetching : true
    }
  }


  componentDidMount() {
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0', {headers: {'Access-Control-Allow-Origin': '*'}})
    .then((response) => {
      this.setState({
        isFetching : false,
        dataSource : response.data
      });
    })
    .catch((error) => {
      this.setState({
        isFetching : false,
        error : error
      });
    });
  }


  render() {
    if(!this.state.isFetching) {
      if(this.state.error) {
        return (
          <Alert message={`Error : ${this.state.error.message}`} type="error" />
        );
      } else {
        return (
          <SearchTable dataSource={this.state.dataSource} />
        );
      }
    } else {
      return (
        <Spin />
      )
    }
  }

}


export default HomeContainer;
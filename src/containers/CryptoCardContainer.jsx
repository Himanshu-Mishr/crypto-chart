import React, { Component } from 'react';
import axios from 'axios';
import { Spin, Alert, Row, Col } from 'antd';
import coin from '../symbol.js';

class CryptoCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {},
      isFetching : true
    }
  }


  componentDidMount() {
    axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.props.symbol}&tsyms=USD&e=${this.props.exchange}`, {headers: {'Access-Control-Allow-Origin': '*'}})
    .then((response) => {
      console.log(response.data.RAW[this.props.symbol].USD)
      this.setState({
        isFetching : false,
        data : response.data.RAW[this.props.symbol].USD
      });
    })
    .catch((error) => {
      this.setState({
        isFetching : false,
        error : error
      });
    });
  }

  formatToPrice (str) {
    return parseFloat(str).toLocaleString()
  }

  formatNumberColor(n) {
    n = Number(Math.round(n+'e2')+'e-2');
    if(n < 0) {
      return (
        <span style={{color:'#D50000'}}>{n}%</span>
      );
    } else {
      if(n > 0) {
        return (
          <span style={{color:'#00C853'}}>{n}%</span>
        );
      } else {
        return (
          <span>{n}%</span>
        );        
      }
    }
  }


  render() {
    if(!this.state.isFetching) {
      if(this.state.error) {
        return (
          <Alert message={`Error : ${this.state.error.message}`} type="error" />
        );
      } else {
        return (
          <div>
            <Row justify="space-around" align="middle">
              <Col span={2}>
                <img style={{paddingTop:5}} src={`https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/32/color/${this.props.symbol.toLowerCase()}.png`} alt="icon"/>
              </Col>
              <Col span={22}>
                <h1> {coin[this.props.symbol]} <small>({this.props.symbol})</small></h1>
              </Col>
            </Row>
            <Row>
              <Col span={2}></Col>
              <Col span={22}>
                <h2> ${this.formatToPrice(this.state.data.PRICE)} <small>({this.formatNumberColor(this.state.data.CHANGEPCT24HOUR)})</small></h2>
                 
              </Col>
            </Row>
          </div>
        );
      }
    } else {
      return (
        <Spin />
      )
    }
  }

}

export default CryptoCardContainer;
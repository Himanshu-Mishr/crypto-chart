import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router';
import Chart from '../components/Chart';
import { Row, Col, Select, Spin, Alert } from 'antd';
import CryptoCardContainer from './CryptoCardContainer';

const Option = Select.Option;

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
      isFetching : true,
      data : [],
      exchange : 'Poloniex',
      from : this.props.match.params.symbol || 'BTC',
      to : 'USD',
      rate : 'histoday',
      limit : 100,
      aggregate : 1,
      timeRange : '7days'
    };

    this.handleExchangeChange = this.handleExchangeChange.bind(this);
    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);

  }

  fetchData(data) {

    // set aggregate, limit, and rate w.r.t to timeRange
    switch(data.timeRange) {
      case '1hr':
        data.rate = 'histominute';data.limit = 60;data.aggregate = 1;
        break;
      case '24hrs':
        data.rate = 'histominute';data.limit = 1440;data.aggregate = 1;
        break;
      case '7days':
        data.rate = 'histohour';data.limit = 168;data.aggregate = 1;
        break;
      case '1month':
        data.rate = 'histohour';data.limit = 744;data.aggregate = 1;
        break;
      case '3months':
        data.rate = 'histohour';data.limit = 1116;data.aggregate = 2;
        break;
      case '6months':
        data.rate = 'histohour';data.limit = 1488;data.aggregate = 3;
        break;
      case '1year':
        data.rate = 'histoday';data.limit = 365;data.aggregate = 1;
        break;
      // set it as 7days
      default : 
        data.rate = 'histominute';data.limit = 1680;data.aggregate = 6;
    }

    // symbol and from should be in-sync
    data.symbol = data.from;

    // fetch data from server
    axios.get(`https://min-api.cryptocompare.com/data/${data.rate}?fsym=${data.from}&tsym=${data.to}&limit=${data.limit}&aggregate=${data.aggregate}&e=${data.exchange}`, {headers: {'Access-Control-Allow-Origin': '*'}})
    .then((response) => {
      this.setState({
        ...data,
        isFetching : false,
        data : response.data.Data
      });
    })
    .catch((error) => {
      this.setState({
        ...data,
        isFetching : false,
        error : error
      });
    });
  }
  
  componentDidMount() {
    this.fetchData(this.state);
  }

  handleExchangeChange(value) {
    this.fetchData({...this.state, exchange: value, isFetching : true, data : [] });
  }

  
  handleTimeRangeChange(value) {
    this.fetchData({...this.state, timeRange: value, isFetching : true, data : [] });
  }

  getExchangeOption() {
    let options = [];
    // let exchangeList = ['Cryptsy', 'BTCChina', 'Bitstamp', 'BTER', 'OKCoin', 'Coinbase', 'Poloniex', 'Cexio', 'BTCE', 'BitTrex', 'Kraken', 'Bitfinex', 'Yacuna', 'LocalBitcoins', 'Yunbi', 'itBit', 'HitBTC', 'btcXchange', 'BTC38', 'Coinfloor', 'Huobi', 'CCCAGG', 'LakeBTC', 'ANXBTC', 'Bit2C', 'Coinsetter', 'CCEX', 'Coinse', 'MonetaGo', 'Gatecoin', 'Gemini', 'CCEDK', 'Cryptopia', 'Exmo', 'Yobit', 'Korbit', 'BitBay', 'BTCMarkets', 'Coincheck', 'QuadrigaCX', 'BitSquare', 'Vaultoro', 'MercadoBitcoin', 'Bitso', 'Unocoin', 'BTCXIndia', 'Paymium', 'TheRockTrading', 'bitFlyer', 'Quoine', 'Luno', 'EtherDelta', 'bitFlyerFX', 'TuxExchange', 'CryptoX', 'Liqui', 'MtGox', 'BitMarket', 'LiveCoin', 'Coinone', 'Tidex', 'Bleutrade', 'EthexIndia', 'Bithumb', 'CHBTC', 'ViaBTC', 'Jubi', 'Zaif', 'Novaexchange', 'WavesDEX', 'Binance', 'Lykke', 'Remitano', 'Coinroom', 'Abucoins', 'BXinth', 'Gateio', 'HuobiPro', 'OKEX'];
    let exchangeList = ['Bitstamp', 'Coinbase', 'Poloniex', 'Cexio', 'BTCE', 'BitTrex', 'Kraken', 'Bitfinex', 'Coincheck', 'Bitso', 'Unocoin', 'BTCXIndia', 'Quoine', 'EtherDelta', 'MtGox', 'BitMarket', 'Coinone', 'EthexIndia', 'Bithumb',  'Binance'];

    for(let i = 0; i < exchangeList.length; ++i) {
      options.push(<Option key={i} value={exchangeList[i]}>{exchangeList[i]}</Option>)      
    }

    return (
      <Select size={'small'} defaultValue={this.state.exchange} style={{ width: 200 }} onChange={this.handleExchangeChange}>
        {options}
      </Select>
    );
  }
  
  render() {

    if(this.state.isFetching) {
      return (
        <Spin />        
      );
    } else {
      if(this.state.error) {
        return (
          <Alert message={`Error : ${this.state.error.message}`} type="error" />
        );
      }
    }

    return (
      <div>
        <Row>
          <Col span={16}>
            <Chart data={this.state.data}  timeRange={this.state.timeRange} />
          </Col>
          <Col span={8} style={{padding:8}}>
            <Row type="flex" style={{padding:8}}>
              <Col span={24}>
                <CryptoCardContainer symbol={this.state.symbol} exchange={this.state.exchange}/>
              </Col>
            </Row>
            <Row type="flex" style={{padding:8}}>
              <Col span={6}>Exchange</Col>
              <Col span={18}> {this.getExchangeOption()} </Col>
            </Row>
            <Row type="flex" style={{padding:8}}>
              <Col span={6}>Time range</Col>
              <Col span={18}>
              <Select size={'small'} defaultValue={this.state.timeRange} style={{ width: 200 }} onChange={this.handleTimeRangeChange}>
                <Option value="1hr">1hr</Option>
                <Option value="24hrs">24hrs</Option>
                <Option value="7days">7 days</Option>
                <Option value="1month">1 month</Option>
                <Option value="3months">3 months</Option>
                <Option value="6months">6 months</Option>
                <Option value="1year">1 year</Option>
              </Select>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}


export default withRouter(ChartContainer);
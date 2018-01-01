import React, {Component} from 'react';
import { Layout, Table } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
const { Content } = Layout;


class SearchTable extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  
  columns = [

    {title : 'Name', dataIndex : 'name', key : 'name', sorter: (a, b) => this.compareString(a, b, 'name') },
    {title : 'Symbol', dataIndex : 'symbol', key : 'symbol', sorter: (a, b) => this.compareString(a, b, 'symbol')},
    {title : 'Rank', dataIndex : 'rank', key : 'rank', sorter: (a, b) => this.compareNumber(a, b, 'rank')},
    {
      title: 'Price',
      key: 'price_usd',
      render: (text, record) => (
        <span>
          ${this.formatToPrice(record.price_usd)}
        </span>
      ),
      sorter: (a, b) => this.compareNumber(a, b, 'price_usd')
    },
    {title : 'Price(BTC)', dataIndex : 'price_btc', key : 'price_btc', sorter: (a, b) => this.compareNumber(a, b, 'price_btc')},
    {
      title: 'Volume(24h)',
      key: '24h_volume_usd',
      render: (text, record) => (
        <span>
          {this.formatToPrice(record['24h_volume_usd'])}
        </span>
      ),
      sorter: (a, b) => this.compareNumber(a, b, '24h_volume_usd')
    },
    {
      title: 'Market Cap',
      key: 'market_cap_usd',
      render: (text, record) => (
        <span>
          ${this.formatToPrice(record.market_cap_usd)}
        </span>
      ),
      sorter: (a, b) => this.compareNumber(a, b, 'market_cap_usd')
    },
    {
      title: '1hr',
      key: 'percent_change_1h',
      render: (text, record) => (
        <span>
          {parseFloat(record.percent_change_1h)<0?(
            <span style={{color:'red'}}>{record.percent_change_1h}%</span>
          ):(
            <span style={{color:'green'}}>{record.percent_change_1h}%</span>
          )}
        </span>
      ),
      sorter: (a, b) => this.compareNumber(a, b, 'percent_change_1h')
    },
    {
      title: '24hr',
      key: 'percent_change_24h',
      render: (text, record) => (
        <span>
          {parseFloat(record.percent_change_24h)<0?(
            <span style={{color:'red'}}>{record.percent_change_24h}%</span>
          ):(
            <span style={{color:'green'}}>{record.percent_change_24h}%</span>
          )}
        </span>
      ),
      sorter: (a, b) => this.compareNumber(a, b, 'percent_change_24h')
    },
    {
      title: '7day',
      key: 'percent_change_7d',
      render: (text, record) => (
        <span>
          {parseFloat(record.percent_change_7d)<0?(
            <span style={{color:'red'}}>{record.percent_change_7d}%</span>
          ):(
            <span style={{color:'green'}}>{record.percent_change_7d}%</span>
          )}
        </span>
      ),
      sorter: (a, b) => this.compareNumber(a, b, 'percent_change_7d')
    },
    {
      title: 'Realtime',
      key: 'chart',
      render: (text, record) => (
        <span>
          <a onClick={() => this.routeToChart(record.symbol)}>click here</a>
        </span>
      ),
    }
  ];
  

  constructor(props) {
    super(props);
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
    };
  }

  routeToChart(symbol) {
    this.props.history.push(`/chart/${symbol}`);
  }

  compareString(a, b, key) {

    let str1 = a[key].toLowerCase();
    let str2 = b[key].toLowerCase();

    if (str1 < str2) {
      return -1
    } else {
      if (str1 > str2) {
        return 1
      }
      else {
        return 0
      }
    }
  }

  compareNumber(a, b, key) {
    let num1 = parseFloat(a[key]);
    let num2 = parseFloat(b[key]);

    if(isNaN(num1)) num1 = 0;
    if(isNaN(num2)) num2 = 0;

    if (num1 < num2) {
      return -1
    } else {
      if (num1 > num2) {
        return 1
      }
      else {
        return 0
      }
    }
  }


  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  }


  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }


  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }


  formatToPrice (str) {
    return parseFloat(str).toLocaleString()
  }


  render() {
    return (
      <Content>
        <Table
          rowKey="rank"
          pagination={{ pageSize: 50 }}
          dataSource={this.props.dataSource}
          columns={this.columns}
          size={'small'}
          onChange={this.handleChange}
        />
      </Content>
    )
  }
}


export default withRouter(SearchTable);
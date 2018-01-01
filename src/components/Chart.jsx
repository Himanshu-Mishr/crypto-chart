import React from 'react';
import { ComposedChart, Line, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, ResponsiveContainer } from 'recharts';
import moment from 'moment';

class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.formatDateTicker = this.formatDateTicker.bind(this);
  }

  formatDateTicker(date) {

    var readableDate = '';
    var now = moment(new Date());
    var then = moment(date*1000);

    switch (this.props.timeRange) {
      case '1hr':
        readableDate = now.diff(then, 'minutes') + 'm';
        break;
      case '24hrs':
        readableDate = now.diff(then, 'hours') + 'hr';
        break;
      case '7days':
        readableDate = moment(date*1000).format("DD-MMM-YYYY")
        break;
      case '1month':
        readableDate = moment(date*1000).format("DD-MMM")
        break;
      case '3months':
        readableDate = moment(date*1000).format("DD-MMM")
        break;
      case '6months':
        readableDate = moment(date*1000).format("DD-MMM")
        break;
      case '1year':
        readableDate = moment(date*1000).format("MMM-YYYY")
        break;
      default:
        readableDate = moment(date*1000).format("DD-MMM-YYYY")
    }
    return readableDate;
  }

  formatCurrencyTicker(c) {
    return parseFloat(c).toLocaleString()
  }
    
  render() { 

    console.log(this.props.timeRange);

    return (
      <div>
        <ResponsiveContainer height={500} width="100%" >
          <ComposedChart data={this.props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis scale="time" dataKey="time" tickFormatter={this.formatDateTicker}/>
            <YAxis domain={['dataMin', 'dataMax']} interval="preserveStartEnd"/>
            <Tooltip/>
            <Legend />
            <Line isAnimationActive={false} dot={false} dataKey="open" stroke="#00B0FF" />
            <Line isAnimationActive={false} dot={false} dataKey="high" stroke="#00E676" />
            <Line isAnimationActive={false} dot={false} dataKey="low" stroke="#FF1744" />
            <Line isAnimationActive={false} dot={false} dataKey="close" stroke="#8884d8" />
          </ComposedChart>
        </ResponsiveContainer>
        <ResponsiveContainer height={100} width="100%" >
          <ComposedChart data={this.props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="volumefrom" fill="#757575" />
            <YAxis domain={['dataMin', 'dataMax']} interval="preserveStartEnd"/>
            <Tooltip/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}


export default Chart;
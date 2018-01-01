import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';
import { Layout } from 'antd';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


import HomeContainer from './containers/HomeContainer';
import ChartContainer from './containers/ChartContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout className="App"  style={{background:'white'}}>
          <Header />

          <Route exact path="/" component={HomeContainer}/>
          <Route exact path="/chart" component={ChartContainer}/>
          <Route path="/chart/:symbol" component={ChartContainer}/>

        </Layout>
    </Router>
    );
  }
}

export default App;

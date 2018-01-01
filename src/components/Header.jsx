import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class Header extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }


  constructor(props) {
    super(props);
    this.state = {
      current: props.location.pathname.indexOf('/chart') > -1?'chart':'home',
    }
  }
  
  handleClick = (e) => {
    if(e.key === 'home')
      this.props.history.push('');
    else
      this.props.history.push(e.key);
    
      this.setState({current : e.key});
  }


  render() {

    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Icon type="home" />Home
        </Menu.Item>
        <Menu.Item key="chart">
          <Icon type="line-chart" />Chart
        </Menu.Item>
      </Menu>
    );
  }
}


export default withRouter(Header);
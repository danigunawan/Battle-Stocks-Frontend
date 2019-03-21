import React, { Component } from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {

  render() {

    return (
      <Segment clearing>
        <Header as='h3' color='green' as={Link} to='/choosestocks' floated='left'>
          Home
        </Header>
        <Header  as='h3' color='blue' as={Link} to='/Available'  floated='left'>
        Stocks Available for Purchase
        </Header>
        <Header as='h3' color='red' as={Link} to='/portfolio'  floated='left'>
        Portfolio
        </Header>
        <Header as='h3' color='orange' floated='left'>
        Account: ${this.props.account}
        </Header>
        <Header as='h3' color='green' floated='left'>
        Stock Account: ${this.props.stockAccount}
        </Header>
        <Header as='h3' inverted color='blue' floated='right'>
        <Icon name='earlybirds' />
        <Header.Content>Battle Stocks</Header.Content>
        </Header>
        </Segment>
    )
  }
}

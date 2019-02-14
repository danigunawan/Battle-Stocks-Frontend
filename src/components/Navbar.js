import React, { Component } from 'react'
import { Grid, Container, Header, Icon, Input, Menu, Label, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {


  render() {
    // <Container textAlign='right'><Header as='h2' inverted color='blue'>
    // <Icon name='earlybirds' />
    // <Header.Content>Battle Stocks</Header.Content>
    // </Header></Container>
    return (
      <Segment clearing>
        <Header as='h3' as={Link} to='/choosestocks'  floated='left'>
          Home
        </Header>
        <Header as='h3' as={Link} to='/portfolio'  floated='left'>
        Portfolio
        </Header>
        <Header as='h3' floated='left'>
        ${this.props.account}
        </Header>
        <Header as='h3' inverted color='blue' floated='right'>
        <Icon name='earlybirds' />
        <Header.Content>Battle Stocks</Header.Content>
        </Header>
        </Segment>
    )
  }
}

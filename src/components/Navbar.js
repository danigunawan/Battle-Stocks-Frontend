import React, { Component } from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import "../css/Navbar.css"

export default class Navbar extends Component {

  handleClick = (event) => {
    return event.target.innerHTML === "Home"? this.props.history.push('/choosestocks'): event.target.innerHTML === "Stocks Available to Purchase"? this.props.history.push('/Available') : event.target.innerHTML === "Portfolio"? this.props.history.push('/Portfolio') : <></>
  }




  render() {

    return (

      <nav>

        <ul>
          <li id="home" name="home"  onClick={this.handleClick}><a href="#">Home</a></li>
          <li id="stocks" name="stocks" onClick={this.handleClick}><a href="#">Stocks Available to Purchase</a></li>
          <li id="portfolio"name="portfolio" onClick={this.handleClick}><a href="#">Portfolio</a></li>
          <li name="stockaccount">Stock Account: ${this.props.stockAccount}</li>
          <li name="liquid account">Liquid Account: ${this.props.account}</li>
          <li id="logo"><Icon size="large" name='earlybirds' />Battle Stocks</li>
        </ul>
      </nav>

      // <Segment clearing>
      //   <Header as='h3' color='green' as={Link} to='/choosestocks' floated='left'>
      //     Home
      //   </Header>
      //   <Header  as='h3' color='blue' as={Link} to='/Available'  floated='left'>
      //   Stocks Available for Purchase
      //   </Header>
      //   <Header as='h3' color='red' as={Link} to='/portfolio'  floated='left'>
      //   Portfolio
      //   </Header>
      //   <Header as='h3' color='orange' floated='left'>
      //   Account: ${this.props.account}
      //   </Header>
      //   <Header as='h3' color='green' floated='left'>
      //   Stock Account: ${this.props.stockAccount}
      //   </Header>
      //   <Header as='h3' inverted color='blue' floated='right'>
      //   <Icon name='earlybirds' />
      //   <Header.Content>Battle Stocks</Header.Content>
      //   </Header>
      //   </Segment>
    )
  }
}

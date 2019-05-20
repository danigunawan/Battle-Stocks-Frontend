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

    )
  }
}

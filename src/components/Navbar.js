import React, { Component } from 'react'
import { Input, Menu, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {


  render() {
    return (
      <Menu secondary>
        <Menu.Item
        name='home'
        as={Link}
        to='/choosestocks'
        />
        <Menu.Item
          name='messages'
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='friends'
          onClick={this.handleItemClick}
        />
        <Label>
          Account
          <Label.Detail>${this.props.account}</Label.Detail>
        </Label>
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}
// <Menu.Item>
//   <Input icon='search' placeholder='Search...' />
// </Menu.Item>

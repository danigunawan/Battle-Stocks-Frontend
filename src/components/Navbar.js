import React, { Component } from 'react'
import { Input, Menu, Label } from 'semantic-ui-react'

export default class Navbar extends Component {

  handleItemClick = (e) => {
    debugger
    return e.target.innerText === "Home"? this.props.handleNavBarHome() : <></>
  }

  render() {
    return (
      <Menu secondary>
        <Menu.Item
        name='home'
        onClick={this.handleItemClick}
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

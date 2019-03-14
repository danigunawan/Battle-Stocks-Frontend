import React from 'react'
// import { Redirect } from 'react-router-dom';
import axios from 'axios'

export default class Login extends React.Component {

  state = {
    username:'',
    password:''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  findUser = () => {
    this.props.findUser(this.state.username)
  }

    handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3000/api/v1/login', {
              username: this.state.username,
              password: this.state.password
      })
      .then(r => {
        this.findUser()
        localStorage.setItem('token', r.data.jwt)
        this.props.changeAccountAndUserState(r.data.user.bank_account, r.data.user.username)
        this.props.navBarHiddenChange()
        
        this.props.handleStocksViewedAfterLogin()
        this.props.history.push('/choosestocks')
      })
    }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)}/>
            <label>Username</label>
          </div>
          <div>
            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)}/>
            <label>Password</label>
          </div>
            <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

// this.window.alert('wrong username/password')

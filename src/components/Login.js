import React from 'react'
// import { Redirect } from 'react-router-dom';
import axios from 'axios'
import "../css/Login.css"

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

    handleSubmit = async (e) => {
      e.preventDefault()
      await axios.post('https://battlestocksbackend.herokuapp.com/api/v1/login', {
              username: this.state.username,
              password: this.state.password
      })
      .then(r => {
        debugger
        this.props.findUser(this.state.username)
        localStorage.setItem('token', r.data.jwt)
        this.props.navBarHiddenChange()
        this.props.handleStocksViewedAfterLogin()
        this.props.history.push('/choosestocks')
      })
    }

  render(){
    return (
      <body >

        <form onSubmit={this.handleSubmit}>
        <div class="container">
        <h1 id="login">BattleStocks</h1>
             <label id="username" for="username">Username</label><br />
            <input id="username2" placeholder="username" type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)}/><br />
          <label id="password" for="password">Password</label><br />
            <input id="password2" placeholder="password" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)}/><br />
            <div class="stuff">
            <button class="btn" type="submit">Submit</button>
            </div>
            </div>
        </form>

      </body>
    )
}
}

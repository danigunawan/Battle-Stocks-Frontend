import React from 'react'
import Stocks from './Stocks'
import Login from './Login'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";
// import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
// import Navbar from './Navbar'

export default class App extends React.Component {
  state = {
    infocus:[],
    account: null,
    user:null,
    chosenStockUrls:[]
  }

  componentDidMount(){
    fetch('https://api.iextrading.com/1.0/stock/market/list/infocus')
    .then(r=>r.json())
    .then(r=>{
      const stockMap = r.map((stock, i)=>{
        return {symbol:stock.symbol, companyName: stock.companyName, openPrice: stock.open, clicked:false, id:i}
      })
      this.setState({infocus:stockMap})
    })
    .then(r=>{
      const oneyrpricefetch = this.state.infocus.map(stock=>{
        const symbol = stock.symbol
        fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart/1y`)
        .then(r=>r.json())
        .then(r =>{
           const priceToFloor = Math.floor(r[0].open)
           this.setState(Object.assign(stock, {oneYrPrice:priceToFloor}))
        })
      })
    })
    .then(r => {
      const symbol = this.state.infocus.map(stock=>{
        fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/logo`)
        .then(r => r.json())
        .then(r=>{
          const logoUrl = r.url
          this.setState(Object.assign(stock, {logo:logoUrl}))
        })
      })
    })
  }

  changeAccountAndUserState = (account, username) => {
    this.setState({account:account, username:username})
  }

  changeClickedAndPushStockIntoChosenStockUrlsState = (clicked, id) => {
     const selectedStock = this.state.infocus.find(stock => stock.id === id)
     selectedStock.clicked = !selectedStock.clicked
     this.setState({chosenStockUrls:selectedStock})
     const updatedArray = this.state.infocus.map(stock => stock.id === id ? selectedStock : stock )
     this.setState({chosenStockUrls:[...this.state.chosenStockUrls, selectedStock]})
  }



//   fetch('http://localhost:3000/api/v1/profile', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer localStorage.token <token>`
//   }

  render(){
    return(
      <Router>
        <div>
        <Route exact path='/' render={props => <Login {...props} user={this.state.user} changeAccountAndUserState={this.changeAccountAndUserState} />} />
        <Route exact path='/choosestocks' render={props => <Stocks chosenStockUrlsLength={this.state.chosenStockUrls.length} chosenStockUrls={this.state.chosenStockUrls} changeClickedAndPushStockIntoChosenStockUrlsState={this.changeClickedAndPushStockIntoChosenStockUrlsState} infocus={this.state.infocus} />} />
        </div>
      </Router>
    )
  }
}//end of class

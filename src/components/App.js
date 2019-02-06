import React from 'react'
import Login from './Login'
import Navbar from './Navbar'
import Chosenstockchart1 from './Chosenstockchart1'
import Chosenstockchart2 from './Chosenstockchart2'
import Chosenstockchart3 from './Chosenstockchart3'
import Chosenstockchart4 from './Chosenstockchart4'
import Stocks from './Stocks'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";

export default class App extends React.Component {
  state = {
    handleMergeArraysUsed:true,
    infocusmerged:[],
    infocusthree:[],
    infocustwo:[],
    infocus:[],
    account: 5000,
    user:null,
    chosenStockUrls:[],
    navBarHidden: true
  }

  navBarHiddenChange = () => {
    this.setState({navBarHidden:!this.state.navBarHidden})
  }

  handleAccount = (accountChange) => {
    this.setState({account: accountChange})
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
  async componentDidMount() {
    await fetch('https://api.iextrading.com/1.0/stock/market/list/infocus')
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////
  await fetch('https://api.iextrading.com/1.0/stock/market/list/mostactive')
  .then(r=>r.json())
  .then(r=>{
    const stockMap = r.map((stock, i)=>{
      return {symbol:stock.symbol, companyName: stock.companyName, openPrice: stock.open, clicked:false, id:i}
    })
    this.setState({infocustwo:stockMap})
  })
  .then(r=>{
    const oneyrpricefetch = this.state.infocustwo.map(stock=>{
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
    const symbol = this.state.infocustwo.map(stock=>{
      fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/logo`)
      .then(r => r.json())
      .then(r=>{
        const logoUrl = r.url
        this.setState(Object.assign(stock, {logo:logoUrl}))
      })
    })
  })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
await fetch('https://api.iextrading.com/1.0/stock/market/list/gainers')
.then(r=>r.json())
.then(r=>{
  const stockMap = r.map((stock, i)=>{
    return {symbol:stock.symbol, companyName: stock.companyName, openPrice: stock.open, clicked:false, id:i}
  })
  this.setState({infocusthree:stockMap})
})
.then(r=>{
  const oneyrpricefetch = this.state.infocusthree.map(stock=>{
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
  const symbol = this.state.infocusthree.map(stock=>{
    fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/logo`)
    .then(r => r.json())
    .then(r=>{
      const logoUrl = r.url
      this.setState(Object.assign(stock, {logo:logoUrl}))
    })
  })
})

this.setState({infocusmerged:[...this.state.infocus, ...this.state.infocusthree, ...this.state.infocustwo]})

  }
/////////////////////////////////////////////////////////////////////////////////////////////////////end of component did mount//////////////////////////////////////////////////
  changeAccountAndUserState = (account, username) => {
    this.setState({account:account, username:username})
  }

  changeClickedAndPushStockIntoChosenStockUrlsState = (clicked, id) => {

     const selectedStock = this.state.infocusmerged.find(stock => stock.symbol === id)
     selectedStock.clicked = !selectedStock.clicked
     this.setState({chosenStockUrls:selectedStock})
     const updatedArray = this.state.infocusmerged.map(stock => stock.symbol === id ? selectedStock : stock )
     this.setState({chosenStockUrls:[...this.state.chosenStockUrls, selectedStock]})
  }

//   fetch('http://localhost:3000/api/v1/profile', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer localStorage.token <token>`
//   }

// handleMergeArrays = (a, b, c) => {
// const mergedArray = [...a, ...b, ...c]
// this.setState({infocusmerged:mergedArray})
// this.setState({handleMergeArraysUsed:false})
// }
// {this.state.infocus.length >= 10 && this.state.infocusthree.length >= 2 && this.state.infocustwo.length >= 10 && this.state.handleMergeArraysUsed? this.handleMergeArrays(this.state.infocus, this.state.infocusthree, this.state.infocustwo) : <></>}

  render(){
    console.log(this.state.infocus)
    console.log(this.state.infocustwo)
    console.log(this.state.infocusthree)
    return(
      <Router>
        <div>
        <Route exact path='/' render={props => <Login {...props} user={this.state.user} changeAccountAndUserState={this.changeAccountAndUserState} navBarHiddenChange={this.navBarHiddenChange}/>}
        />
        {(this.state.navBarHidden) ? null : <Navbar account={this.state.account}/>}
        <Route exact path='/choosestocks' render={props => <Stocks changeDataState={this.changeDataState} {...props}  chosenStockUrlsLength={this.state.chosenStockUrls.length} chosenStockUrls={this.state.chosenStockUrls} changeClickedAndPushStockIntoChosenStockUrlsState={this.changeClickedAndPushStockIntoChosenStockUrlsState} infocus={this.state.infocusmerged} />}
        />
        <Route exact path='/Chosenstockchart1' render={props => <Chosenstockchart1 handleAccount={this.handleAccount} {...props} user={this.state.user} chosenStockUrls={this.state.chosenStockUrls} dataState={this.state.data} account={this.state.account}/>}
        />
        </div>
      </Router>
    )
  }
}//end of class

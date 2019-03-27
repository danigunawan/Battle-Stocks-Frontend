import React from 'react'
import Login from './Login'
import Navbar from './Navbar'
import Chosenstockchart1 from './Chosenstockchart1'
import Stocks from './Stocks'
import Available from './Available'
import BuyStocks from './BuyStocks';
import Portfolio from './Portfolio';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";

export default class App extends React.Component {
  state = {
    handleMergeArraysUsed:true,
    infocusmerged:[],
    allstocksbeforeportfolio:[],
    infocusthree:[],
    infocustwo:[],
    infocus:[],
    account: null,
    stockAccount: null,
    user:null,
    chosenStockUrls:[],
    navBarHidden: true,
    chosenStockUrlsClone:[],
    chosenStockToPurchase: null
  }

  setAccountState = (account, stockAccount) => {

    this.setState({account, stockAccount})
  }

  findUser = async (username) => {
    await fetch('http://localhost:3000/api/v1/users')
    .then(r=>r.json())
    .then(r=>{
      const foundUser = r.find(user => user.username === username)
      this.setState({user:foundUser, account:foundUser.account,
        stockAccount: foundUser.stock_account})
    })
    .then(r=>{
    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`)
      .then(r => r.json())
      .then(r=>{
      let result = [];
      const map = new Map();

      for (const item of r.portfolios) {
          if(!map.has(item.symbol)){
              map.set(item.symbol, true);    // set any value to Map
              result.push({
                  user_id: item.user_id,
                  shares: item.shares,
                  symbol: item.symbol,
                  stock_id: item.stock_id,
                  account: r.account,
                  stock_account: r.stock_account
              });
          }
      }//end of for loop

      let account = 0
      Promise.all(result.map(async(stock)=>{
      await fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/batch?types=quote,news`)
        .then(r=>r.json())
        .then(r=>{

          account += parseInt((r.quote.latestPrice * stock.shares).toFixed(2))
        })
      }))//map end
      .then(r=>{
        this.handleAccount(account)
        ////////////////////////////////////////////////////////////////////////////////////good
      })//end of promise
    })//end of top promise
    })
  }//finduser end

  handleAccount = async(accountChange) => {
    debugger
      await fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer' + localStorage.token,
        },
        body: JSON.stringify({
          stock_account: accountChange
        })
      })//fetch end
      await fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`)
      .then(r=>r.json())
      .then(r=>{
        this.setState({account: r.account})
      })
    }//handleAccount end

  navBarHiddenChange = () => {
    this.setState({navBarHidden:!this.state.navBarHidden})
  }

////////////////////////////////////////////////////component did mount/////////////////////////////////////////
  async componentDidMount() {

    await fetch('https://api.iextrading.com/1.0/stock/market/list/infocus')
    .then(r=>r.json())
    .then(r=>{

      const stockMap = r.map((stock, i)=>{
        return {symbol:stock.symbol, companyName: stock.companyName, openPrice: stock.open}
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
///////////////////////////////////////////////////second fetch//////////////////////////////////////////////////////
  await fetch('https://api.iextrading.com/1.0/stock/market/list/mostactive')
  .then(r=>r.json())
  .then(r=>{

    const stockMap = r.map((stock, i)=>{
      return {symbol:stock.symbol, companyName: stock.companyName, openPrice: stock.open}
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

/////////////////////////////////////third fetch//////////////////////////////////////////////////////////
await fetch('https://api.iextrading.com/1.0/stock/market/list/gainers')
.then(r=>r.json())
.then(r=>{

  const stockMap = r.map((stock, i)=>{
    return {symbol:stock.symbol, companyName: stock.companyName, openPrice: stock.open}
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

/////////////////////////////////////////////////////////end of fetches from iex//////////////////////////////////
  await fetch(`http://localhost:3000/api/v1/stocks`)
  .then(r=>r.json())
  .then(r=>{

     let inFocusMerged = [...r, ...this.state.infocus, ...this.state.infocusthree, ...this.state.infocustwo]//merge

     let uniqArray = inFocusMerged.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj['symbol']).indexOf(obj['symbol']) === pos;
      })

      let uniqArrayUsedForSettingState = inFocusMerged.filter((obj, pos, arr) => {
         return arr.map(mapObj => mapObj['symbol']).indexOf(obj['symbol']) === pos;
       })
      //there are two here because the first one gets spliced after being compared with r for post to backend. The second method is all stocks backend and fetched but uniq versions of it. one method for backend one for frontend.

    //find unique values between r and unique array

    for( var i=uniqArray.length - 1; i>=0; i--){
     	for( var j=0; j<r.length; j++){
     	    if(uniqArray[i] && (uniqArray[i].symbol === r[j].symbol)){
        		uniqArray.splice(i, 1);
        	}
        }
    }

    this.setState({allstocksbeforeportfolio:uniqArrayUsedForSettingState},()=>{//we post accurate stocks backend with iex stocks
          if (uniqArray.length > 0){
            uniqArray.forEach(stock=>{
            fetch('http://localhost:3000/api/v1/stocks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "name": stock.companyName,
            "sector": null,
            "ceo": null,
            "symbol": stock.symbol,
            "logo": stock.logo,
            "openPrice": stock.openPrice,
            "oneYrPrice": stock.oneYrPrice
          })
        })
      })
    }
     })
   })//promise end/////////
}//async end/////////////////////////////////////////////
   //this gives only uniq stocks for stock model
//////////////////////////////////fetch portfoliostocks/////////////////////////////////////////////////////////////////////////////////////////////

  handleStocksViewedAfterLogin = async() => {

    await fetch('http://localhost:3000/api/v1/portfoliostocks')//what user sees////////////////////////////////////////
   .then(r=>r.json())
   .then(r=>{

     let usersViewableStocksNotInPortfolio = r.filter(portfoliostock=> portfoliostock.user_id === this.state.user.id)
     //get the stocks who s user id matches logged in id

     let allStocks = [...this.state.allstocksbeforeportfolio]



     for( var i=allStocks.length - 1; i>=0; i--){
      	for( var j=0; j<usersViewableStocksNotInPortfolio.length; j++){

      	    if(allStocks[i] && (allStocks[i].symbol === usersViewableStocksNotInPortfolio[j].symbol)){
         		allStocks.splice(i, 1);
         	}
         }
     }
    //this fetches portfoliostocks of all users. then finds current user. then compares stocks that current user owns with all stocks and filters stocks for user to see that user does not own already.

    this.setState({infocusmerged:allStocks})
    //here we set users will see stocks, then head to choosestocks
  })//promise
}//function end

  pushStockIntoChosenStockUrlsState = (symbol) => {
     const selectedStock = this.state.infocusmerged.find(stock => stock.symbol === symbol)

     this.setState({chosenStockUrls:[...this.state.chosenStockUrls, selectedStock]},() => {
       this.setState({chosenStockUrlsClone:[...this.state.chosenStockUrls, selectedStock]})
     })
     // const updatedArray = this.state.infocusmerged.map(stock => stock.symbol === id ? selectedStock : stock )
     // this.setState({chosenStockUrls:[...this.state.chosenStockUrls, selectedStock]})
 }

 clearChosenStockUrlsState = () => {
   this.setState({chosenStockUrls:[]})
 }

  chosenStockToPurchase = (symbol) => {
    this.setState({chosenStockToPurchase: symbol})
  }
  render(){//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return(
      <Router>
        <div>

        {this.state.navBarHidden ? null :
          <Route render={props => <Navbar {...props} handleNavBarHome={this.handleNavBarHome} account={this.state.account} stockAccount={this.state.stockAccount}/>}
          />}

        <Route exact path='/' render={props => <Login handleStocksViewedAfterLogin={this.handleStocksViewedAfterLogin} findUser={this.findUser} {...props} user={this.state.user} changeAccountAndUserState={this.changeAccountAndUserState} navBarHiddenChange={this.navBarHiddenChange}/>}
        />

        <Route exact path='/choosestocks' render={props => <Stocks {...props}  chosenStockUrlsLength={this.state.chosenStockUrls.length} chosenStockUrls={this.state.chosenStockUrls} pushStockIntoChosenStockUrlsState={this.pushStockIntoChosenStockUrlsState} infocus={this.state.infocusmerged} />}
        />
        <Route exact path='/Chosenstockchart1'
          render={props =>
            <Chosenstockchart1
            handleAccount={this.handleAccount} clearChosenStockUrlsState={this.clearChosenStockUrlsState}
            {...props}
            user={this.state.user}
            chosenStockUrls={this.state.chosenStockUrls}
            account={this.state.account}
            stockAccount={this.state.stockAccount}
            chosenStockUrlsClone={this.state.chosenStockUrlsClone[0]}
            handleStocksViewedAfterLogin={this.handleStocksViewedAfterLogin}
            setAccountState={this.setAccountState}
            />
          }
        />
        <Route exact path='/Available' render={props => <Available handleAccount={this.handleAccount} chosenStockToPurchase={this.chosenStockToPurchase} user={this.state.user} portfolioStocksSetState={this.portfolioStocksSetState} {...props} user={this.state.user} chosenStockUrls={this.state.chosenStockUrls} account={this.state.account}/>}
        />
        <Route
        exact path='/BuyStocks'
        render={props =><BuyStocks
        {...props}
        account={this.state.account}
        stockToPurchase={this.state.chosenStockToPurchase}
        user={this.state.user}
        setAccountState={this.setAccountState}

        />}
        />
        <Route
        exact path='/Portfolio'
        render={props =><Portfolio
        {...props}
        user={this.state.user}
        />}
        />
        </div>
      </Router>
    )
  }
}//end of class//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

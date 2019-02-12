import React from 'react'
import Stock from './Stock'

export default class Stocks extends React.Component {

  render(){

    return (
      <div>
          {this.props.chosenStockUrlsLength >= 1? <h1>Given price per share of your chosen stocks ONE YEAR AGO: <br/>1) Did they Increase/Decrease?<br />2)Current Price?<br />------------------------------------<br />Reward:<br /> Both currect? Double Account. <br /> Incorrect? -$500 and -Bet.<br /> 1/2? Receive half your bet.</h1>
          :
          <h1>The name of the game is BattleStocks!!!!!<br />Choose your stock:</h1>}
            {this.props.chosenStockUrlsLength >= 1 ?
              this.props.chosenStockUrls.map(stock =>{
              return (
                <Stock
                changeClickedAndPushStockIntoChosenStockUrlsState={this.props.changeClickedAndPushStockIntoChosenStockUrlsState}
                id={stock.id}
                clicked={stock.clicked}
                symbol={stock.symbol}
                logo={stock.logo}
                name={stock.name}
                chosenStockUrlsLength={this.props.chosenStockUrlsLength}
                />
              )
            })
            :
        this.props.infocus.map(stock =>{
        return (
          <Stock
          changeClickedAndPushStockIntoChosenStockUrlsState={this.props.changeClickedAndPushStockIntoChosenStockUrlsState} id={stock.symbol}
          clicked={stock.clicked}
          symbol={stock.symbol}
          logo={stock.logo}
          name={stock.name}
          chosenStockUrlsLength={this.props.chosenStockUrlsLength}
          />
        )
      })
        }
        {this.props.chosenStockUrlsLength >= 1? <button onClick={() => this.props.history.push('/Chosenstockchart1')}>Let's Gamble</button> : <></>}
      </div>
    )
  }
}
// Chosenstockchart1

// onClick={this.handleState}

// <button onClick={() => hashHistory.push(`/mySite/accountview?id=${account.AccountName}`)}></button>
// <button><Link to={'/'}>Let's begin</Link></button>

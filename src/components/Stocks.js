import React from 'react'
import Stock from './Stock'

export default class Stocks extends React.Component {

  render(){
    return (
      <div>
          <h1>The name of the game is BattleStocks!!!!! Choose four stocks to start</h1>
            {this.props.chosenStockUrlsLength >= 4 ?
              this.props.chosenStockUrls.map(stock =>{
              return (
                <Stock          changeClickedAndPushStockIntoChosenStockUrlsState={this.props.changeClickedAndPushStockIntoChosenStockUrlsState}
                id={stock.id}
                clicked={stock.clicked}
                symbol={stock.symbol}
                logo={stock.logo}
                companyName={stock.companyName}
                chosenStockUrlsLength={this.props.chosenStockUrlsLength}
                />
              )
            })
            :
        this.props.infocus.map(stock =>{
        return (
          <Stock          changeClickedAndPushStockIntoChosenStockUrlsState={this.props.changeClickedAndPushStockIntoChosenStockUrlsState} id={stock.id}
          clicked={stock.clicked}
          symbol={stock.symbol}
          logo={stock.logo}
          companyName={stock.companyName}
          chosenStockUrlsLength={this.props.chosenStockUrlsLength}
          />
        )
      })
        }
      </div>
    )
  }
}

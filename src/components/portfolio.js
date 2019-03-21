import React from 'react'

export default class Portfolio extends React.Component {
  state = {
    stockinfo: [],
    uniqStocks: []
  }

   async componentWillMount(){
    await fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`)
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
                  stock_id: item.stock_id
              });
          }
      }//end of for loop

      this.setState({uniqStocks: result})

    })///////////////////////////////////////////good
      // this.stockPrice()
      Promise.all(this.state.uniqStocks.map(async(stock)=>{
      await fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/batch?types=quote,news,chart/1d`)
        .then(r=>r.json())
        .then(r=>{
          this.setState(Object.assign(stock, {currentValue:r.quote.close * stock.shares, price:r.quote.latestPrice, headline:r.news[0].headline, source: r.news[0].source, url:r.news[0].url, summary: r.news[0].summary}))
        })
      }))//map end

    }//componentwillmount end

    render(){
      return (
        <div>{this.state.uniqStocks.map(stock => {
              return (
                <>
              <h1>{stock.symbol}</h1>
              <h1>Current Value: {stock.currentValue}</h1>
              <h1>Latest Price: {stock.price}</h1>
              <h1>News: {stock.headline}</h1>
              <h1>{stock.summary}</h1>
              <h1>{stock.url}</h1>
              <h1>Source:{stock.source}</h1>
              </>
            )
            })}
        </div>
     )
   }//render end

}//end of class

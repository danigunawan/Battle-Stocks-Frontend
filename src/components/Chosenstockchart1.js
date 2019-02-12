import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';

export default class Chosenstockchart1 extends React.Component{
  state = {
    today:false,
    increase: false,
    decrease: false,
    input:'',
    currentprice:null,
    completelylost:false,
    won:false,
    halflost: false,
    guessedIncreaseDecreaseRight: false,
    guessedPriceRight: false,
    bet:null,
    difference:null
    }

  handleDecrease = () => {
    this.setState({decrease: !this.state.decrease})
    //working
  }

  handleIncrease = () => {
    this.setState({increase: !this.state.increase})
    //working
    }

  handleSubmit = (e) => {
    e.preventDefault()
    let openPrice = this.props.chosenStockUrls[0].openPrice
    let yearAgoPrice = this.props.chosenStockUrls[0].oneYrPrice
    this.setState({today:!this.state.today}, () => {
    this.handleGuessedIncreaseDecreaseRight()
  })
  }

  handleGuessedIncreaseDecreaseRight = () => {
    let openPrice = this.props.chosenStockUrls[0].openPrice
    let yearAgoPrice = this.props.chosenStockUrls[0].oneYrPrice
    return  openPrice > yearAgoPrice && this.state.increase || openPrice < yearAgoPrice && this.state.decrease ?
    this.setState({guessedIncreaseDecreaseRight: true}, () => {this.handleGuessedPriceRight()}) : this.setState({guessedIncreaseDecreaseRight: false}, () => {this.handleGuessedPriceRight()})
  }

  handleGuessedPriceRight = () => {
    let openPrice = this.props.chosenStockUrls[0].openPrice
    let yearAgoPrice = this.props.chosenStockUrls[0].oneYrPrice
    this.setState({difference: Math.abs(openPrice - parseInt(this.state.input))})
    return Math.abs(Math.floor(openPrice) - parseInt(this.state.input)) <= 10? this.setState({guessedPriceRight: true}, () => {this.handleGameOutcome()}) :  this.setState({guessedPriceRight: false}, () => {this.handleGameOutcome()})
  }

  handleGameOutcome = () => {
    return this.state.guessedPriceRight && this.state.guessedIncreaseDecreaseRight ? this.setState({won:!this.state.won}, () => this.handleWin()) : this.state.guessedPriceRight || this.state.guessedIncreaseDecreaseRight? this.setState({halflost:!this.state.halflost}, () => this.handleHalfLost()) : this.setState({completelylost: !this.state.completelylost}, () => this.handleCompletelyLost())
  }

  handleWin = () => {
    let accountChange = this.props.account + (this.state.bet * 2)
    this.props.handleAccount(accountChange)
    fetch('http://localhost:3000/api/v1/stocks')
    .then(r=>r.json())
    .then(r=>{

    const selectedStockId = r.find(stock =>stock.symbol === this.props.chosenStockUrls[0].symbol)

    debugger
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bank_account: accountChange
      })
    })//fetch end
    .then(r=>{
      debugger
    fetch('http://localhost:3000/api/v1/portfoliostocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "user_id": this.props.user.id,
        "stock_id": selectedStockId.id,
        "win":true
      })
    })//fetch end
  })//promise end
  debugger
    this.props.clearChosenStockUrlsState()
  }) //promise end
}//handle win end
//////////////////////////////////////half lost////////////////////////////////////////////////////////////////
  handleHalfLost = () => {
    let accountChange = this.props.account + (this.state.bet / 2)
    this.props.handleAccount(accountChange)
      fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          bank_account: accountChange,
        })
      })
      fetch('http://localhost:3000/api/v1/portfoliostocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "user_id": this.props.user.id,
          "stock_id": this.props.chosenStockUrls[0].id
        })
      })
  }//handlehalflost/////////////////////////////////////////////////////////////////////////////////

  handleCompletelyLost = () =>{
    let accountChange = this.props.account - 500 - this.state.bet
    this.props.handleAccount(accountChange)
    let adjustment = this.props.account - 500

    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bank_account: adjustment

      })
    })//fetch end
    .then(r=>{
      return adjustment
    })
  }//complete lost////////////////////////////////////////////

  render(){
    console.log(this.props)
    return (
      <div>
            {this.state.won?<h1>Winner!<br /> Price Difference: ${this.state.difference.toFixed(2)} <br /> You doubled your bet of ${this.state.bet} to ${this.state.bet * 2} <br /> New Balance: ${this.props.account}</h1> : this.state.halflost? <h1>You got half your bet of ${this.state.bet} added to your account!<br /> Your Winnings: ${this.state.bet / 2}<br /> New Balance: ${this.props.account}</h1> : this.state.completelylost? <h1>You lost this round, onto the next!<br />Loss: -$500 <br /> Bet: -${this.state.bet}! <br /> New Balance: ${this.props.account}</h1> :
            <div>
            <h1>{this.props.chosenStockUrls[0].name}</h1>
            <h3>Price Per Share One Year Ago: $ {this.props.chosenStockUrls[0].oneYrPrice}</h3>
            {this.state.today? <h3>Price Per Share Today: {this.props.chosenStockUrls[0].openPrice}</h3> : <></>}
                <XYPlot margin={{bottom: 70}} xType="ordinal" width={300} height={300}>
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis tickLabelAngle={-45} />
                  <YAxis />
                  <VerticalBarSeries
                    data={[
                      {x: 'ONE YEAR AGO', y: this.props.chosenStockUrls[0].oneYrPrice},
                      this.state.today? {x: 'TODAY', y: this.props.chosenStockUrls[0].openPrice} : {x: 'TODAY', y: 0}
                    ]}
                  />
                </XYPlot>
              <br /><br />
                  <div>
                    {this.state.increase? <h4>Your Choice: Increased</h4> : this.state.decrease? <h4>Your Choice: Decreased</h4> :
                      <div>Price increase or decrease in the past year?<br /><button onClick={this.handleIncrease}>Increase?</button><button onClick={this.handleDecrease}>Decrease?</button></div>
                    }
                    <form onSubmit={this.handleSubmit}>
                    <br /><label>Today's Price</label><br />
                      <input
                        type="integer"
                        placeholder="Today's Price?"
                        onChange={event => {this.setState({input: event.target.value})}}
                      />
                      <br /><label>Bet</label><br />
                      <input
                        type="integer"
                        placeholder="Bet?"
                        onChange={event => {this.setState({bet: event.target.value})}}
                      />
                      <br />{this.state.input === ''? <></> : <button type="submit">Submit</button>}
                    </form>
                  </div>
                <br />
                </div>
              }

              <div>
              {this.state.won === false && this.state.halflost === false && this.state.completelylost === false? <></> :
              <div>
              <h1>{this.props.chosenStockUrls[0].name}</h1>
              <h3>Price Per Share One Year Ago: $ {this.props.chosenStockUrls[0].oneYrPrice}</h3>
              {this.state.today? <h3>Price Per Share Today: {this.props.chosenStockUrls[0].openPrice}</h3> : <></>}
                  <XYPlot margin={{bottom: 70}} xType="ordinal" width={300} height={300}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis tickLabelAngle={-45} />
                    <YAxis />
                    <VerticalBarSeries
                      data={[
                        {x: 'ONE YEAR AGO', y: this.props.chosenStockUrls[0].oneYrPrice},
                        this.state.today? {x: 'TODAY', y: this.props.chosenStockUrls[0].openPrice} : {x: 'TODAY', y: 0}
                      ]}
                    />
                  </XYPlot>
                <br /><br />
                </div>
              }
              </div>
              {this.state.completelylost || this.state.won || this.state.halflost? <button onClick={()=>{this.props.history.push('/portfolio')}}>Head to your portfolio</button> : this.state.difference? <button onClick={()=>{this.props.history.push('/choosestocks')}}>Home</button> : <></>}
      </div>
    )
            }
  }

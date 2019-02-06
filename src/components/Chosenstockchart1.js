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
    return this.props.account + (this.state.bet * 2)
  }

  handleHalfLost = () => {
    let accountChange = this.props.account + (this.state.bet / 2)
    this.props.handleAccount(accountChange)
    return this.props.account + (this.state.bet / 2)
  }

  handleCompletelyLost = () =>{
    let accountChange = this.props.account - 500 - this.state.bet
    this.props.handleAccount(accountChange)
    return this.props.account - 500
  }

  render(){
    // console.log(this.state.decrease)
    // console.log(this.state.increase)
    // console.log(this.state.input)
    // console.log(this.state.currentPrice)
    // console.log(this.state.difference)
    //  console.log(this.state.completelylost)
    //   console.log(this.state.won)
    //   console.log(this.state.halflost)
    //   console.log(this.state.halflost)
    //   console.log(this.state.guessedIncreaseDecreaseRight)
    //  console.log(this.state.guessedPriceRight)
    //  console.log(this.state.bet)
// 0:
// clicked: true
// companyName: "Alibaba Group Holding Limited"
// id: 0
// logo: "https://storage.googleapis.com/iex/api/logos/BABA.png"
// oneYrPrice: 183
// openPrice: 166.16
    return (
      <div>
            {this.state.won?<h1>Winner!<br /> Price Difference: ${this.state.difference.toFixed(2)} <br /> You doubled your bet of ${this.state.bet} to ${this.state.bet * 2} <br /> New Balance: ${this.props.account}</h1> : this.state.halflost? <h1>You got half your bet of ${this.state.bet} added to your account!<br /> Your Winnings: ${this.state.bet / 2}<br /> New Balance: ${this.props.account}</h1> : this.state.completelylost? <h1>You lost this round, onto the next!<br />Loss: -$500 <br /> Bet: -${this.state.bet}! <br /> New Balance: ${this.props.account}</h1> :
            <div>
            <h1>{this.props.chosenStockUrls[0].companyName}</h1>
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
                      <button hidden type="submit">Submit</button>
                    </form>
                  </div>
                <br />
                </div>
              }

              <div>
              {this.state.won === false && this.state.halflost === false && this.state.completelylost === false? <></> :
              <div>
              <h1>{this.props.chosenStockUrls[0].companyName}</h1>
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
      </div>
    )
            }
  }

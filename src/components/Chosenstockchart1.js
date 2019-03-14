import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';
import { Label, Divider, Container, Button, Icon, Grid, Image, Form, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
    difference:null,
    ceo:[],
    description:null,
    exchange:null,
    industry: null,
    website: null
    }

  handleDecrease = () => {
    this.setState({decrease: !this.state.decrease})
  }

  handleIncrease = () => {
    this.setState({increase: !this.state.increase})
    }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({today:!this.state.today}, () => {
    this.handleGuessedIncreaseDecreaseRight()
    })
  }

  handleGuessedIncreaseDecreaseRight = () => {
    let openPrice = this.props.chosenStockUrlsClone.openPrice
    let yearAgoPrice = this.props.chosenStockUrlsClone.oneYrPrice
    return  openPrice > yearAgoPrice && this.state.increase || openPrice < yearAgoPrice && this.state.decrease ?
    this.setState({guessedIncreaseDecreaseRight: true}, () => {this.handleGuessedPriceRight()}) : this.setState({guessedIncreaseDecreaseRight: false}, () => {this.handleGuessedPriceRight()})
  }

  handleGuessedPriceRight = () => {
    let openPrice = this.props.chosenStockUrlsClone.openPrice
    let yearAgoPrice = this.props.chosenStockUrlsClone.oneYrPrice
    this.setState({difference: Math.abs(openPrice - parseInt(this.state.input))})
    return Math.abs(Math.floor(openPrice) - parseInt(this.state.input)) <= 10? this.setState({guessedPriceRight: true}, () => {this.handleGameOutcome()}) :  this.setState({guessedPriceRight: false}, () => {this.handleGameOutcome()})
  }

  handleGameOutcome = () => {
    return this.state.guessedPriceRight && this.state.guessedIncreaseDecreaseRight ? this.setState({won:!this.state.won}, () => this.handleWin()) : this.state.guessedPriceRight || this.state.guessedIncreaseDecreaseRight? this.setState({halflost:!this.state.halflost}, () => this.handleHalfLost()) : this.setState({completelylost: !this.state.completelylost}, () => this.handleCompletelyLost())
  }

  patchBankAccount = (accountChange) => {
    if (accountChange <= 0){
      Window.alert("Your Bank Account is 0 so you will receive $10 reset")
      fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          bank_account: 10
        })
      })//fetch end
      .then(r=>{
        this.props.handleAccount(accountChange)
        // this.props.clearChosenStockUrlsState()
      })
    }else{
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
      this.props.handleAccount(accountChange)
      // this.props.clearChosenStockUrlsState()
    })
  }
}////////////////////////////////////////////////////patchBankAccountEnd

  handleWin = async () => {
    this.props.clearChosenStockUrlsState()
    let accountChange = parseInt(this.props.account) + (parseInt(this.state.bet) * 2)

    await fetch('http://localhost:3000/api/v1/stocks')
    .then(r=>r.json())
    .then(r=>{

      const selectedStockId = r.find(stock =>stock.symbol === this.props.chosenStockUrlsClone.symbol)

      fetch('http://localhost:3000/api/v1/portfoliostocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: this.props.user.id,
          stock_id: selectedStockId.id,
          win:true
        })
      })//fetch end
      debugger
      this.props.handleStocksViewedAfterLogin()
    })

    this.patchBankAccount(accountChange)
  }//handlewin end//////////////////////////////////////////////////////////

  handleHalfLost = async () => {
    this.props.clearChosenStockUrlsState()
    let accountChange = parseInt(this.props.account) + (parseInt(this.state.bet) / 2)

    await fetch('http://localhost:3000/api/v1/stocks')
    .then(r=>r.json())
    .then(r=>{
    const selectedStockId = r.find(stock =>stock.symbol === this.props.chosenStockUrlsClone.symbol)
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
        })
        this.patchBankAccount(accountChange)
        debugger
        this.props.handleStocksViewedAfterLogin()
      }//handle half lost

  handleCompletelyLost = async () =>{
    this.props.clearChosenStockUrlsState()
    let accountChange = ((parseInt(this.props.account) + parseInt(this.state.bet)) - 500)

    await fetch('http://localhost:3000/api/v1/stocks')
    .then(r=>r.json())
    .then(r=>{
    const selectedStockId = r.find(stock =>stock.symbol === this.props.chosenStockUrlsClone.symbol)

    fetch('http://localhost:3000/api/v1/portfoliostocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "user_id": this.props.user.id,
        "stock_id": selectedStockId.id,
        "win":false
      })
    })//fetch end

    })
    this.patchBankAccount(accountChange)
    this.props.handleStocksViewedAfterLogin()
  }//complete lost////////////////////////////////////////////

  async componentDidMount() {
    await fetch (`https://api.iextrading.com/1.0/stock/${this.props.chosenStockUrls[0].symbol}/company`)
    .then(r=>r.json())
    .then(r=>{
      this.setState({
        ceo:r.CEO,
        description:r.description,
        exchange:r.exchange,
        industry: r.industry,
        website: r.website
      })
    })
  }//end of handleCompanyInfo////////////////

  render(){
    return (
      <div>
      <Grid textAlign='center' verticalAlign='middle' columns={3} centered>
          <Grid.Row stretched>
          <Grid.Column>
      {this.state.completelylost || this.state.won || this.state.halflost? <></> :
        <div>
        <List animated size='massive'>

        <h1><Icon name='chart line' /> Stock Information</h1>

          <List.Item>
          <List.Content>
          <List.Header>{this.state.ceo}</List.Header>
          </List.Content>
          </List.Item>
          <br /><br />
          <List.Item>
          <List.Content>
          <List.Header>{this.state.description}</List.Header>
          </List.Content>
          </List.Item>
          <br /><br />
          <List.Item>
          <List.Content>
          <List.Header>{this.state.industry}</List.Header>
          </List.Content>
          </List.Item>
          <br /><br />
          <List.Item>
          <List.Content>
          <List.Header>{this.state.website}</List.Header>
          </List.Content>
          </List.Item>
          </List>
          </div>
        }
        </Grid.Column>


          <Grid.Column>
          <Container textAlign='center' verticalAlign='middle'>
          {this.state.won?
            <h1>Winner!<br />
            Price Difference: ${this.state.difference.toFixed(2)} <br />
            You doubled your bet of ${this.state.bet} to ${this.state.bet * 2} <br />
            New Balance: ${this.props.account}</h1>
            :
            this.state.halflost?
              <h1>You got half your bet of ${this.state.bet} added to your account!<br />
              Your Winnings: ${this.state.bet / 2}<br /> New Balance: ${this.props.account}</h1>
            :
            this.state.completelylost?
              <h1>You lost this round, onto the next!<br />Loss: -$500 <br />
              Bet: -${this.state.bet}! <br />
              New Balance: ${this.props.account}</h1>
            :
            <div>
            <h1>{this.props.chosenStockUrlsClone.name}
            </h1>

            <h3>Price Per Share One Year Ago:
            $ {this.props.chosenStockUrlsClone.oneYrPrice}
            </h3>
            </div>
          }

            {this.state.today?
              <div>
              <h3>Price Per Share Today: ${this.props.chosenStockUrlsClone.openPrice}
              </h3>
              <br /><Button as={Link} to='/Available'>Stocks Available to Purchase</Button>
              </div>
            :
              <></>
            }
            </Container>



            {this.state.completelylost || this.state.won || this.state.halflost? <></> :

              <XYPlot margin={{bottom: 70}} xType="ordinal" width={300} height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis tickLabelAngle={-45} />
                <YAxis />
                <VerticalBarSeries
                  data={[
                    {x: 'ONE YEAR AGO', y: this.props.chosenStockUrlsClone.oneYrPrice || this.props.chosenStockUrlsClone.oneYrPrice},
                    this.state.today? {x: 'TODAY', y: this.props.chosenStockUrlsClone.openPrice } : {x: 'TODAY', y: 0}
                  ]}
                />
              </XYPlot>
            }

            </Grid.Column>









            <Grid.Column>
                {this.state.increase?
                    <></>
                  :
                    this.state.decrease?
                      <></>
                  :
                      <div>

                      <Label size="massive" color='red'>
                      Price increase or decrease in the past year?<br />
                      </Label>
                      <br /><br /><br />

                      <Button
                        animated='fade'
                        onClick={this.handleIncrease}
                        basic size="massive"
                        color="black"
                      >
                        <Button.Content visible>
                          Increase?
                        </Button.Content>
                        <Button.Content hidden>
                        <Icon size="big" name='earlybirds' />
                        </Button.Content>
                      </Button>
                      <Button
                        animated='fade'
                        onClick={this.handleDecrease}
                        basic size="massive"
                        color="black"
                      >
                        <Button.Content visible>
                          Decrease?
                        </Button.Content>
                        <Button.Content hidden>
                        <Icon size="big" name='earlybirds' />
                        </Button.Content>
                      </Button>
                      </div>
                    }
                <br /> <br />
                  {this.state.today? <></> :
                    <Form size="big" onSubmit={this.handleSubmit}>
                    <Form.Group>
                    <Form.Input
                      label="Today's Price?"
                      color='red'
                      placeholder="Today's Price?"
                      onChange={event => {this.setState({input: event.target.value})}}
                      />
                      <br /><br/>
                      <Form.Input
                        label="Bet?"
                        color='red'
                        placeholder="Amount?"
                        onChange={event => {this.setState({bet: event.target.value})}}
                        />
                    </Form.Group>
                      {this.state.input === ''? <></> : <Button type='submit'>Submit</Button>}
                    </Form>
                  }



              </Grid.Column>
                </Grid.Row>
                </Grid>
              </div>
    )
  }//render end
}//class end











// {/*onChange={event => {this.setState({input: event.target.value})}}*/}


// <input
// type="integer"
// placeholder="Bet?"
// onChange={event => {this.setState({bet: event.target.value})}}
// />

// <Form.Field
// label="Bet?"
// color='red'
// size="large"
// />

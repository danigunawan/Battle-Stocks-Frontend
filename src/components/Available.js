import React from 'react'
import { Icon, Container, Grid, Button } from 'semantic-ui-react'

export default class Available extends React.Component {

  state = {
    filteredUserWins:[],
    colorArray:["red", "orange", "yellow", "green", "blue"],
  }

  randomItem = () => {
    let color = this.state.colorArray[Math.floor(Math.random()*this.state.colorArray.length)];
    return color.toString()
  }

  async componentDidMount(){
  await fetch('https://localhost:3000/api/v1/portfoliostocks')
    .then(r => r.json())
    .then(r=>{
      let filteredUser = r.filter(portfoliostock=> portfoliostock.user_id === this.props.user.id)
      let filteredUserWins = filteredUser.filter(stock=>stock.win && !stock.owned)

      this.setState({filteredUserWins})
      })
    }

    handleClick = (symbol) => {
      this.props.chosenStockToPurchase(symbol)
      this.props.history.push('/BuyStocks')
    }


  render(){
    return (
      <div>
      <Container textAlign='center'>
      <Grid>
      <Grid.Row columns={4}>
       {this.state.filteredUserWins.map(userstocks => {
            return (
            <Grid.Column>
            <h2>{userstocks.name}</h2>
            <Button
              onClick={props =>this.handleClick(userstocks.symbol)}
              animated='fade'
              basic size="big"
              color={this.randomItem()}
            >
              <Button.Content visible >
                {userstocks.symbol}
              </Button.Content>
              <Button.Content hidden>
              <Icon size="large" name='earlybirds' />
              </Button.Content>
            </Button>
            <h2>One Year Price: {userstocks.oneYrPrice}</h2>
            <h2>Today's Price: {userstocks.openPrice}</h2><br />
            </Grid.Column>
          )
        })}
        </Grid.Row>
        </Grid>
        </Container>
      </div>
    )
  }
}

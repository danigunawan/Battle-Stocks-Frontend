import React from 'react'
import { Icon, Divider, Segment, Container, Grid, Image, Button } from 'semantic-ui-react'

export default class portfolio extends React.Component {

  state = {
    filteredUserWins:[],
    colorArray:["red", "orange", "yellow", "green", "blue"]
  }

  randomItem = () => {
    let color = this.state.colorArray[Math.floor(Math.random()*this.state.colorArray.length)];
    return color.toString()
  }

  async componentDidMount(){
  await fetch('http://localhost:3000/api/v1/portfoliostocks')
    .then(r => r.json())
    .then(r=>{
      let filteredUser = r.filter(portfoliostock=> portfoliostock.user_id === this.props.user.id)
      let filteredUserWins = filteredUser.filter(stock=>stock.win)
      this.setState({filteredUserWins})
      })
    }


  render(){
    return (
      <div>
      <h1>Portfolio</h1>
      <Container textAlign='center'>
      <Grid>
      <Grid.Row columns={4}>
       {this.state.filteredUserWins.map(userstocks => {
            return (
            <Grid.Column>
            <h2>{userstocks.stock.name}</h2>
            <Button
              animated='fade'
              onClick={this.handleClick}
              basic size="big"
              color={this.randomItem()}
            >
              <Button.Content visible>
                {userstocks.stock.symbol}
              </Button.Content>
              <Button.Content hidden>
              <Icon size="large" name='earlybirds' />
              </Button.Content>
            </Button>

            <h2>{userstocks.stock.oneYrPrice}</h2>
            <h2>{userstocks.stock.openPrice}</h2>
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


//   fetch('http://localhost:3000/api/v1/profile', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer localStorage.token <token>`
//   }

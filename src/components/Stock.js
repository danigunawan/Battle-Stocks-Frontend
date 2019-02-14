import React from 'react'
import { Label, Container, Button, Icon, Grid, Image } from 'semantic-ui-react'

export default class Stock extends React.Component {

  state = {
    colorArray:["red", "orange", "yellow", "green", "blue"]
  }

  handleClick = () => {
    this.props.pushStockIntoChosenStockUrlsState(this.props.symbol)
  }

  randomItem = () => {
    let color = this.state.colorArray[Math.floor(Math.random()*this.state.colorArray.length)];
    return color.toString()
  }

  render(){
    return (
      <Grid.Column>
        {this.props.chosenStockUrlsLength >= 1?
          <Container textAlign='center'>
          <br /><h3> Your Chosen Stock:</h3>
          <br /><br /><br /><br /><br /><br />
          <Label size="massive" as='a' color={this.randomItem()} tag>{this.props.name}</Label><br />
          <Image alt="" width="100" height="120" src={this.props.symbol} /><br /><br />
          </Container>

        :

          <div>
          <Container textAlign='center'><h3>{this.props.name}</h3></Container>
          <br />
          <Container textAlign='center'>
            <Button
              animated='fade'
              onClick={this.handleClick}
              basic size="big"
              color={this.randomItem()}
            >
              <Button.Content visible>
                {this.props.symbol}
              </Button.Content>
              <Button.Content hidden>
              <Icon size="large" name='earlybirds' />
              </Button.Content>
            </Button>
          </Container>
          <br />
          </div>
        }
      </Grid.Column>
    )
  }

}

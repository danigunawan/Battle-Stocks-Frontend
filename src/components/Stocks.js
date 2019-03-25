// import React from 'react'
// import Stock from './Stock'
// import { Icon, Divider, Segment, Container, Grid, Button } from 'semantic-ui-react'
//
// export default class Stocks extends React.Component {
//
//   render(){
//     return (
//       <div>
//           {this.props.chosenStockUrlsLength >= 1?
//             <Segment>
//               <Grid columns={2} relaxed='very'>
//                 <Grid.Column>
//                   <Container textAlign='center'><h3>Given price per share of your chosen stock ONE YEAR AGO: <br/>1) Did it Increase/Decrease?<br />2)Current Price?</h3></Container>
//                 </Grid.Column>
//                 <Grid.Column>
//                   <Container textAlign='center'><h3>Reward:<br /> Both currect? Double Account. <br /> Incorrect? -$500 and -Bet.<br /> 1/2? Receive half your bet.</h3></Container>
//                 </Grid.Column>
//               </Grid>
//               <Divider vertical>And</Divider>
//             </Segment>
//           :
//             <Container textAlign='center'><h1>The name of the game is BattleStocks!!!!!<br />Choose your stock:<br /><br /></h1></Container>
//           }
//
//             {this.props.chosenStockUrlsLength >= 1 ?
//               <Grid>
//               <Grid.Row columns={1}>
//               {this.props.chosenStockUrls.map(stock =>{
//               return (
//                 <Stock
//                 pushStockIntoChosenStockUrlsState={this.props.pushStockIntoChosenStockUrlsState}
//                 id={stock.id}
//                 clicked={stock.clicked}
//                 symbol={stock.symbol}
//                 logo={stock.logo}
//                 name={stock.name}
//                 chosenStockUrlsLength={this.props.chosenStockUrlsLength}
//                 />
//               )
//             })}
//             </Grid.Row>
//             </Grid>
//             :
//             <div class="grid">
//         {this.props.infocus.map(stock =>{
//         return (
//           <Stock
//           pushStockIntoChosenStockUrlsState={this.props.pushStockIntoChosenStockUrlsState} id={stock.symbol}
//           clicked={stock.clicked}
//           symbol={stock.symbol}
//           logo={stock.logo}
//           name={stock.name}
//           chosenStockUrlsLength={this.props.chosenStockUrlsLength}
//           />
//         )
//       })}
//       </div>
//
//
//         }
//
//         {this.props.chosenStockUrlsLength >= 1?
//
//           <Container textAlign='center'>
//           <Button
//             animated='fade'
//             onClick={() => this.props.history.push('/Chosenstockchart1')}
//             basic size="big"
//             color="black"
//           >
//           <Button.Content visible>
//               Let's Gamble
//           </Button.Content>
//           <Button.Content hidden>
//           <Icon size="large" name='earlybirds' />
//           </Button.Content>
//           </Button>
//           </Container>
//             :
//           <></>
//         }
//     </div>
//     )
//   }
// }






































import React from 'react'
import Stock from './Stock'
import { Icon, Divider, Segment, Container, Grid, Button } from 'semantic-ui-react'

export default class Stocks extends React.Component {

  render(){
    return (
      <div>
          {this.props.chosenStockUrlsLength >= 1?
            <Segment>
              <Grid columns={2} relaxed='very'>
                <Grid.Column>
                  <Container textAlign='center'><h3>Given price per share of your chosen stock ONE YEAR AGO: <br/>1) Did it Increase/Decrease?<br />2)Current Price?</h3></Container>
                </Grid.Column>
                <Grid.Column>
                  <Container textAlign='center'><h3>Reward:<br /> Both currect? Double Account. <br /> Incorrect? -$500 and -Bet.<br /> 1/2? Receive half your bet.</h3></Container>
                </Grid.Column>
              </Grid>
              <Divider vertical>And</Divider>
            </Segment>
          :
            <Container textAlign='center'><h1>The name of the game is BattleStocks!<br />Choose your stock:<br /><br /></h1></Container>
          }

          <Grid>
            {this.props.chosenStockUrlsLength >= 1 ?
              <Grid.Row columns={1}>
              {this.props.chosenStockUrls.map(stock =>{
              return (
                <Stock
                pushStockIntoChosenStockUrlsState={this.props.pushStockIntoChosenStockUrlsState}
                id={stock.id}
                clicked={stock.clicked}
                symbol={stock.symbol}
                logo={stock.logo}
                name={stock.name}
                chosenStockUrlsLength={this.props.chosenStockUrlsLength}
                />
              )
            })}
            </Grid.Row>
            :
        <Grid.Row columns={4}>
        {this.props.infocus.map(stock =>{
        return (
          <Stock
          pushStockIntoChosenStockUrlsState={this.props.pushStockIntoChosenStockUrlsState} id={stock.symbol}
          clicked={stock.clicked}
          symbol={stock.symbol}
          logo={stock.logo}
          name={stock.name}
          chosenStockUrlsLength={this.props.chosenStockUrlsLength}
          />
        )
      })}
      </Grid.Row>
        }
        </Grid>

        {this.props.chosenStockUrlsLength >= 1?

          <Container textAlign='center'>
          <Button
            animated='fade'
            onClick={() => this.props.history.push('/Chosenstockchart1')}
            basic size="big"
            color="black"
          >
          <Button.Content visible>
              Let's Gamble
          </Button.Content>
          <Button.Content hidden>
          <Icon size="large" name='earlybirds' />
          </Button.Content>
          </Button>
          </Container>
            :
          <></>
        }
    </div>
    )
  }
}

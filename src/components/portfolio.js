import React from 'react'

export default class Portfolio extends React.Component {
  state = {
    filteredUserPortfolio: []
  }

  async componentDidMount(){
  await fetch('http://localhost:3000/api/v1/portfoliostocks')
    .then(r => r.json())
    .then(r=>{
      let filteredUser = r.filter(portfoliostock=> portfoliostock.user_id === this.props.user.id)
      let filteredUserWins = filteredUser.filter(stock=>stock.win)
      let filteredUserPortfolio = filteredUserWins.filter(stock=>stock.portfolio)
      this.setState({filteredUserPortfolio})
      })
    }

    render(){
      return (
      <div>{this.state.filteredUserPortfolio.map(userstocks => {
        debugger
            return(
          <>
           <div>{userstocks.stock.name}</div>
           <div>{userstocks.stock.symbol}</div>
          </>
         )
       })}
      </div>
     )
   }//render end

}//end of class

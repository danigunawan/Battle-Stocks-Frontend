import React from 'react'

export default class portfolio extends React.Component {

  state = {
    filteredUserWins:[]
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
       {this.state.filteredUserWins.map(userstocks => {
            return (
            <div>
            <h2>{userstocks.stock.name}</h2>
            <h2>{userstocks.stock.symbol}</h2>
            <h2>{userstocks.stock.oneYrPrice}</h2>
            <h2>{userstocks.stock.openPrice}</h2>
            </div>
          )
        })}
      </div>
    )
  }
}


//   fetch('http://localhost:3000/api/v1/profile', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer localStorage.token <token>`
//   }

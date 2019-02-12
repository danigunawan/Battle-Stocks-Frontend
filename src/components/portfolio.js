import React from 'react'

export default class portfolio extends React.Component {

  componentDidMount(){
  fetch('http://localhost:3000/api/v1/portfoliostocks')
    .then(r => r.json())
    .then(r=>{
      let filteredUser = r.filter(user=> user.user_id === this.props.user.id)
        this.props.portfolioStocksSetState(filteredUser)
      })
    }
  //     debugger
  //     console.log(r)
  //   })
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     trip_id: this.props.tripId,
  //     image_url: this.state.imgUrl,
  //     review: this.state.review,
  //     rating: parseInt(this.state.rating)
    // }
  // }).then(resp=>c)


  render(){
    return (
      <div>
      <h1>Portfolio</h1>
      {this.state.filteredUser.map(userstocks => {
        debugger
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

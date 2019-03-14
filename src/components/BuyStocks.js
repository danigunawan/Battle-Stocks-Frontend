import React from 'react'


export default class BuyStocks extends React.Component {

  state = {
    price: null,
    shares: '',
    stocks:[],
    symbol:'',
    stockId:null,
  }

  componentDidMount(){
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.stockToPurchase}/price`)
    .then(r => r.json())
    .then(r => {
      this.setState({price:r})
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const accountBalance = this.props.account - (this.state.price * this.state.shares)
    this.setState({symbol:this.props.stockToPurchase},()=>{

    return this.state.shares > Math.floor(this.props.account / this.state.price)? alert(`Shares must be under ${Math.floor(this.props.account / this.state.price)}`)
    :
    <></>
    // fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`)
    // .then(r=>r.json())
    // .then(r=>{
    //   debugger
    //   this.setState({stocks:r.stocks},()=>{
    //   let stock = this.state.stocks.filter(stock=>stock.symbol === this.state.symbol)
    //   this.setState({stockId:stock.id}, () =>{
    //   fetch('http://localhost:3000/api/v1/portfoliostocks', {
    //     method: 'PATCH',
    //     headers: {
    //               'Content-Type': 'application/json',
    //               'Accept': 'application/json'
    //             },
    //             body: JSON.stringify({
    //               user_id: this.props.user.id,
    //               stock_id: this.state.stockId,
    //               win: true,
    //               portfolio: true
    //             })
    // })
    //
    // })
    // })
    // })
    debugger
    this.props.history.push('/Portfolio')
  })
  }//handlesubmit end


  // .then(data => {
  //       fetch(`https://travsketball.herokuapp.com/api/v1/users/1/trips/${this.props.tripId}`, {
  //         method: 'PATCH',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           completed: true
  //         })
  //       })
  //       .then(window.location.href = '/trip-list')
  //     })







  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Stock: {this.props.stockToPurchase}</label><br />
        <br />
        <label>Price Per Share: ${this.state.price}</label><br />
        <br />
        <label>Account Balance: ${this.props.account}</label><br />
        <br />
        <label>Shares available to buy based on your account balance: {Math.floor(this.props.account / this.state.price)}</label><br />
        <br />
        <label>Shares:</label>
        <input type='integer' name="shares" value={this.state.shares} onChange={e => this.handleChange(e)}/>
        <br /><br />
        <input type="submit" value="Purchase"/>
      </form>
    )
  }

}//end of class

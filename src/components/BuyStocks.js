import React from 'react'
import '../css/BuyStocks.css'

export default class BuyStocks extends React.Component {

  state = {
    price: null,
    shares: '',
    stocks:[],
    symbol:'',
    stockId:'',
    newStockValue: null,
    currentBankAccount: null
  }

  componentDidMount(){
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.stockToPurchase}/price`)
    .then(r => r.json())
    .then(r => {
      this.setState({price:r})
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    let stockValue = this.state.price * this.state.shares
    if (this.state.shares > Math.floor(this.props.account / this.state.price)){
      alert(`Shares must be under ${Math.floor(this.props.account / this.state.price)}`)
      this.props.history.push('/BuyStocks')
    }else{
    await fetch(`https://localhost:3000/api/v1/users/${this.props.user.id}`)
    .then(r=>r.json())
    .then(r=>{
      this.setState({newStockValue: parseInt((r.stock_account + stockValue).toFixed(2)), currentBankAccount:parseInt((r.account - stockValue).toFixed(2))})
    })
    await fetch(`https://localhost:3000/api/v1/users/${this.props.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        stock_account: this.state.newStockValue,
        bank_account: this.state.currentBankAccount
      })
    })//fetch end

    await this.setState({symbol:this.props.stockToPurchase})

    await fetch(`https://localhost:3000/api/v1/portfoliostocks`)
    .then(r=>r.json())
    .then(r=>{
      const selectedStock = r.find(stock => stock.symbol === this.props.stockToPurchase)
      this.setState({stockId:selectedStock.stock_id}, () =>{

      const selectedStockIndex = r.findIndex(stock => stock.user_id === this.props.user.id && stock.stock_id === this.state.stockId)+1

      fetch(`https://localhost:3000/${selectedStockIndex}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'owned':true
        })
      })
    })
    })

    this.props.setAccountState(this.state.currentBankAccount, this.state.newStockValue)

      await fetch('https://localhost:3000/api/v1/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: this.props.user.id,
          symbol:this.props.stockToPurchase,
          shares:this.state.shares,
          stock_id:this.state.stockId
        })
      })//fetch end

    this.props.history.push('/Portfolio')
  }//end of if else statement
}//handle submit end

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form class="buy" onSubmit={this.handleSubmit}>
        <container id="buy2">
        <label>Stock: {this.props.stockToPurchase}</label><br />
        <br /><br />
        <label>Price Per Share: ${parseInt(this.state.price)}</label><br />
        <br />
        <label>Account Balance: ${this.props.account}</label><br />
        <br />
        <div id="available">
        <label >Shares available to buy: {Math.floor(this.props.account / this.state.price)}</label><br />
        </div>
        <label>Shares:</label>
        <input type='integer' name="shares" value={this.state.shares} onChange={e => this.handleChange(e)}/>
        <br /><br />
        <input type="submit" value="Purchase"/>
        </container>
      </form>
    )
  }

}//end of class

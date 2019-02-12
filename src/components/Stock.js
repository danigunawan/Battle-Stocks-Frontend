import React from 'react'

export default class Stock extends React.Component {

  handleClick = () => {
    this.props.pushStockIntoChosenStockUrlsState(this.props.symbol)
  }

  render(){
    return (
      <div>
      {this.props.chosenStockUrlsLength >= 1?
        <div>
        <br /> Your Chosen Stock:<br /><br />
        {this.props.name}<br />
        {this.props.symbol}<br />
        <img alt="" width="100" height="120" src={this.props.logo} /><br /><br />
      </div>
      :
      <div>
        {this.props.name}<br />
        {this.props.symbol}<br />
        <img alt="" src={this.props.logo} width="100" height="120"  /><br />
        <button onClick={this.handleClick}>Pick Stock</button>
      </div>
    }
    </div>
    )
  }
}
// onerror="this.src='https://st2.depositphotos.com/7760196/10625/i/950/depositphotos_106255076-stock-photo-archimedes-eureka-swimming-bath-cartoon.jpg'"

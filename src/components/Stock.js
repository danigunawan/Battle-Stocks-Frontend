import React from 'react'

export default class Stock extends React.Component {

  handleClick = (e) => {
    this.props.changeClickedAndPushStockIntoChosenStockUrlsState(this.props.clicked, this.props.id)
  }

  render(){
    return (
      <div>
      {this.props.clicked && this.props.chosenStockUrlsLength >= 4?
        <div>
        <br /> Your Chosen Stock:<br /><br />
        {this.props.companyName}<br />
        {this.props.symbol}<br />
        <img alt="" width="100" height="120" src={this.props.logo} /><br /><br />
      </div> : this.props.clicked?
      <></>
      :
      <div>
        {this.props.companyName}<br />
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
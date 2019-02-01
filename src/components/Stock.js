import React from 'react'

export default class Stock extends React.Component {

  handleClick = (e) => {
    this.props.changeClickedAndPushStockIntoChosenStockUrlsState(this.props.clicked, this.props.id)
  }

  render(){
    console.log(this.props.chosenStockUrlsLength)
    return (
      <div>
      {this.props.clicked && this.props.chosenStockUrlsLength >= 4? <div>
        {this.props.companyName}<br />
        {this.props.symbol}<br />
        <img alt="" width="100" height="120" src={this.props.logo} /><br />
      </div> : this.props.clicked?
      <></>
      :
      <div>
        {this.props.companyName}<br />
        {this.props.symbol}<br />
        <img alt="" width="100" height="120" src={this.props.logo} /><br />
        <button onClick={this.handleClick}>Pick Stock</button>
      </div>
    }
    </div>
    )
  }
}

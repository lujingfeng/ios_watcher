/**
 * @require ../rank.less
 */

import React from 'react';

class Rank extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      val: 5
    };
    this.style = {
      rank: { 
        display: 'inline-block'
      },
      star: { 
        width: this.props.width || '35px'
      },
    };
  }

  componentWillReceiveProps (nextProps){
    if(nextProps.value != this.state.value){
      this.setState({value: nextProps.value});
    }
  }

  onClickable(k,e) {
    if(!this.props.onClickable) return false;

    this.setState({
      value: k+1, 
    },function(){
      this.props.onCheckStar && this.props.onCheckStar(this.state.value);
    });
  }

  render () {
    let {
      value,
      val,
    } = this.state;

    console.log(this.state.value, this.props.width);

    return (
      
      <div className="rank" style={this.style.rank}>
        <div 
          className='already' 
          style={{width: this.state.value * this.props.width, height: this.props.width}}>
          {val ? (Array(val).join(',').split(',').map((v,k) => <img key={k} style={this.style.star} onClick={this.onClickable.bind(this,k)} src={__uri("/static/image/star.png")} />)) : ''}
        </div>
        <div 
          style={{height: this.props.width}}
          className='notYet'>
          {val ? (Array(val).join(',').split(',').map((v,k) => <img key={k} style={this.style.star} onClick={this.onClickable.bind(this,k)} src={__uri("/static/image/star_o.png")} />)) : ''}
        </div>
      </div>
    );
  }
}

Rank.defaultProps = {
  value: 0
};

export default Rank;
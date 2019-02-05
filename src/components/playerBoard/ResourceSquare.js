import React, {Component} from 'react';
import './resourcesquare.css';


class ResourceSquare extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: props.name,
			production: 0,
			amount: 0,
			icon: props.icon,
			editable: props.editable || false
		}
		console.log(props);
		this.updateValue = this.updateValue.bind(this);
	}
	getStorage(){
		const updateObj = {};
		if(localStorage[this.props.name+'_amount']){
			updateObj.amount = parseInt(localStorage[this.props.name+'_amount']);
		}
		if(localStorage[this.props.name+'_production']){
			updateObj.production = parseInt(localStorage[this.props.name+'_amount']);
		}
		this.setState(updateObj);
	}
	setStorage(key, value){
		localStorage[this.props.name+'_'+key] = value;
	}
	getDelta(event){
		return parseInt(event.target.getAttribute('direction'));
	}
	harvestProduction(){
		this.setStorage('amount',this.state.amount + this.state.production);
		this.setState({
			amount: (this.state.amount + this.state.production)
		})
	}
	updateValue(event){
		const delta = this.getDelta(event);
		const type = event.target.parentNode.getAttribute('type');
		let min = 0;
		debugger;
		if(type!=='amount' && this.props.min < 0){
			min = parseInt(this.props.min);
		}
		if(this.state[type]+delta>=min){
			this.setStorage(type, this.state[type]+delta);
			this.setState({
				[type] : this.state[type]+delta
			})
		}
	}
	componentDidMount(){
		this.getStorage();
	}
	render(){
		return (
		<div className='resourceSquare' style={{backgroundImage: `url(${this.state.icon})`}}>
			<div className='centering'>
				<div type='amount' className='amountStorage'>
					<span className='label'>Count: </span>
					<span className='shiftButton' onClick={this.updateValue} direction='-1'>&lt;</span>
					<span className='resourceValue' contentEditable={this.props.contentEditable}>{this.state.amount}</span>
					<span className='shiftButton' onClick={this.updateValue} direction='1'>&gt;</span>
				</div>
				<div onClick={this.updateValue} type='production' className='amountProduction'>
					<span className='label'>Production: </span>
					<span className='shiftButton' onClick={this.updateValue} direction='-1'>&lt;</span>
					<span className='resourceValue'>{this.state.production}</span>
					<span className='shiftButton' onClick={this.updateValue} direction='1'>&gt;</span>
				</div>
			</div>
		</div>
		);
	}
}

export default ResourceSquare;
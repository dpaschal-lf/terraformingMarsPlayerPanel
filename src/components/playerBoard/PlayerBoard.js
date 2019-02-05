import React, {Component} from 'react';
import ResourceSquare from './ResourceSquare';
import defaultIcon from './questionIcon.png';
import image_titanium from './titanium.jpg';
import image_money from './money.jpg';
import image_steel from './steel.jpg';
import image_plants from './plants.jpg';
import image_electricity from './electricity.jpg';
import image_heat from './heat.jpg';

class PlayerBoard extends Component{
	constructor(props){
		super(props);

		this.state = {
			resources: {
				money: {
					min: -5,
					icon: image_money,
					editable: true
				},
				steel: {
					icon: image_steel,
					convert:{
						resource: 'money',
						rate: {
							from: 1,
							to: 2
						}
					}
				},
				titanium: {
					icon: image_titanium,
					convert:{
						resource: 'money',
						rate: {
							from: 1,
							to: 3
						}
					}
				},
				plants: {
					icon: image_plants,
					convert: {
						rate: {
							from: 8,
							to: 1								
						}
					}
				},
				electricity: {
					icon: image_electricity,
					convert: {
						resource: 'heat',
						rate: {
							from: 1,
							to: 1
						}
					}
				},
				heat: {
					icon: image_heat,
					convert: {
						rate: {
							from: 8,
							to: 1
						}
					}
				}
			}
		};

	}
	getSections(){
		const res = this.state.resources;
		const resourceElements = [];
		const defaults = {
			icon: defaultIcon,
		}
		for(var key in res){
			console.log(key);
			let elem = res[key];
			resourceElements.push(
				<ResourceSquare ref={key} key={key} name={key} icon={elem.icon} {...res[key]}/>
			)
		}
		this.resourceElements = resourceElements;
		return resourceElements;
	}
	updateElements=()=>{
		console.log(this.refs);
		for(var key in this.refs){
			this.refs[key].harvestProduction();
		}
	}
	render(){
		return (
		<div>
			<div onClick={this.updateElements}>update</div>
			{this.getSections()}
		</div>
		);
	}
}
















export default PlayerBoard;
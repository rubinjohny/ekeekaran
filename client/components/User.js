import React, { Component } from 'react';
import '../public/stylesheets/boilerplate.css';
import axios from 'axios';

class User extends Component {
	constructor(props) {
		super(props);
		this.state={
			link:this.props.location.pathname.slice(6),
			loading:true,
			loadingRepos:true
		}
	}

	componentWillMount(){
		axios.get(this.state.link)
		.then((response) =>{
			// console.log('response:',response.data)

			this.setState({
				loading:false,
				description:response.data.description,
				homepage:response.data.homepage,
				name:response.data.name,
				repos_url:response.data.owner.repos_url 
			});

		})
		.catch((error) =>{
			console.log("error:",error)
		})
	}

	returnrepos(){
		var x=[];
		if(this.state.repos_url && this.state.loadingRepos){
			axios.get(this.state.repos_url)
			.then((response) =>{
				// console.log("response:",response)
				response.data.map((item,index) =>{
					x.push(<p key={index}>{item.full_name}</p>)
				})
				
				this.setState({
					repos_names:x,
					loadingRepos:false 
				});
			})
			.catch((error) =>{
				console.log("error:",error)
			})
		}

		return this.state.repos_names
		
	}

	render() {
		return (
			<div>
				{this.state.loading && (<p>loading...</p>)}

				{!this.state.loading && (
					<div style={{padding:'50px'}}>
						<h3>{this.state.name}</h3>
						<h4>{this.state.description}</h4>
						<a href={this.state.homepage} >homepage</a>
						<h2>Repositories</h2>
						<div>{this.returnrepos()}</div>
					</div>
				)}

			</div>
		);
	}
}

export default User;
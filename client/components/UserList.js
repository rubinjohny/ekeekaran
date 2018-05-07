import React, { Component } from 'react';
import '../public/stylesheets/boilerplate.css';
import axios from 'axios';

import 'antd/dist/antd.css';
import { Table,Avatar,Button } from 'antd';
import {Link} from 'react-router-dom';




class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			repos:[],
			loading:true
		}
	}

	componentWillMount(){

		axios.get('https://api.github.com/repositories',{q:''})
		.then((response) =>{
			let x= [];
			response.data.map((item,index) =>{
				x.push({name:item.name,username:item.full_name,avatar:item.owner.avatar_url,key:index,url:item.url})
			})
			this.setState({
				repos:x,
				loading:false 
			});

		})
		.catch((error) =>{
			console.log("error:",error)
		})
	}

	render() {

		var columns = [{
		  title: 'Avatar',
		  dataIndex: 'avatar',
		  key: 'avatar',
		  width:'20%',
		  render:(value) =>{return(<Avatar src={value}/>)}
		}, {
		  title: 'Name',
		  dataIndex: 'name',
		  key: 'name',
		  width:'30%'
		}, {
		  title: 'Username',
		  dataIndex: 'username',
		  key: 'username',
		  width:'30%'
		}, {
			title: "Action",
			key:"view",
			width:'20%',
			render :(value,index) =>{let link="/user/"+value.url; return(<Link to={link}><Button>View</Button></Link>)}
		}];


		return (
			<div>
			    <h3 style={{ marginBottom: 16 }}>Git Repositories</h3>
			    <div style={{padding: 50}}>
				    {!this.state.loading && (<Table 
											    dataSource={this.state.repos} 
											    columns={columns}
											    pagination={false} 
											    scroll={{ y: 600 }}
											    size='small'
										    />
				    )}

				    {this.state.loading && (<p>loading...</p>)}

				</div>
			</div>
		);
	}
}

export default UserList;
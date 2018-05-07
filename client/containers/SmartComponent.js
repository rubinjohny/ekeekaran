import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStarted } from '../actions';
import DumbComponent from '../components/DumbComponent';

import UserList from '../components/UserList';
import User from '../components/User';
import { HashRouter as Router, Route, hashHistory, IndexRoute} from 'react-router-dom';

// import { Router, Route, Switch } from 'react-router';


class SmartComponent extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.props.dispatch(getStarted());
	}

	render() {

		return (
			<Router history={hashHistory}>
	            <div>
		            <Route exact path="/" component={UserList} />
		            <Route path="/user/:id" component={User} />
          		</div>
          	</Router>
		);
	}
}

export default connect(state => state)(SmartComponent);
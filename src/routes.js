import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ListContact from './schenes/List-Contact';

class Routes extends Component {
render() {
    return(
			<div>
				<Switch>
					<Route exact path="/" component={ListContact}/>
					<Redirect to="/" />
				</Switch>
			</div>
    );
	}
}

export default Routes;
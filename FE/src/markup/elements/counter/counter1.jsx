import React, { Component } from 'react';

// Elements
import Count from '../../elements/counter/counter-sensor';

class Counter1 extends Component{
	render(){
		return(
			<>
				<div className="row">
					<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
						<div className="counter-style-1">
							<div className="text-primary">
								<Count counter={3000}/><span>+</span>
							</div>
							<span className="counter-text">Completed Projects</span>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
						<div className="counter-style-1">
							<div className="text-black">
								<Count counter={2500}/><span>+</span>
							</div>
							<span className="counter-text">Happy Clients</span>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
						<div className="counter-style-1">
							<div className="text-primary">
								<Count counter={1500}/><span>+</span>
							</div>
							<span className="counter-text">Questions Answered</span>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
						<div className="counter-style-1">
							<div className="text-black">
								<Count counter={1000}/><span>+</span>
							</div>
							<span className="counter-text">Ordered Coffee's</span>
						</div>
					</div>
				</div>
				
			</>
		);
	}
}

export default Counter1;
import React, { Component } from 'react';

// Elements
import Count from '../../elements/counter/counter-sensor';

// Images
import bg1 from '../../../images/background/bg1.jpg';

class Counter1 extends Component{
	render(){
		return(
			<>	
				<div className="section-area section-sp1 bg-fix ovbl-dark text-white" style={{backgroundImage:"url("+bg1+")"}}>
					<div className="container">
						<div className="row">
							<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
								<div className="counter-style-1">
									<div className="text-white">
										<Count counter={3000}/><span>+</span>
									</div>
									<span className="counter-text">Completed Projects</span>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
								<div className="counter-style-1">
									<div className="text-white">
										<Count counter={2500}/><span>+</span>
									</div>
									<span className="counter-text">Happy Clients</span>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
								<div className="counter-style-1">
									<div className="text-white">
										<Count counter={1500}/><span>+</span>
									</div>
									<span className="counter-text">Questions Answered</span>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
								<div className="counter-style-1">
									<div className="text-white">
										<Count counter={1000}/><span>+</span>
									</div>
									<span className="counter-text">Ordered Coffee's</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Counter1;
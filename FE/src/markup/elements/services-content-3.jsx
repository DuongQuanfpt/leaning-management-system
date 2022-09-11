import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ServicesContent3 extends Component{
	render(){
		return(
			<>
				<div className="row">
					<div className="col-lg-4 col-md-6">
						<div className="services-bx text-left m-b30">
							<div className="feature-lg text-white m-b30">
								<span className="icon-cell"><i className="flaticon-professor"></i></span> 
							</div>
							<div className="icon-content">
								<h4 className="ttr-tilte">Our Philosophy</h4>
								<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod..</p>
								<Link to="/about-1" className="readmore">Learn More <i className="la la-arrow-right"></i></Link>
							</div>
							<div className="service-no">01</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div className="services-bx text-left m-b30">
							<div className="feature-lg text-white m-b30">
								<span className="icon-cell"><i className="flaticon-exam"></i></span> 
							</div>
							<div className="icon-content">
								<h4 className="ttr-tilte">Our Philosophy</h4>
								<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod..</p>
								<Link to="/about-1" className="readmore">Learn More <i className="la la-arrow-right"></i></Link>
							</div>
							<div className="service-no">02</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-12">
						<div className="services-bx text-left">
							<div className="feature-lg text-white m-b30">
								<span className="icon-cell"><i className="flaticon-books"></i></span> 
							</div>
							<div className="icon-content">
								<h4 className="ttr-tilte">Our Philosophy</h4>
								<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod..</p>
								<Link to="/about-1" className="readmore">Learn More <i className="la la-arrow-right"></i></Link>
							</div>
							<div className="service-no">03</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default ServicesContent3;
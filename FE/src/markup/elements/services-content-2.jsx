import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Images
import ServicePic1 from '../../images/our-services/pic1.jpg';
import ServicePic2 from '../../images/our-services/pic2.jpg';
import ServicePic3 from '../../images/our-services/pic3.jpg';

class ServicesContent2 extends Component{
	render(){
		return(
			<>
				<div className="section-area section-sp1 service-info-bx">
					<div className="container">
						<div className="row">
							<div className="col-md-12 heading-bx left">
								<h2 className="title-head">Why Choose <span> Our Institution</span></h2>
								<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-lg-4 col-md-6 col-sm-12">
								<div className="service-bx m-b30">
									<div className="action-box">
										<img src={ServicePic1} alt=""/>
									</div>
									<div className="info-bx">
										<h4 className="m-b10"><Link to="/courses-details">Best Industry Leaders</Link></h4>
										<p className="m-b20">Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley.</p>
										<Link to="/courses-details" className="btn radius-xl">View More</Link>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<div className="service-bx m-b30">
									<div className="action-box">
										<img src={ServicePic2} alt=""/>
									</div>
									<div className="info-bx">
										<h4 className="m-b10"><Link to="/courses-details">Learn Courses Online</Link></h4>
										<p className="m-b20">Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley.</p>
										<Link to="/courses-details" className="btn radius-xl">View More</Link>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<div className="service-bx m-b30">
									<div className="action-box">
										<img src={ServicePic3} alt=""/>
									</div>
									<div className="info-bx">
										<h4 className="m-b10"><Link to="/courses-details">Book Library & Store</Link></h4>
										<p className="m-b20">Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley.</p>
										<Link to="/courses-details" className="btn radius-xl">View More</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default ServicesContent2;
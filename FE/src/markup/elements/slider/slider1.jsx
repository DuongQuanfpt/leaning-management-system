import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";

// Images
import Image1 from "../../../images/slider/slide1.jpg"
import Image2 from "../../../images/slider/slide2.jpg"

class Slider1 extends Component{
	
	render(){
		
		const settings = {
			dots: false,
			infinite: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
		};
		
		return(
			<>
				
				<Slider {...settings} className="tt-slider slider-one slider-sp0">
					<div className="slider-item">
						<div className="slider-thumb ovbl-dark">
							<img src={Image1} alt=""/>
						</div>
						<div className="slider-content text-white">
							<div className="container">
								<div className="content-inner">
									<h6 className="sub-title">Welcome To University </h6>
									<h2 className="title">Master the Skills to Drive your Career.</h2>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
									<Link className="btn radius-xl m-r15 button-md white" to="/contact-1">Contact Us</Link>
									<Link className="btn radius-xl button-md" to="/about-1">Read More</Link>
								</div>
							</div>
						</div>
					</div>			
					<div className="slider-item">
						<div className="slider-thumb ovbl-dark">
							<img src={Image2} alt=""/>
						</div>
						<div className="slider-content text-white">
							<div className="container">
								<div className="content-inner">
									<h6 className="sub-title">Welcome To University </h6>
									<h2 className="title">Master the Skills to Drive your Career.</h2>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
									<Link className="btn radius-xl m-r15 button-md white" to="/contact-1">Contact Us</Link>
									<Link className="btn radius-xl button-md" to="/about-1">Read More</Link>
								</div>
							</div>
						</div>
					</div>					
				</Slider>
				
			</>
		);
	}
}

export default Slider1;

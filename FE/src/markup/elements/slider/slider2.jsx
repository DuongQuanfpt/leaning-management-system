import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";

// Images
import Image1 from "../../../images/slider/slide3.jpg"
import pic1 from "../../../images/slider/pic1.png"

class Slider2 extends Component{
	
	render(){
		
		const settings = {
			infinite: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
		};
		
		return(
			<>
				
				<Slider {...settings} className="tt-slider slider-two slider-sp0 owl-none">
					<div className="slider-item">
						<div className="slider-thumb">
							<img src={Image1} alt=""/>
						</div>
						<div className="slider-content">
							<div className="container">
								<div className="row align-items-center">
									<div className="col-lg-7">
										<div className="content-inner">
											<h6 className="sub-title">Welcome To Educhamp </h6>
											<h2 className="title text-primary">Own your future  learning new skills</h2>
											<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
											<Link className="btn radius-xl m-r15 button-md white" to="/contact-1">Contact Us</Link>
											<Link className="btn radius-xl button-md" to="/about-1">Read More</Link>
										</div>
									</div>
									<div className="col-lg-5">
										<div className="slider-img">
											<img src={pic1} alt=""/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>			
					<div className="slider-item">
						<div className="slider-thumb">
							<img src={Image1} alt=""/>
						</div>
						<div className="slider-content">
							<div className="container">
								<div className="row align-items-center">
									<div className="col-lg-7">
										<div className="content-inner">
											<h6 className="sub-title">Welcome To Educhamp </h6>
											<h2 className="title text-primary">Own your future  learning new skills</h2>
											<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
											<Link className="btn radius-xl m-r15 button-md white" to="/contact-1">Contact Us</Link>
											<Link className="btn radius-xl button-md" to="/about-1">Read More</Link>
										</div>
									</div>
									<div className="col-lg-5">
										<div className="slider-img">
											<img src={pic1} alt=""/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>					
				</Slider>
				
			</>
		);
	}
}

export default Slider2;

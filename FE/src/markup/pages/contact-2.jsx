import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Iframe from 'react-iframe'

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Images
import bannerImg from '../../images/banner/banner2.jpg';

class Contact2 extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">Contact Us 2</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>Contact Us 2</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="page-banner contact-page">
							<div className="container-fuild">
								<div className="row m-lr0">
									<div className="col-lg-6 col-md-6 p-lr0 d-flex map-frame1">
										<Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.1298878182047!2d-81.38369578541523!3d30.204840081824198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e437ac927a996b%3A0x799695b1a2b970ab!2sNona+Blue+Modern+Tavern!5e0!3m2!1sen!2sin!4v1548177305546" className="align-self-stretch d-flex" allowfullscreen></Iframe>
									</div>
									<div className="col-lg-6 col-md-6 section-sp2 p-lr30">
										<form className="contact-bx ajax-form">
										<div className="ajax-message"></div>
											<div className="heading-bx left p-r15">
												<h2 className="title-head">Get In <span>Touch</span></h2>
												<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
											</div>
											<div className="row placeani">
												<div className="col-lg-6 ">
													<div className="form-group">
														<div className="input-group">
															<input name="name" type="text" placeholder="Your Name" required className="form-control valid-character"/>
														</div>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="form-group">
														<div className="input-group">
															<input name="email" type="email" placeholder="Your Email Address" className="form-control" required />
														</div>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="form-group">
														<div className="input-group">
															<input name="phone" type="text" placeholder="Your Phone" required className="form-control int-value"/>
														</div>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="form-group">
														<div className="input-group">
															<input name="subject" type="text" placeholder="Subject" required className="form-control"/>
														</div>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="form-group">
														<div className="input-group">
															<textarea name="message" rows="4" placeholder="Type Message" className="form-control" required ></textarea>
														</div>
													</div>
												</div>	
												<div className="col-lg-12">
													<button name="submit" type="submit" value="Submit" className="btn button-md"> Send Message</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
						
					</div>
					
				</div>
				
				<Footer/>
				
			</>
		);
	}
}

export default Contact2;
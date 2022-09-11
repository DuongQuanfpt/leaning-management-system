import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ModalVideo from 'react-modal-video'
import {Accordion, Card } from 'react-bootstrap';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import Counter1 from "../elements/counter/counter1";

// Images
import bannerImg from '../../images/banner/banner2.jpg';
import bg1 from '../../images/background/bg1.jpg';
import aboutPic1 from '../../images/about/pic1.jpg';

class Membership extends Component{
	
	constructor () {
		super()
		this.state = {
			isOpen: false
		}
		this.openModal = this.openModal.bind(this)
	}
	openModal () {
		this.setState({isOpen: true})
	}
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">Membership</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>Membership</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="section-area section-sp1">
							<div className="container">
								<div className="row">
									<div className="col-md-12 heading-bx text-center">
										<h2 className="title-head m-b0">Join <span>Membership</span></h2>
										<p className="m-b0">It is a long established fact that a reader will be distracted by the readable content of a page</p>
									</div>
								</div>
								 <div className="pricingtable-row">
									<div className="row">
										<div className="col-sm-12 col-md-4 col-lg-4 m-b40">
											<div className="pricingtable-wrapper">
												<div className="pricingtable-inner">
													<div className="pricingtable-main"> 
														<div className="pricingtable-price"> 
															<span className="priceing-doller">$</span>
															<span className="pricingtable-bx">10</span>
															<span className="pricingtable-type">3 Month</span>
														</div>
														<div className="pricingtable-title">
															<h2>Basic</h2>
															<p>We are just getting started</p>
														</div>
													</div>
													<ul className="pricingtable-features">
														<li>One Time Fee</li>
														<li>3 User</li>
														<li>Lifetime Availability</li>
														<li>Non Featured</li>
														<li>30 days Listing</li>
														<li>24/7 Support</li>
														<li>Select</li>
													</ul>
													<div className="pricingtable-footer"> 
														<Link to="#" className="btn radius-xl">Get It Now</Link>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-12 col-md-4 col-lg-4 m-b40">
											<div className="pricingtable-wrapper">
												<div className="pricingtable-inner pricingtable-highlight">
													<div className="pricingtable-main"> 
														<div className="pricingtable-price"> 
															<span className="priceing-doller">$</span>
															<span className="pricingtable-bx">15</span>
															<span className="pricingtable-type">6 Month</span>
														</div>
														<div className="pricingtable-title">
															<h2>Medium</h2>
															<p>The most popular plan</p>
														</div>
													</div>
													<ul className="pricingtable-features">
														<li>One Time Fee</li>
														<li>3 User</li>
														<li>Lifetime Availability</li>
														<li>Non Featured</li>
														<li>30 days Listing</li>
														<li>24/7 Support</li>
														<li>Select</li>
													</ul>
													<div className="pricingtable-footer"> 
														<Link to="#" className="btn radius-xl">Get It Now</Link>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-12 col-md-4 col-lg-4 m-b40">
											<div className="pricingtable-wrapper">
												<div className="pricingtable-inner">
													<div className="pricingtable-main"> 
														<div className="pricingtable-price"> 
															<span className="priceing-doller">$</span>
															<span className="pricingtable-bx">20</span>
															<span className="pricingtable-type">12 Month</span>
														</div>
														<div className="pricingtable-title">
															<h2>Advanced</h2>
															<p>Experience the best for e-learning</p>
														</div>
													</div>
													<ul className="pricingtable-features">
														<li>One Time Fee</li>
														<li>3 User</li>
														<li>Lifetime Availability</li>
														<li>Non Featured</li>
														<li>30 days Listing</li>
														<li>24/7 Support</li>
														<li>Select</li>
													</ul>
													<div className="pricingtable-footer"> 
														<Link to="#" className="btn radius-xl">Get It Now</Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="section-area section-sp1 bg-fix ovbl-dark" style={{backgroundImage:"url("+bg1+")"}}>
							<div className="container">
								<div className="text-center heading-bx text-white">
									<h2 className="title-head m-b0">Why Choose <span>Us</span></h2>
									<p className="m-b0">It is a long established fact that a reader will be distracted by the readable content of a page</p>
								</div>
								<div className="row align-items-center">
									<div className="col-lg-6">	
										<Accordion className="ttr-accordion m-b30 faq-bx">
											<Card>
												<Accordion.Toggle as={Card.Header} eventKey="0">
													<Link to="#" className="acod-title">Why won't my payment go through?</Link>
												</Accordion.Toggle>
												<Accordion.Collapse eventKey="0">
													<Card.Body>
														Web design aorem apsum dolor sit amet, adipiscing elit, sed diam nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
													</Card.Body>
												</Accordion.Collapse>
											</Card>
											<Card>
												<Accordion.Toggle as={Card.Header} eventKey="1">
													<Link to="#" className="acod-title">How do I get a refund?</Link>
												</Accordion.Toggle>
												<Accordion.Collapse eventKey="1">
													<Card.Body>
														Graphic design aorem apsum dolor sit amet, adipiscing elit, sed diam nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
													</Card.Body>
												</Accordion.Collapse>
											</Card>
											<Card>
												<Accordion.Toggle as={Card.Header} eventKey="2">
													<Link to="#" className="acod-title">How do I redeem a coupon?</Link>
												</Accordion.Toggle>
												<Accordion.Collapse eventKey="2">
													<Card.Body>
														Developement aorem apsum dolor sit amet, adipiscing elit, sed diam nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
													</Card.Body>
												</Accordion.Collapse>
											</Card>
											<Card>
												<Accordion.Toggle as={Card.Header} eventKey="3">
													<Link to="#" className="acod-title">Why aren't my courses showing in my account?</Link>
												</Accordion.Toggle>
												<Accordion.Collapse eventKey="3">
													<Card.Body>
														Developement aorem apsum dolor sit amet, adipiscing elit, sed diam nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
													</Card.Body>
												</Accordion.Collapse>
											</Card>
											<Card>
												<Accordion.Toggle as={Card.Header} eventKey="4">
													<Link to="#" className="acod-title">Changing account name</Link>
												</Accordion.Toggle>
												<Accordion.Collapse eventKey="4">
													<Card.Body>
														Developement aorem apsum dolor sit amet, adipiscing elit, sed diam nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
													</Card.Body>
												</Accordion.Collapse>
											</Card>
										</Accordion>
									</div>
									<div className="col-lg-6 m-b30">	
										<div className="video-bx">
											<img src={aboutPic1} alt=""/>
											<Link to="#" onClick={this.openModal} className="popup-youtube video"><i className="fa fa-play"></i></Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="section-area content-inner section-sp1">
							<div className="container">
								<div className="section-content">
									<Counter1 />
								</div>
							</div>
						</div>
						
					</div>
					
				</div>
				
				<Footer/>
				
				<ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='x_sJzVe9P_8' onClose={() => this.setState({isOpen: false})} />
				
			</>
		);
	}
}

export default Membership;
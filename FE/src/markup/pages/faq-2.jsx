import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion, Card} from 'react-bootstrap';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import FeatureContent1 from '../elements/feature-content1';
import Counter1 from '../elements/counter/counter1';
import ContactInfoCard from '../elements/contact-info-card';

// Images
import bannerImg from '../../images/banner/banner3.jpg';

class Faq2 extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">Frequently Asked Questions</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>Faqs 2</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="section-area section-sp1 bg-gray">
							<div className="container">
								<FeatureContent1 />
							</div>
						</div>
						
						<div className="section-area section-sp1">
							<div className="container">
								<div className="row">
									<div className="col-lg-8 col-md-12">
										<div className="heading-bx left mb-4">
											<h2 className="m-b10 title-head">Asked <span> Questions</span></h2>
											<p className="m-b0">It is a long established fact that a reader will be distracted by the readable content of a page</p>
										</div>
										<p className="m-b10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
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
											<Card>
												<Accordion.Toggle as={Card.Header} eventKey="5">
													<Link to="#" className="acod-title">Why aren't my courses showing in my account?</Link>
												</Accordion.Toggle>
												<Accordion.Collapse eventKey="5">
													<Card.Body>
														Developement aorem apsum dolor sit amet, adipiscing elit, sed diam nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
													</Card.Body>
												</Accordion.Collapse>
											</Card>
										</Accordion>
										<p className="m-b10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
									</div>
									<div className="col-lg-4 col-md-12 m-b30">
										<div className="sticky-top">
											<ContactInfoCard />
										</div>
									</div>
								</div>
								
							</div>
						</div>
			
						<div className="section-area content-inner section-sp1 bg-gray">
							<div className="container">
								<div className="section-content">
									<Counter1 />
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

export default Faq2;
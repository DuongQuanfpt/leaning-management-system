import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Iframe from 'react-iframe'

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import ContactInfoCard from '../elements/contact-info-card';

// Images
import bannerImg from '../../images/banner/banner1.jpg';
import blogThum1 from '../../images/blog/default/thum1.jpg';

class EventsDetails extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">Courses Details</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>Courses Details</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="section-area section-sp1">
							<div className="container">
								 <div className="row">
									<div className="col-lg-8 col-md-7 col-sm-12">
										<div className="courses-post">
											<div className="ttr-post-media media-effect">
												<img src={blogThum1} alt=""/>
											</div>
											<div className="ttr-post-info m-b30">
												<div className="ttr-post-title ">
													<h2 className="post-title">Good Intentions or Good Results?</h2>
												</div>
												<div className="ttr-post-text">
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
												</div>
											</div>
										</div>
										<div className="courese-overview" id="overview">
											<div className="row">
												<div className="col-md-12 col-lg-5">
													<ul className="course-features">
														<li><i className="ti-book"></i> <span className="label">Topics</span> <span className="value">Web design</span></li>
														<li><i className="ti-help-alt"></i> <span className="label">Host</span> <span className="value">EduChamp</span></li>
														<li><i className="ti-time"></i> <span className="label">Location</span> <span className="value">#45 Road</span></li>
														<li><i className="ti-stats-up"></i> <span className="label">Skill level</span> <span className="value">Beginner</span></li>
														<li><i className="ti-smallcap"></i> <span className="label">Language</span> <span className="value">English</span></li>
														<li><i className="ti-user"></i> <span className="label">Students</span> <span className="value">32</span></li>
														<li><i className="ti-check-box"></i> <span className="label">Assessments</span> <span className="value">Yes</span></li>
													</ul>
												</div>
												<div className="col-md-12 col-lg-7">
													<h5 className="m-b10">Event Description</h5>
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<h5 className="m-b10">Certification</h5>
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<h5 className="m-b10">Event Content</h5>
													<ul className="list-checked primary">
														<li>Over 37 lectures and 55.5 hours of content!</li>
														<li>Live Project End to End Software Testing Training Included.</li>
														<li>Learn Software Testing and Automation basics from a professional trainer from your own desk.</li>
														<li>Information packed practical training starting from basics to advanced testing techniques.</li>
														<li>Best suitable for beginners to advanced level users and who learn faster when demonstrated.</li>
														<li>Course content designed by considering current software testing technology and the job market.</li>
														<li>Practical assignments at the end of every session.</li>
														<li>Practical learning experience with live project work and examples.cv</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-5 col-sm-12 m-b30">
										<div className="sticky-top">
											<ContactInfoCard />
											<div className="map-frame2 m-t30">
												<Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.1298878182047!2d-81.38369578541523!3d30.204840081824198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e437ac927a996b%3A0x799695b1a2b970ab!2sNona+Blue+Modern+Tavern!5e0!3m2!1sen!2sin!4v1548177305546" className="align-self-stretch d-flex" allowfullscreen></Iframe>
											</div>
										</div>
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

export default EventsDetails;
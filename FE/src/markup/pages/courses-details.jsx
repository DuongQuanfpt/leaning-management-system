import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Link as ScrollTo} from 'react-scroll';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Images
import bannerImg from '../../images/banner/banner2.jpg';
import testiPic1 from '../../images/testimonials/pic1.jpg';
import testiPic2 from '../../images/testimonials/pic2.jpg';
import blogDefaultThum1 from '../../images/blog/default/thum1.jpg';

class CoursesDetails extends Component{
	
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
								 <div className="row d-flex flex-row-reverse">
									<div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 m-b30">
										<div className="course-detail-bx">
											<div className="course-price">
												<del>$190</del>
												<h4 className="price">$120</h4>
											</div>	
											<div className="course-buy-now text-center">
												<Link to="#" className="btn radius-xl">Buy Now This Courses</Link>
											</div>
											<div className="teacher-bx">
												<div className="teacher-info">
													<div className="teacher-thumb">
														<img src={testiPic1} alt=""/>
													</div>
													<div className="teacher-name">
														<h5>Hinata Hyuga</h5>
														<span>Science Teacher</span>
													</div>
												</div>
											</div>
											<div className="cours-more-info">
												<div className="review">
													<span>3 Review</span>
													<ul className="cours-star">
														<li className="active"><i className="fa fa-star"></i></li>
														<li className="active"><i className="fa fa-star"></i></li>
														<li className="active"><i className="fa fa-star"></i></li>
														<li><i className="fa fa-star"></i></li>
														<li><i className="fa fa-star"></i></li>
													</ul>
												</div>
												<div className="price categories">
													<span>Categories</span>
													<h5 className="text-primary">Frontend</h5>
												</div>
											</div>
											<div className="course-info-list scroll-page">
												<ul className="navbar">
													<li>
														<ScrollTo smooth={true} activeClass="active" spy={true} className="nav-link" to={"overview"}>
															<i className="ti-zip"></i> Overview
														</ScrollTo>
													</li>
													<li>
														<ScrollTo smooth={true} activeClass="active" spy={true} className="nav-link" to={"curriculum"}>
															<i className="ti-bookmark-alt"></i> Curriculum
														</ScrollTo>
													</li>
													<li>
														<ScrollTo smooth={true} activeClass="active" spy={true} className="nav-link" to={"instructor"}>
															<i className="ti-user"></i> Instructor
														</ScrollTo>
													</li>
													<li>
														<ScrollTo smooth={true} activeClass="active" spy={true} className="nav-link" to={"reviews"}>
															<i className="ti-comments"></i> Reviews
														</ScrollTo>
													</li>
												</ul>
											</div>
										</div>
									</div>
								
									<div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
										<div className="courses-post">
											<div className="ttr-post-media media-effect">
												<Link to="#"><img src={blogDefaultThum1} alt=""/></Link>
											</div>
											<div className="ttr-post-info m-b30">
												<div className="ttr-post-title ">
													<h2 className="post-title">Nvidia and UE4 Technologies Practice</h2>
												</div>
												<div className="ttr-post-text">
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
												</div>
											</div>
										</div>
										<div className="courese-overview" id="overview">
											<h4>Overview</h4>
											<div className="row">
												<div className="col-md-12 col-lg-4">
													<ul className="course-features">
														<li><i className="ti-book"></i> <span className="label">Lectures</span> <span className="value">8</span></li>
														<li><i className="ti-help-alt"></i> <span className="label">Quizzes</span> <span className="value">1</span></li>
														<li><i className="ti-time"></i> <span className="label">Duration</span> <span className="value">60 hours</span></li>
														<li><i className="ti-stats-up"></i> <span className="label">Skill level</span> <span className="value">Beginner</span></li>
														<li><i className="ti-smallcap"></i> <span className="label">Language</span> <span className="value">English</span></li>
														<li><i className="ti-user"></i> <span className="label">Students</span> <span className="value">32</span></li>
														<li><i className="ti-check-box"></i> <span className="label">Assessments</span> <span className="value">Yes</span></li>
													</ul>
												</div>
												<div className="col-md-12 col-lg-8">
													<h5 className="m-b10">Course Description</h5>
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<h5 className="m-b10">Certification</h5>
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<h5 className="m-b10">Learning Outcomes</h5>
													<ul className="list-checked primary">
														<li>Over 37 lectures and 55.5 hours of content!</li>
														<li>LIVE PROJECT End to End Software Testing Training Included.</li>
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
										<div className="m-b30" id="curriculum">
											<h4>Curriculum</h4>
											<ul className="curriculum-list">
												<li>
													<h5>First Level</h5>
													<ul>
														<li>
															<div className="curriculum-list-box">
																<span>Lesson 1.</span> Introduction to UI Design
															</div>
															<span>120 minutes</span>
														</li>
														<li>
															<div className="curriculum-list-box">
																<span>Lesson 2.</span> User Research and Design
															</div>
															<span>60 minutes</span>
														</li>
														<li>
															<div className="curriculum-list-box">
																<span>Lesson 3.</span> Evaluating User Interfaces Part 1
															</div>
															<span>85 minutes</span>
														</li>
													</ul>
												</li>
												<li>
													<h5>Second Level</h5>
													<ul>
														<li>
															<div className="curriculum-list-box">
																<span>Lesson 1.</span> Prototyping and Design
															</div>
															<span>110 minutes</span>
														</li>
														<li>
															<div className="curriculum-list-box">
																<span>Lesson 2.</span> UI Design Capstone
															</div>
															<span>120 minutes</span>
														</li>
														<li>
															<div className="curriculum-list-box">
																<span>Lesson 3.</span> Evaluating User Interfaces Part 2
															</div>
															<span>120 minutes</span>
														</li>
													</ul>
												</li>
												<li>
													<h5>Final</h5>
													<ul>
														<li>
															<div className="curriculum-list-box">
																<span>Part 1.</span> Final Test
															</div>
															<span>120 minutes</span>
														</li>
														<li>
															<div className="curriculum-list-box">
																<span>Part 2.</span> Online Test
															</div>
															<span>120 minutes</span>
														</li>
													</ul>
												</li>
											</ul>
										</div>
										<div className="" id="instructor">
											<h4>Instructor</h4>
											<div className="instructor-bx">
												<div className="instructor-author">
													<img src={testiPic1} alt=""/>
												</div>
												<div className="instructor-info">
													<h6>Keny White </h6>
													<span>Professor</span>
													<ul className="list-inline m-tb10">
														<li><Link to="#" className="btn sharp-sm facebook"><i className="fa fa-facebook"></i></Link></li>
														<li><Link to="#" className="btn sharp-sm twitter"><i className="fa fa-twitter"></i></Link></li>
														<li><Link to="#" className="btn sharp-sm linkedin"><i className="fa fa-linkedin"></i></Link></li>
														<li><Link to="#" className="btn sharp-sm google-plus"><i className="fa fa-google-plus"></i></Link></li>
													</ul>
													<p className="m-b0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
												</div>
											</div>
											<div className="instructor-bx">
												<div className="instructor-author">
													<img src={testiPic2} alt=""/>
												</div>
												<div className="instructor-info">
													<h6>Keny White </h6>
													<span>Professor</span>
													<ul className="list-inline m-tb10">
														<li><Link to="#" className="btn sharp-sm facebook"><i className="fa fa-facebook"></i></Link></li>
														<li><Link to="#" className="btn sharp-sm twitter"><i className="fa fa-twitter"></i></Link></li>
														<li><Link to="#" className="btn sharp-sm linkedin"><i className="fa fa-linkedin"></i></Link></li>
														<li><Link to="#" className="btn sharp-sm google-plus"><i className="fa fa-google-plus"></i></Link></li>
													</ul>
													<p className="m-b0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
												</div>
											</div>
										</div>
										<div className="" id="reviews">
											<h4>Reviews</h4>
											
											<div className="review-bx">
												<div className="all-review">
													<h2 className="rating-type">3</h2>
													<ul className="cours-star">
														<li className="active"><i className="fa fa-star"></i></li>
														<li className="active"><i className="fa fa-star"></i></li>
														<li className="active"><i className="fa fa-star"></i></li>
														<li><i className="fa fa-star"></i></li>
														<li><i className="fa fa-star"></i></li>
													</ul>
													<span>3 Rating</span>
												</div>
												<div className="review-bar">
													<div className="bar-bx">
														<div className="side">
															<div>5 star</div>
														</div>
														<div className="middle">
															<div className="bar-container">
																<div className="bar-5" style={{width:"90%"}}></div>
															</div>
														</div>
														<div className="side right">
															<div>150</div>
														</div>
													</div>
													<div className="bar-bx">
														<div className="side">
															<div>4 star</div>
														</div>
														<div className="middle">
															<div className="bar-container">
																<div className="bar-5" style={{width:"70%"}}></div>
															</div>
														</div>
														<div className="side right">
															<div>140</div>
														</div>
													</div>
													<div className="bar-bx">
														<div className="side">
															<div>3 star</div>
														</div>
														<div className="middle">
															<div className="bar-container">
																<div className="bar-5" style={{width:"50%"}}></div>
															</div>
														</div>
														<div className="side right">
															<div>120</div>
														</div>
													</div>
													<div className="bar-bx">
														<div className="side">
															<div>2 star</div>
														</div>
														<div className="middle">
															<div className="bar-container">
																<div className="bar-5" style={{width:"40%"}}></div>
															</div>
														</div>
														<div className="side right">
															<div>110</div>
														</div>
													</div>
													<div className="bar-bx">
														<div className="side">
															<div>1 star</div>
														</div>
														<div className="middle">
															<div className="bar-container">
																<div className="bar-5" style={{width:"20%"}}></div>
															</div>
														</div>
														<div className="side right">
															<div>80</div>
														</div>
													</div>
												</div>
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

export default CoursesDetails;
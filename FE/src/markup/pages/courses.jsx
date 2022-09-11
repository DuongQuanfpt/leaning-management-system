import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Images
import bannerImg from '../../images/banner/banner3.jpg';
import adv from '../../images/adv/adv.jpg';
import blogRecentPic1 from '../../images/blog/recent-blog/pic1.jpg';
import blogRecentPic3 from '../../images/blog/recent-blog/pic3.jpg';
import coursesPic1 from '../../images/courses/pic1.jpg';
import coursesPic2 from '../../images/courses/pic2.jpg';
import coursesPic3 from '../../images/courses/pic3.jpg';
import coursesPic4 from '../../images/courses/pic4.jpg';
import coursesPic5 from '../../images/courses/pic5.jpg';
import coursesPic6 from '../../images/courses/pic6.jpg';
import coursesPic7 from '../../images/courses/pic7.jpg';
import coursesPic8 from '../../images/courses/pic8.jpg';
import coursesPic9 from '../../images/courses/pic9.jpg';

const content =[
	{ 
		Thumb: coursesPic1,
		Title: "Introduction EduChamp – LMS plugin",
		Tag: "Programming",
		Review: 3,
		PriceDel: 120,
		Price: 190,
	},
	{ 
		Thumb: coursesPic2,
		Title: "Learn PHP Programming From Scratch",
		Tag: "Developing",
		Review: 4,
		PriceDel: 180,
		Price: 150,
	},
	{ 
		Thumb: coursesPic3,
		Title: "Master Microservices with Spring",
		Tag: "Coding",
		Review: 2,
		PriceDel: 520,
		Price: 234,
	},
	{ 
		Thumb: coursesPic4,
		Title: "Build A Full Web Chat App From Scratch",
		Tag: "Marketing",
		Review: 3,
		PriceDel: 320,
		Price: 260,
	},
	{ 
		Thumb: coursesPic4,
		Title: "Strategy Law And Organization",
		Tag: "Lerning",
		Review: 4,
		PriceDel: 120,
		Price: 260,
	},
	{ 
		Thumb: coursesPic5,
		Title: "Fundamentals Of Music Theory Learn New",
		Tag: "Programming",
		Review: 1,
		PriceDel: 140,
		Price: 240,
	},
	{ 
		Thumb: coursesPic7,
		Title: "Introduction EduChamp – LMS plugin",
		Tag: "Programming",
		Review: 3,
		PriceDel: 120,
		Price: 190,
	},
	{ 
		Thumb: coursesPic8,
		Title: "Learn PHP Programming From Scratch",
		Tag: "Developing",
		Review: 4,
		PriceDel: 180,
		Price: 150,
	},
	{ 
		Thumb: coursesPic9,
		Title: "Master Microservices with Spring",
		Tag: "Coding",
		Review: 2,
		PriceDel: 520,
		Price: 234,
	},
	{ 
		Thumb: coursesPic4,
		Title: "Build A Full Web Chat App From Scratch",
		Tag: "Marketing",
		Review: 3,
		PriceDel: 320,
		Price: 260,
	},
	{ 
		Thumb: coursesPic6,
		Title: "Strategy Law And Organization ",
		Tag: "Lerning",
		Review: 4,
		PriceDel: 120,
		Price: 260,
	},
	{ 
		Thumb: coursesPic2,
		Title: "Fundamentals Of Music Theory Learn New",
		Tag: "Programming",
		Review: 1,
		PriceDel: 140,
		Price: 240,
	},
]

class Courses extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">Our Courses</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>Our Courses</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="section-area section-sp1">
							<div className="container">
								 <div className="row">
									<div className="col-lg-3 col-md-4 col-sm-12">
										<div className="widget widget_archive">
											<h5 className="widget-title style-1">All Courses</h5>
											<ul>
												<li className="active"><Link to="#">General</Link></li>
												<li><Link to="/courses-details">IT & Software</Link></li>
												<li><Link to="/courses-details">Photography</Link></li>
												<li><Link to="/courses-details">Programming Language</Link></li>
												<li><Link to="/courses-details">Technology</Link></li>
											</ul>
										</div>
										<div className="widget recent-posts-entry widget-courses">
											<h5 className="widget-title style-1">Recent Courses</h5>
											<div className="widget-post-bx">
												<div className="widget-post clearfix">
													<div className="ttr-post-media"> <img src={blogRecentPic1} width="200" height="143" alt=""/> </div>
													<div className="ttr-post-info">
														<div className="ttr-post-header">
															<h6 className="post-title"><Link to="/courses-details">Introduction EduChamp</Link></h6>
														</div>
														<div className="ttr-post-meta">
															<ul>
																<li className="price">
																	<del>$190</del>
																	<h5>$120</h5>
																</li>
																<li className="review">03 Review</li>
															</ul>
														</div>
													</div>
												</div>
												<div className="widget-post clearfix">
													<div className="ttr-post-media"> <img src={blogRecentPic3} width="200" height="160" alt=""/> </div>
													<div className="ttr-post-info">
														<div className="ttr-post-header">
															<h6 className="post-title"><Link to="/courses-details">English For Tommorow</Link></h6>
														</div>
														<div className="ttr-post-meta">
															<ul>
																<li className="price">
																	<h5 className="free">Free</h5>
																</li>
																<li className="review">07 Review</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="widget">
											<Link to="/membership"><img src={adv} alt=""/></Link>
										</div>
									</div>
									<div className="col-lg-9 col-md-8 col-sm-12">
										<div className="row">
											{content.map((item) => (
												<div className="col-md-6 col-lg-4 col-sm-6 m-b30">
													<div className="cours-bx">
														<div className="action-box">
															<img src={item.Thumb} alt=""/>
															<Link to="/courses-details" className="btn">Read More</Link>
														</div>
														<div className="info-bx">
															<span>{item.Tag}</span>
															<h6><Link to="/courses-details">{item.Title}</Link></h6>
														</div>
														<div className="cours-more-info">
															<div className="review">
																<span>{item.Review} Review</span>
																<ul className="cours-star">
																	<li className="active"><i className="fa fa-star"></i></li>
																	<li className="active"><i className="fa fa-star"></i></li>
																	<li className="active"><i className="fa fa-star"></i></li>
																	<li><i className="fa fa-star"></i></li>
																	<li><i className="fa fa-star"></i></li>
																</ul>
															</div>
															<div className="price">
																<del>${item.PriceDel}</del>
																<h5>${item.Price}</h5>
															</div>
														</div>
													</div>
												</div>
											))}
											<div className="col-lg-12 m-b20">
												<div className="pagination-bx rounded-sm gray clearfix">
													<ul className="pagination">
														<li className="previous"><Link to="#"><i className="ti-arrow-left"></i> Prev</Link></li>
														<li className="active"><Link to="#">1</Link></li>
														<li><Link to="#">2</Link></li>
														<li><Link to="#">3</Link></li>
														<li className="next"><Link to="#">Next <i className="ti-arrow-right"></i></Link></li>
													</ul>
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

export default Courses;
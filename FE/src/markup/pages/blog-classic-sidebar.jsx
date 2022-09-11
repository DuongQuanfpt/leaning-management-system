import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import BlogAside from "../elements/blog-aside";

// Images
import bannerImg from '../../images/banner/banner1.jpg';
import blogPic1 from '../../images/blog/latest-blog/pic1.jpg';
import blogPic2 from '../../images/blog/latest-blog/pic2.jpg';
import blogPic3 from '../../images/blog/latest-blog/pic3.jpg';

const content = [
	{
		BlogThumb: blogPic1,
		BlogTitle: "This Story Behind Education Will Haunt You Forever.",
		BlogText: "Knowing that, you’ve optimised your pages countless amount of times.",
		BlogUser: "William",
		BlogDate: "Jan 02 2019",
		BlogComment: "20 Comment",
	},
	{
		BlogThumb: blogPic2,
		BlogTitle: "What Will Education Be Like In The Next 50 Years?",
		BlogText: "Knowing that, you’ve optimised your pages countless amount of times.",
		BlogUser: "John",
		BlogDate: "Feb 05 2019",
		BlogComment: "14 Comment",
	},
	{
		BlogThumb: blogPic3,
		BlogTitle: "Master The Skills Of Education And Be.",
		BlogText: "Knowing that, you’ve optimised your pages countless amount of times.",
		BlogUser: "George",
		BlogDate: "April 14 2019",
		BlogComment: "23 Comment",
	},
	{
		BlogThumb: blogPic3,
		BlogTitle: "Eliminate Your Fears And Doubts About Education.",
		BlogText: "Knowing that, you’ve optimised your pages countless amount of times.",
		BlogUser: "Thomas",
		BlogDate: "March 21 2019",
		BlogComment: "28 Comment",
	},
	{
		BlogThumb: blogPic1,
		BlogTitle: "Seven Reasons You Should Fall In Love With Education.",
		BlogText: "Knowing that, you’ve optimised your pages countless amount of times.",
		BlogUser: "James",
		BlogDate: "May 08 2019",
		BlogComment: "26 Comment",
	},
	{
		BlogThumb: blogPic2,
		BlogTitle: "The Biggest Contribution Of Education To Humanity.",
		BlogText: "Knowing that, you’ve optimised your pages countless amount of times.",
		BlogUser: "Arthur",
		BlogDate: "June 19 2019",
		BlogComment: "15 Comment",
	}
]

class BlogClassicSidebar extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">Blog Classic Sidebar</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>Blog Classic Sidebar</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="section-area section-sp2">
							<div className="container">
								<div className="row">
									<div className="col-lg-8 col-xl-8 col-md-7">
										<div id="masonry" className="ttr-blog-grid-3 row">
											{content.map((item) => (
												<div className="post action-card col-xl-6 col-lg-6 col-md-12 col-xs-12 m-b40">
													<div className="recent-news">
														<div className="action-box">
															<img src={item.BlogThumb} alt=""/>
														</div>
														<div className="info-bx">
															<ul className="media-post">
																<li><Link to="/blog-details"><i className="fa fa-calendar"></i>{item.BlogDate}</Link></li>
																<li><Link to="/blog-details"><i className="fa fa-user"></i>By{item.BlogUser}</Link></li>
															</ul>
															<h5 className="post-title"><Link to="/blog-details">{item.BlogTitle}</Link></h5>
															<p>{item.BlogText}</p>
															<div className="post-extra">
																<Link to="/blog-details" className="btn-link">Read More</Link>
																<Link to="/blog-details" className="comments-bx"><i className="fa fa-comments-o"></i> {item.BlogComment}</Link>
															</div>
														</div>
													</div>
												</div>
											))}
										</div>
										<div className="pagination-bx rounded-sm gray m-b30 clearfix">
											<ul className="pagination">
												<li className="previous"><Link to="#"><i className="ti-arrow-left"></i> Prev</Link></li>
												<li className="active"><Link to="#">1</Link></li>
												<li><Link to="#">2</Link></li>
												<li><Link to="#">3</Link></li>
												<li className="next"><Link to="#">Next <i className="ti-arrow-right"></i></Link></li>
											</ul>
										</div>
									</div>
									<div className="col-lg-4 col-xl-4 col-md-5 sticky-top">
										<BlogAside />
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

export default BlogClassicSidebar;
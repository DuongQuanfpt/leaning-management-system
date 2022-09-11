import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import BlogAside from "../elements/blog-aside";

// Images
import bannerImg from '../../images/banner/banner1.jpg';
import blogPic1 from '../../images/blog/default/thum1.jpg';
import blogPic2 from '../../images/blog/default/thum2.jpg';
import blogPic3 from '../../images/blog/default/thum3.jpg';
import blogPic4 from '../../images/blog/default/thum4.jpg';

const content = [
	{
		BlogThumb: blogPic1,
		BlogTitle: "This Story Behind Education Will Haunt.",
		BlogText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		BlogUser: "William",
		BlogDate: "Jan 12 2019",
		BlogComment: "05 Comment",
	},
	{
		BlogThumb: blogPic2,
		BlogTitle: "What Will Education Next 50 Years?",
		BlogText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		BlogUser: "John",
		BlogDate: "Feb 05 2019",
		BlogComment: "14 Comment",
	},
	{
		BlogThumb: blogPic3,
		BlogTitle: "Master The Skills Of Education And Be.",
		BlogText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		BlogUser: "George",
		BlogDate: "April 14 2019",
		BlogComment: "23 Comment",
	},
	{
		BlogThumb: blogPic4,
		BlogTitle: "Eliminate Your Fears And Doubts.",
		BlogText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		BlogUser: "Thomas",
		BlogDate: "March 21 2019",
		BlogComment: "28 Comment",
	},
	{
		BlogThumb: blogPic1,
		BlogTitle: "Seven Reasons You Should Fall Education.",
		BlogText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		BlogUser: "James",
		BlogDate: "May 08 2019",
		BlogComment: "26 Comment",
	},
]

class BlogStandardSidebar extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">Blog Standard Sidebar</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>Blog Standard Sidebar</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="section-area section-sp2">
							<div className="container">
								<div className="row">
									<div className="col-md-7 col-lg-8 col-xl-8">
										{content.map((item) => (
											<div className="recent-news m-b40">
												<div className="action-box">
													<Link to="/blog-details"><img src={item.BlogThumb} alt=""/></Link>
												</div>
												<div className="info-bx">
													<ul className="media-post">
														<li><Link to="/blog-details"><i className="fa fa-calendar"></i>{item.BlogDate}</Link></li>
														<li><Link to="/blog-details"><i className="fa fa-user"></i>By{item.BlogUser}</Link></li>
													</ul>
													<h3 className="post-title"><Link to="/blog-details">{item.BlogTitle}</Link></h3>
													<p>{item.BlogText}</p>
													<div className="post-extra">
														<Link to="/blog-details" className="btn-link">Read More</Link>
														<Link to="/blog-details" className="comments-bx"><i className="fa fa-comments-o"></i> {item.BlogComment}</Link>
													</div>
												</div>
											</div>
										))}

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
									<div className="col-md-5 col-lg-4 col-xl-4 sticky-top">
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

export default BlogStandardSidebar;
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import BlogAside from "../elements/blog-aside";

// Images
import bannerImg from '../../images/banner/banner1.jpg';
import blogPic1 from '../../images/blog/grid/pic1.jpg';
import blogPic2 from '../../images/blog/grid/pic2.jpg';
import blogPic3 from '../../images/blog/grid/pic3.jpg';

const content = [
	{
		BlogThumb: blogPic1,
		BlogTitle: "This Story Behind Education Will Haunt You Forever.",
		BlogText: "Knowing that, you’ve optimised your pages countless amount of times, written tons.",
		BlogUser: "William",
		BlogDate: "Jan 12 2019",
		BlogComment: "05 Comment",
	},
	{
		BlogThumb: blogPic2,
		BlogTitle: "What Will Education Be Like In The Next 50 Years?",
		BlogText: "As desperate as you are right now, you have done everything you can on your.",
		BlogUser: "John",
		BlogDate: "Feb 05 2019",
		BlogComment: "14 Comment",
	},
	{
		BlogThumb: blogPic3,
		BlogTitle: "Master The Skills Of Education And Be.",
		BlogText: "You will see in the guide all my years of valuable experience together with.",
		BlogUser: "George",
		BlogDate: "April 14 2019",
		BlogComment: "23 Comment",
	},
	{
		BlogThumb: blogPic1,
		BlogTitle: "Eliminate Your Fears And Doubts About Education.",
		BlogText: "When I needed to start from scratch and figure out how things work. Getting people.",
		BlogUser: "Thomas",
		BlogDate: "March 21 2019",
		BlogComment: "28 Comment",
	},
	{
		BlogThumb: blogPic2,
		BlogTitle: "Seven Reasons You Should Fall In Love With Education.",
		BlogText: "Honestly, I made ZERO money in the first year and I definitely do not want you to go.",
		BlogUser: "James",
		BlogDate: "May 08 2019",
		BlogComment: "26 Comment",
	},
	{
		BlogThumb: blogPic3,
		BlogTitle: "The Biggest Contribution Of Education To Humanity.",
		BlogText: "You may have seen our tool that's been featured by many world-class SEO marketers.",
		BlogUser: "Arthur",
		BlogDate: "June 19 2019",
		BlogComment: "15 Comment",
	},
	{
		BlogThumb: blogPic1,
		BlogTitle: "This Story Behind Education Will Haunt You Forever.",
		BlogText: "Knowing that, you’ve optimised your pages countless amount of times, written tons.",
		BlogUser: "William",
		BlogDate: "Jan 12 2019",
		BlogComment: "05 Comment",
	},
	{
		BlogThumb: blogPic2,
		BlogTitle: "What Will Education Be Like In The Next 50 Years?",
		BlogText: "As desperate as you are right now, you have done everything you can on your.",
		BlogUser: "John",
		BlogDate: "Feb 05 2019",
		BlogComment: "14 Comment",
	},
	{
		BlogThumb: blogPic3,
		BlogTitle: "Master The Skills Of Education And Be.",
		BlogText: "You will see in the guide all my years of valuable experience together with.",
		BlogUser: "George",
		BlogDate: "April 14 2019",
		BlogComment: "23 Comment",
	},
]

class BlogListSidebar extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">Blog List sidebar</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>Blog List sidebar</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="section-area section-sp2">
							<div className="container">
								<div className="row">
									<div className="col-lg-8">
										{content.map((item) => (
											<div className="blog-post blog-md clearfix">
												<div className="ttr-post-media">
													<Link to="/blog-details"><img src={item.BlogThumb} alt=""/></Link>
												</div>
												<div className="ttr-post-info">
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
									
									<div className="col-lg-4 sticky-top">
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

export default BlogListSidebar;
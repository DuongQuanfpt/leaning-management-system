import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import BlogAside from "../elements/blog-aside";

// Images
import bannerImg from '../../images/banner/banner2.jpg';
import blogPic1 from '../../images/blog/default/thum1.jpg';
import testiPic1 from '../../images/testimonials/pic1.jpg';
import testiPic2 from '../../images/testimonials/pic2.jpg';
import testiPic3 from '../../images/testimonials/pic3.jpg';

class BlogDetails extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">Blog Details</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>Blog Details</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="section-area section-sp2">
							<div className="container">
								<div className="row">
									<div className="col-lg-8 col-xl-8">
										<div className="recent-news blog-lg">
											<div className="action-box blog-lg">
												<img src={blogPic1} alt=""/>
											</div>
											<div className="info-bx">
												<ul className="media-post">
													<li><Link to="#"><i className="fa fa-calendar"></i>May 14 2019</Link></li>
													<li><Link to="#"><i className="fa fa-comments-o"></i>10 Comment</Link></li>
												</ul>
												<h3 className="post-title">Seven Reasons You Should Fall In Love With Education.</h3>
												<p>It is used every day in all types of businesses; Email newsletters, websites, print and online advertisements, presentations, social media updates, flyers, and brochures; the list goes on and on</p>
												<p>David Ogilvy, the advertising legend once said that, On average, five times as many people read the headline as read the body copy. When you have written your headline, you have spent eighty cents out of your dollar." As Ogilvy points out, your headline is the first (and sometimes the only) thing that your audience will read.</p>
												<p>You just need to enter the keyword and select the keyword type to generate a list of 6 title ideas and suggestions. If you’re not satisfied with the results, you can always hit the refresh button to generate a new list of unique titles.</p>
												<p>Once you’ve gotten all the titles and have chosen the best one, the next thing you need to do is to craft a magnetic content. Great content marketers excel at creating content that their readers crave, but even the best struggle with delivering content to the right person at the right time.</p>
												<div className="ttr-divider bg-gray"><i className="icon-dot c-square"></i></div>
												<div className="widget_tag_cloud">
													<h6>TAGS</h6>
													<div className="tagcloud"> 
														<Link to="#">Design</Link> 
														<Link to="#">User interface</Link> 
														<Link to="#">SEO</Link> 
														<Link to="#">WordPress</Link> 
														<Link to="#">Development</Link> 
														<Link to="#">Joomla</Link> 
														<Link to="#">Design</Link> 
														<Link to="#">User interface</Link> 
														<Link to="#">SEO</Link> 
														<Link to="#">WordPress</Link> 
														<Link to="#">Development</Link> 
														<Link to="#">Joomla</Link> 
														<Link to="#">Design</Link> 
														<Link to="#">User interface</Link> 
														<Link to="#">SEO</Link> 
														<Link to="#">WordPress</Link> 
														<Link to="#">Development</Link> 
														<Link to="#">Joomla</Link> 
													</div>
												</div>
												<div className="ttr-divider bg-gray"><i className="icon-dot c-square"></i></div>
													<h6>SHARE </h6>
													<ul className="list-inline contact-social-bx">
														<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-facebook"></i></Link></li>
														<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-twitter"></i></Link></li>
														<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-linkedin"></i></Link></li>
														<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-google-plus"></i></Link></li>
													</ul>
												<div className="ttr-divider bg-gray"><i className="icon-dot c-square"></i></div>
											</div>
										</div>
										<div className="clear" id="comment-list">
											<div className="comments-area" id="comments">
												<h4 className="comments-title">8 Comments</h4>
												<div className="clearfix m-b20">
													<ol className="comment-list">
														<li className="comment">
															<div className="comment-body">
																<div className="comment-author vcard"> 
																	<img className="avatar photo" src={testiPic1} alt=""/> 
																	<cite className="fn">John Doe</cite> 
																	<span className="says">says:</span> 
																</div>
																<div className="comment-meta"> 
																	<Link to="#">December 02, 2019 at 10:45 am</Link> 
																</div>
																<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neqnsectetur adipiscing elit. Nam viae neqnsectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. </p>
																<div className="reply"> 
																	<Link to="#" className="comment-reply-link">Reply</Link> 
																</div>
															</div>
															<ol className="children">
																<li className="comment odd parent">
																	<div className="comment-body">
																		<div className="comment-author vcard"> 
																			<img className="avatar photo" src={testiPic2} alt=""/> 
																			<cite className="fn">John Doe</cite> 
																			<span className="says">says:</span> 
																		</div>
																		<div className="comment-meta"> 
																			<Link to="#">December 02, 2019 at 10:45 am</Link> 
																		</div>
																		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.</p>
																		<div className="reply"> 
																			<Link to="#" className="comment-reply-link">Reply</Link> 
																		</div>
																	</div>
																	<ol className="children">
																		<li className="comment odd parent">
																			<div className="comment-body">
																				<div className="comment-author vcard"> 
																					<img className="avatar photo" src={testiPic3} alt=""/> 
																					<cite className="fn">John Doe</cite> 
																					<span className="says">says:</span> 
																				</div>
																				<div className="comment-meta"> 
																					<Link to="#">December 02, 2019 at 10:45 am</Link> 
																				</div>
																				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.</p>
																				<div className="reply"> 
																					<Link to="#" className="comment-reply-link">Reply</Link> 
																				</div>
																			</div>
																		</li>
																	</ol>
																</li>
															</ol>
														</li>
														<li className="comment">
															<div className="comment-body">
																<div className="comment-author vcard"> 
																	<img className="avatar photo" src={testiPic1} alt=""/> 
																	<cite className="fn">John Doe</cite> 
																	<span className="says">says:</span> 
																</div>
																<div className="comment-meta"> 
																	<Link to="#">December 02, 2019 at 10:45 am</Link> 
																</div>
																<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.</p>
																<div className="reply"> 
																	<Link to="#" className="comment-reply-link">Reply</Link> 
																</div>
															</div>
														</li>
														<li className="comment">
															<div className="comment-body">
																<div className="comment-author vcard"> 
																	<img className="avatar photo" src={testiPic2} alt=""/> 
																	<cite className="fn">John Doe</cite> 
																	<span className="says">says:</span> 
																</div>
																<div className="comment-meta"> 
																	<Link to="#">December 02, 2019 at 10:45 am</Link> 
																</div>
																<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.</p>
																<div className="reply"> 
																	<Link to="#" className="comment-reply-link">Reply</Link> 
																</div>
															</div>
														</li>
														<li className="comment">
															<div className="comment-body">
																<div className="comment-author vcard"> 
																	<img className="avatar photo" src={testiPic3} alt=""/> 
																	<cite className="fn">John Doe</cite> 
																	<span className="says">says:</span> 
																</div>
																<div className="comment-meta"> 
																	<Link to="#">December 02, 2019 at 10:45 am</Link> 
																</div>
																<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis ac elementum ligula blandit ac.</p>
																<div className="reply"> 
																	<Link to="#" className="comment-reply-link">Reply</Link> 
																</div>
															</div>
														</li>
													</ol>
													<div className="comment-respond" id="respond">
														<h4 className="comment-reply-title" id="reply-title">Leave a Reply <small> <Link style={{display: "none"}} to="#" id="cancel-comment-reply-link" rel="nofollow">Cancel reply</Link> </small> </h4>
														<form className="comment-form">
															<p className="comment-form-author">
																<label htmlFor="author">Name <span className="required">*</span></label>
																<input type="text" value="" name="Author"  placeholder="Author" id="author"/>
															</p>
															<p className="comment-form-email">
																<label htmlFor="email">Email <span className="required">*</span></label>
																<input type="text" value="" placeholder="Email" name="email" id="email"/>
															</p>
															<p className="comment-form-url">
																<label for="url">Website</label>
																<input type="text"  value=""  placeholder="Website"  name="url" id="url"/>
															</p>
															<p className="comment-form-comment">
																<label htmlFor="comment">Comment</label>
																<textarea rows="8" name="comment" placeholder="Comment" id="comment"></textarea>
															</p>
															<p className="form-submit">
																<input type="submit" value="Submit Comment" className="submit" name="submit"/>
															</p>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-xl-4">
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

export default BlogDetails;
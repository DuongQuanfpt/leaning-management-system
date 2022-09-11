import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleReactLightbox, {SRLWrapper} from 'simple-react-lightbox';

// Images
import galleryPic1 from '../../images/gallery/pic1.jpg';
import galleryPic2 from '../../images/gallery/pic2.jpg';
import galleryPic3 from '../../images/gallery/pic3.jpg';
import galleryPic4 from '../../images/gallery/pic4.jpg';
import galleryPic5 from '../../images/gallery/pic5.jpg';
import galleryPic7 from '../../images/gallery/pic7.jpg';
import galleryPic8 from '../../images/gallery/pic8.jpg';
import galleryPic9 from '../../images/gallery/pic9.jpg';
import blogPic1 from '../../images/blog/recent-blog/pic1.jpg';
import blogPic2 from '../../images/blog/recent-blog/pic2.jpg';
import blogPic3 from '../../images/blog/recent-blog/pic3.jpg';

const content = [
	{
		thumb: galleryPic2,
	},
	{
		thumb: galleryPic1,
	},
	{
		thumb: galleryPic5,
	},
	{
		thumb: galleryPic7,
	},
	{
		thumb: galleryPic8,
	},
	{
		thumb: galleryPic9,
	},
	{
		thumb: galleryPic3,
	},
	{
		thumb: galleryPic4,
	},
]

const options = {
	settings: {
		overlayColor: "rgba(0,0,0,0.9)",
		backgroundColor: "#FDC716",
		slideAnimationType: 'slide',
	},
	buttons: {
		backgroundColor: "#f7b205",
		iconColor: "rgba(255, 255, 255, 1)",
		showDownloadButton: false,
		showAutoplayButton: false,
		showThumbnailsButton: false,
	},
	caption: {
		captionColor: "#232eff",
		captionFontFamily: "Raleway, sans-serif",
		captionFontWeight: "300",
		captionTextTransform: "uppercase",
	}
};

function GalleryImg(){
	return(
		<>
			<SimpleReactLightbox>
				<SRLWrapper options={options}>
					<ul className="magnific-image">
						{content.map((item) => (
							<li><img src={item.thumb} alt=""/></li>
						))}
					</ul>
				</SRLWrapper>
			</SimpleReactLightbox>	
		</>
	);
}

class BlogAside extends Component{
	render(){
		return(
			<>
				<aside className="side-bar sticky-top">
					<div className="widget">
						<h6 className="widget-title">Search</h6>
						<div className="search-bx style-1">
							<form role="search">
								<div className="input-group">
									<input name="text" className="form-control" placeholder="Enter your keywords..." type="text"/>
									<span className="input-group-btn">
										<button type="submit" className="btn"><i className="fa fa-search"></i></button>
									</span> 
								</div>
							</form>
						</div>
					</div>
					<div className="widget recent-posts-entry">
						<h6 className="widget-title">Recent Posts</h6>
						<div className="widget-post-bx">
							<div className="widget-post clearfix">
								<div className="ttr-post-media"> <img src={blogPic1} width="200" height="143" alt=""/> </div>
								<div className="ttr-post-info">
									<div className="ttr-post-header">
										<h6 className="post-title"><Link to="/blog-details">This Story Behind Education Will Haunt You Forever.</Link></h6>
									</div>
									<ul className="media-post">
										<li><Link to="/blog-details"><i className="fa fa-calendar"></i>Oct 23 2021</Link></li>
									</ul>
								</div>
							</div>
							<div className="widget-post clearfix">
								<div className="ttr-post-media"> <img src={blogPic2} width="200" height="160" alt=""/> </div>
								<div className="ttr-post-info">
									<div className="ttr-post-header">
										<h6 className="post-title"><Link to="/blog-details">What Will Education Be Like In The Next 50 Years?</Link></h6>
									</div>
									<ul className="media-post">
										<li><Link to="/blog-details"><i className="fa fa-calendar"></i>May 14 2021</Link></li>
									</ul>
								</div>
							</div>
							<div className="widget-post clearfix">
								<div className="ttr-post-media"> <img src={blogPic3} width="200" height="160" alt=""/> </div>
								<div className="ttr-post-info">
									<div className="ttr-post-header">
										<h6 className="post-title"><Link to="/blog-details">Eliminate Your Fears And Doubts About Education.</Link></h6>
									</div>
									<ul className="media-post">
										<li><Link to="/blog-details"><i className="fa fa-calendar"></i>June 12 2021</Link></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="widget widget-newslatter">
						<h6 className="widget-title">Newsletter</h6>
						<div className="news-box">
							<p>Enter your e-mail and subscribe to our newsletter.</p>
							<form className="subscription-form" method="post">
								<div className="ajax-message"></div>
								<div className="input-group">
									<input name="email" required="required" type="email" className="form-control" placeholder="Your Email Address"/>
									<button name="submit" value="Submit" type="submit" className="btn radius-no">
										<i className="fa fa-paper-plane-o"></i>
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className="widget widget_gallery gallery-grid-4">
						<h6 className="widget-title">Our Gallery</h6>
						<GalleryImg />
					</div>
					<div className="widget widget_tag_cloud">
						<h6 className="widget-title">Tags</h6>
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
				</aside>
				
			</>
		);
	}
}

export default BlogAside;
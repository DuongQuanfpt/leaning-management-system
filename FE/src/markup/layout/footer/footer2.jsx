import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleReactLightbox, {SRLWrapper} from 'simple-react-lightbox';

// Images
import galleryPic1 from '../../../images/gallery/pic1.jpg';
import galleryPic2 from '../../../images/gallery/pic2.jpg';
import galleryPic3 from '../../../images/gallery/pic3.jpg';
import galleryPic4 from '../../../images/gallery/pic4.jpg';
import galleryPic5 from '../../../images/gallery/pic5.jpg';
import galleryPic6 from '../../../images/gallery/pic6.jpg';
import galleryPic7 from '../../../images/gallery/pic7.jpg';
import galleryPic8 from '../../../images/gallery/pic8.jpg';

const content = [
	{
		thumb: galleryPic1,
	},
	{
		thumb: galleryPic2,
	},
	{
		thumb: galleryPic3,
	},
	{
		thumb: galleryPic4,
	},
	{
		thumb: galleryPic5,
	},
	{
		thumb: galleryPic6,
	},
	{
		thumb: galleryPic7,
	},
	{
		thumb: galleryPic8,
	},
]

const options = {
	settings: {
		overlayColor: "rgba(0,0,0,0.9)",
		backgroundColor: "#3f3e85",
		slideAnimationType: 'slide',
	},
	buttons: {
		backgroundColor: "#3f3e85",
		iconColor: "rgba(255, 255, 255, 1)",
		showDownloadButton: false,
		showAutoplayButton: false,
		showThumbnailsButton: false,
	},
	caption: {
		captionColor: "#3f3e85",
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

class Footer2 extends Component{
	render(){
		return(
			<>
				<footer className="footer-white">
					<div className="footer-top bt0">
						<div className="container">
							<div className="subscribe-box">
								<div className="subscribe-title m-b20"><h4>Subscribe to recieve weekly news via email.</h4></div>
								<div className="subscribe-form m-b20">
									<form className="subscription-form">
										<div className="ajax-message"></div>
										<div className="input-group">
											<input name="email" required="required"  className="form-control" placeholder="Your Email Address" type="email"/>
											<span className="input-group-btn">
												<button name="submit" value="Submit" type="submit" className="btn radius-xl">Subscribe</button>
											</span> 
										</div>
									</form>
								</div>
							</div>
							<div className="row">
								<div className="col-4 col-lg-3 col-md-2 col-sm-6">
									<div className="widget footer_widget">
										<h6 className="footer-title">Company</h6>
										<ul>
											<li><Link href="/">Home</Link></li>
											<li><Link href="/about-1">About</Link></li>
											<li><Link href="/faq-1">FAQs</Link></li>
											<li><Link href="/contact-1">Contact</Link></li>
										</ul>
									</div>
								</div>
								<div className="col-4 col-lg-3 col-md-3 col-sm-6">
									<div className="widget footer_widget">
										<h6 className="footer-title">Get In Touch</h6>
										<ul>
											<li><Link to="/">Dashboard</Link></li>
											<li><Link to="/blog-classic-grid">Blog</Link></li>
											<li><Link to="/portfolio">Portfolio</Link></li>
											<li><Link to="/event">Event</Link></li>
										</ul>
									</div>
								</div>
								<div className="col-4 col-lg-3 col-md-2 col-sm-6">
									<div className="widget footer_widget">
										<h6 className="footer-title">Courses</h6>
										<ul>
											<li><Link to="/courses">Courses</Link></li>
											<li><Link to="/courses-details">Details</Link></li>
											<li><Link to="/membership">Membership</Link></li>
											<li><Link to="/profile">Profile</Link></li>
										</ul>
									</div>
								</div>
								<div className="col-12 col-lg-3 col-md-5 col-sm-6 footer-col-4">
									<div className="widget widget_gallery gallery-grid-4">
										<h6 className="footer-title">Our Gallery</h6>
										<GalleryImg />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-bottom">
						<div className="container">
							<div className="row">
								<div className="col-lg-12 col-md-12 col-sm-12 text-center"> © 2021 <span className="text-primary">EduChamp</span>  All Rights Reserved.</div>
							</div>
						</div>
					</div>
				</footer>
				
			</>
		);
	}
}

export default Footer2;

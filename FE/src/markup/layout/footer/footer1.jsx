import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleReactLightbox, {SRLWrapper} from 'simple-react-lightbox';

// Images
import logo from '../../../images/logo-white.png';
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

class Footer1 extends Component{
	render(){
		return(
			<>
				<footer>
					<div className="footer-top">
						<div className="pt-exebar">
							<div className="container">
								<div className="d-flex align-items-stretch">
									<div className="pt-logo mr-auto">
										<Link to="/"><img src={logo} alt=""/></Link>
									</div>
									<div className="pt-social-link">
										<ul className="list-inline m-a0">
											<li><Link to="#" className="btn-link"><i className="fa fa-facebook"></i></Link></li>
											<li><Link to="#" className="btn-link"><i className="fa fa-twitter"></i></Link></li>
											<li><Link to="#" className="btn-link"><i className="fa fa-linkedin"></i></Link></li>
											<li><Link to="#" className="btn-link"><i className="fa fa-google-plus"></i></Link></li>
										</ul>
									</div>
									<div className="pt-btn-join">
										<Link to="/contact-1" className="btn">Join Now</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<div className="col-lg-4 col-md-12 col-sm-12 footer-col-4">
									<div className="widget">
										<h6 className="footer-title">Sign Up For A Newsletter</h6>
										<p className="text-capitalize m-b20">Weekly Breaking news analysis and cutting edge advices on job searching.</p>
										<div className="subscribe-form m-b20">
											<form className="subscription-form">
												<div className="ajax-message"></div>
												<div className="input-group">
													<input name="email" required="required"  className="form-control" placeholder="Your Email Address" type="email"/>
													<span className="input-group-btn">
														<button name="submit" value="Submit" type="submit" className="btn"><i className="fa fa-arrow-right"></i></button>
													</span> 
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className="col-12 col-lg-5 col-md-7 col-sm-12">
									<div className="row">
										<div className="col-4 col-lg-4 col-md-4 col-sm-4">
											<div className="widget footer_widget">
												<h6 className="footer-title">Company</h6>
												<ul>
													<li><Link to="/">Home</Link></li>
													<li><Link to="/about-1">About</Link></li>
													<li><Link to="/faq-1">FAQs</Link></li>
													<li><Link to="/contact-1">Contact</Link></li>
												</ul>
											</div>
										</div>
										<div className="col-4 col-lg-4 col-md-4 col-sm-4">
											<div className="widget footer_widget">
												<h6 className="footer-title">Get In Touch</h6>
												<ul>
													<li><Link to="/">Dashboard</Link></li>
													<li><Link to="/blog-classic-grid">Blog</Link></li>
													<li><Link to="/">Portfolio</Link></li>
													<li><Link to="/event">Event</Link></li>
												</ul>
											</div>
										</div>
										<div className="col-4 col-lg-4 col-md-4 col-sm-4">
											<div className="widget footer_widget">
												<h6 className="footer-title">Courses</h6>
												<ul>
													<li><Link to="/courses">Courses</Link></li>
													<li><Link to="/courses-details">Details</Link></li>
													<li><Link to="/">Membership</Link></li>
													<li><Link to="/profile">Profile</Link></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="col-12 col-lg-3 col-md-5 col-sm-12 footer-col-4">
									<div className="widget widget_gallery gallery-grid-4">
										<h5 className="footer-title">Our Gallery</h5>
										<GalleryImg />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-bottom">
						<div className="container">
							<div className="row">
								<div className="col-lg-12 col-md-12 col-sm-12 text-center"> © 2021 <span className="text-white">EduChamp</span>  All Rights Reserved.</div>
							</div>
						</div>
					</div>
				</footer>
				
			</>
		);
	}
}

export default Footer1;

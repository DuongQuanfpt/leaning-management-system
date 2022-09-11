import React,{Component} from 'react'; 
import { Link } from 'react-router-dom';
import Slider from "react-slick";

// Images
import blogPic1 from '../../images/blog/latest-blog/pic1.jpg';
import blogPic2 from '../../images/blog/latest-blog/pic2.jpg';
import blogPic3 from '../../images/blog/latest-blog/pic3.jpg';

// Content
const content = [
	{ 
		thumb: blogPic1,
		title: "This Story Behind Education Will Haunt You Forever.",
		text: "Knowing that, you’ve optimised your pages countless amount of times.",
	},
	{ 
		thumb: blogPic2,
		title: "What Will Education Be Like In The Next 50 Years?",
		text: "Knowing that, you’ve optimised your pages countless amount of times.",
	},
	{ 
		thumb: blogPic3,
		title: "Master The Skills Of Education And Be.",
		text: "Knowing that, you’ve optimised your pages countless amount of times.",
	},
	{ 
		thumb: blogPic1,
		title: "This Story Behind Education Will Haunt You Forever.",
		text: "Knowing that, you’ve optimised your pages countless amount of times.",
	},
	{ 
		thumb: blogPic2,
		title: "What Will Education Be Like In The Next 50 Years?",
		text: "Knowing that, you’ve optimised your pages countless amount of times.",
	},
	{ 
		thumb: blogPic3,
		title: "Master The Skills Of Education And Be.",
		text: "Knowing that, you’ve optimised your pages countless amount of times.",
	},
]

class RecentNewsSlider extends Component{
	render(){
		
		const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
					}
				}
			]
		};
		
		return(
			<>
				<div className="section-area section-sp1">
					<div className="container">
						<div className="row">
							<div className="col-md-12 heading-bx left">
								<h2 className="title-head">Recent <span>News</span></h2>
								<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
							</div>
						</div>
						<Slider {...settings} className="recent-news-carousel slick-slider owl-btn-1">
							{content.map((item)=>(
								<div className="slider-item">
									<div className="recent-news">
										<div className="action-box">
											<img src={item.thumb} alt=""/>
										</div>
										<div className="info-bx">
											<ul className="media-post">
												<li><Link to="/blog-details"><i className="fa fa-calendar"></i>Jan 02 2019</Link></li>
												<li><Link to="/blog-details"><i className="fa fa-user"></i>By William</Link></li>
											</ul>
											<h5 className="post-title"><Link to="/blog-details">{item.title}</Link></h5>
											<p>{item.text}</p>
											<div className="post-extra">
												<Link to="/blog-details" className="btn-link">Read More</Link>
												<Link to="/blog-details" className="comments-bx"><i className="fa fa-comments-o"></i>20 Comment</Link>
											</div>
										</div>
									</div>
								</div>
							))}
						</Slider>
					</div>
				</div>
			</>
		);
	}
}

export default RecentNewsSlider;
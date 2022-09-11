import React,{Component} from 'react'; 
import { Link } from 'react-router-dom';
import Slider from "react-slick";

// Images
import coursesPic1 from '../../images/courses/pic10.jpg';
import coursesPic2 from '../../images/courses/pic11.jpg';
import coursesPic3 from '../../images/courses/pic12.jpg';
import coursesPic4 from '../../images/courses/pic13.jpg';

// Content
const content = [
	{ 
		thumb: coursesPic1,
		title: "Introduction EduChamp – LMS plugin",
		tag: "Programming",
		review: 3,
		priceDel: 120,
		price: 190,
	},
	{ 
		thumb: coursesPic2,
		title: "Learn PHP Programming From Scratch",
		tag: "Developing",
		review: 4,
		priceDel: 180,
		price: 150,
	},
	{ 
		thumb: coursesPic3,
		title: "Master Microservices with Spring",
		tag: "Coding",
		review: 2,
		priceDel: 520,
		price: 234,
	},
	{ 
		thumb: coursesPic4,
		title: "Build A Full Web Chat App From Scratch",
		tag: "Marketing",
		review: 3,
		priceDel: 320,
		price: 260,
	},
	{ 
		thumb: coursesPic1,
		title: "Strategy Law And Organization Foundation",
		tag: "Lerning",
		review: 4,
		priceDel: 120,
		price: 260,
	},
	{ 
		thumb: coursesPic2,
		title: "Fundamentals Of Music Theory Learn New",
		tag: "Programming",
		review: 1,
		priceDel: 140,
		price: 240,
	},
]

class PopularCoursesSlider2 extends Component{
	render(){
		
		const settings = {
			infinite: true,
			dots: false,
			speed: 500,
			slidesToShow: 6,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1500,
					settings: {
						slidesToShow: 4,
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
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 390,
					settings: {
						slidesToShow: 1,
					}
				}
			]
		};
		
		return(
			<>
				<Slider {...settings} className="courses-carousel-2 slick-slider owl-none">
					{content.map((item)=>(
						<div className="slider-item">
							<div className="cours-bx">
								<div className="action-box">
									<img src={item.thumb} alt=""/>
									<Link to="/courses-details" className="btn">Read More</Link>
								</div>
								<div className="info-bx">
									<span>{item.tag}</span>
									<h6><Link to="/courses-details">{item.title}</Link></h6>
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
									<div className="price">
										<del>$190</del>
										<h5>$120</h5>
									</div>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</>
		);
	}
}

export default PopularCoursesSlider2;
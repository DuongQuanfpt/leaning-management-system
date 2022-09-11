import React,{Component} from 'react'; 
import { Link } from 'react-router-dom';
import Slider from "react-slick";

// Images
import coursesPic1 from '../../images/courses/pic1.jpg';
import coursesPic2 from '../../images/courses/pic2.jpg';
import coursesPic3 from '../../images/courses/pic3.jpg';
import coursesPic4 from '../../images/courses/pic4.jpg';

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
		title: "Strategy Law And Organization",
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

class PopularCoursesSlider extends Component{
	render(){
		
		const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 4,
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
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 360,
					settings: {
						slidesToShow: 1,
					}
				}
			]
		};
		
		return(
			<>
				<div className="section-area section-sp1 bg-gray popular-courses-bx">
					<div className="container">
						<div className="row">
							<div className="col-md-12 heading-bx left">
								<h2 className="title-head">Popular <span>Courses</span></h2>
								<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
							</div>
						</div>
						<Slider {...settings} className="courses-carousel slick-slider owl-btn-1">
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
												<span>{item.review} Review</span>
												<ul className="cours-star">
													<li className="active"><i className="fa fa-star"></i></li>
													<li className="active"><i className="fa fa-star"></i></li>
													<li className="active"><i className="fa fa-star"></i></li>
													<li><i className="fa fa-star"></i></li>
													<li><i className="fa fa-star"></i></li>
												</ul>
											</div>
											<div className="price">
												<del>${item.priceDel}</del>
												<h5>${item.price}</h5>
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

export default PopularCoursesSlider;
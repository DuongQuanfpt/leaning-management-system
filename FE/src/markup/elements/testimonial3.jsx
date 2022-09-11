import React,{Component} from 'react';
import Slider from "react-slick";

// Images
import bg7 from '../../images/background/bg7.jpg';
import testiPic1 from '../../images/testimonials/pic1.jpg';
import testiPic2 from '../../images/testimonials/pic2.jpg';
import testiPic3 from '../../images/testimonials/pic3.jpg';

// Content
const content = [
	{ 
		thumb: testiPic1,
		name: "Peter Packer",
		work: "Art Director",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
	},
	{ 
		thumb: testiPic2,
		name: "Eilderasse",
		work: "Art Director",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
	},
	{ 
		thumb: testiPic3,
		name: "Atwood",
		work: "Developer",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
	},
	{ 
		thumb: testiPic1,
		name: "Peter Packer",
		work: "Designer",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
	},
]

class Testimonial2 extends Component{
	render(){
		
		const settings = {
			infinite: true,
			dots: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
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
				<div className="section-area section-sp2" style={{backgroundImage:"url("+bg7+")", backgroundSize:"cover", backgroundPosition: "center"}}>
					<div className="container">
						<div className="row">
							<div className="col-md-12 heading-bx style1 text-center">
								<h2 className="title-head">What People Say</h2>
								<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
							</div>
						</div>
						<Slider {...settings} className="testimonial-carousel-2 slick-slider owl-btn-1 owl-none">
							{content.map((item)=>(
								<div className="slider-item">
									<div className="testimonial-bx style1">
										<div className="testimonial-head">
											<div className="testimonial-thumb">
												<img src={item.thumb} alt=""/>
											</div>
											<div className="testimonial-info">
												<h5 className="name">{item.name}</h5>
												<p>-{item.work}</p>
											</div>
										</div>
										<div className="testimonial-content">
											<p>{item.text}</p>
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

export default Testimonial2;
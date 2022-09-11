import React,{Component} from 'react'; 
import { Link } from 'react-router-dom';
import Slider from "react-slick";

// Images
import eventPic2 from '../../images/event/pic2.jpg';
import eventPic3 from '../../images/event/pic3.jpg';
import eventPic4 from '../../images/event/pic4.jpg';

// Content
const content = [
	{ 
		thumb: eventPic2,
		title: "Education Autumn Tour 2019",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{ 
		thumb: eventPic3,
		title: "Build A Full Web Chat App",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{ 
		thumb: eventPic4,
		title: "Strategy Law And Organization",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{ 
		thumb: eventPic2,
		title: "Fundamentals Of Music Theory",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{ 
		thumb: eventPic3,
		title: "Build A Full Web Chat App",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{ 
		thumb: eventPic4,
		title: "Strategy Law And Organization",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
]

class UpcomingEventSlider extends Component{
	render(){
		
		const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 2,
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
						slidesToShow: 2,
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
								<h2 className="title-head">Upcoming <span>Events</span></h2>
								<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
							</div>
						</div>
						<Slider {...settings} className="upcoming-event-carousel slick-slider owl-btn-1 m-b15">
							{content.map((item)=>(
								<div className="slider-item">
									<div className="event-bx">
										<div className="action-box">
											<img src={item.thumb} alt=""/>
											<div className="event-time">
												<div className="event-date">29</div>
												<div className="event-month">October</div>
											</div>
										</div>
										<div className="info-bx d-flex">
											<div className="event-info">
												<ul className="media-post">
													<li><Link to="/events-details"><i className="fa fa-clock-o"></i> 7:00am</Link></li>
													<li><Link to="/events-details"><i className="fa fa-map-marker"></i> Berlin, Germany</Link></li>
												</ul>
												<h4 className="event-title"><Link to="/events-details">{item.title}</Link></h4>
												<p>{item.text}</p>
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

export default UpcomingEventSlider;
import React,{Component} from 'react'; 
import { Link } from 'react-router-dom';

// Images
import bg4 from '../../images/background/bg4.jpg';
import EventImg10 from '../../images/courses/pic10.jpg';
import EventImg12 from '../../images/courses/pic12.jpg';
import EventImg13 from '../../images/courses/pic13.jpg';

// Portfolio Content
const content = [
	{ 
		thumb: EventImg10,
		tag: ['Happening',],
		title: "This Story Behind Education Will Haunt You Forever.",		
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the..",		
		date: 29,
	},
	{ 
		thumb: EventImg13,
		tag: ['Upcoming',],
		title: "What Will Education Be Like In The Next 50 Years?",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the..",
		date: 28,
	},
	{ 
		thumb: EventImg12,
		tag: ['Expired',],
		title: "Master The Skills Of Education And Be.",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the..",
		date: 27,
	},
]

class EventsContent2 extends Component{
	render(){
		return(
			<>
				<div className="section-area section-sp2" style={{backgroundImage:"url("+bg4+")", backgroundSize:"cover"}}>
					<div className="container">
						<div className="row">
							<div className="col-md-12 style1 text-center heading-bx">
								<h2 className="title-head m-b0">Upcoming Events</h2>
								<p className="m-b0">Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley.</p>
							</div>
						</div>
						<div className="row">
							{content.map((item) =>(
								<div className="col-md-12">
									<div className="event-bx style1">
										<div className="action-box">
											<img src={item.thumb} alt=""/>
										</div>
										<div className="info-bx d-flex">
											<div className="event-info">
												<ul className="media-post">
													<li><Link to="/events-details"><i className="fa fa-clock-o"></i> 7:00am 8:00am</Link></li>
													<li><Link to="/events-details"><i className="fa fa-map-marker"></i> Berlin, Germany</Link></li>
												</ul>
												<h4 className="event-title"><Link to="/events-details">{item.title}</Link></h4>
												<p>{item.text}</p>
											</div>
										</div>
										<div className="event-time">
											<div className="event-date">{item.date}</div>
											<div className="event-month">October</div>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="text-center">
							<Link to="/event" className="btn">View All Event</Link>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default EventsContent2;
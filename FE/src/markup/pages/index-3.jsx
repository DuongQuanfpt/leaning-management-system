import React, {Component} from 'react';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer2";

// Elements
import MainSlider from '../elements/slider/slider2';
import OurStory2 from '../elements/our-story/our-story2';
import ServicesContent3 from '../elements/services-content-3';
import AppointmentBox from '../elements/appointment-box';
import EventsContent2 from '../elements/events-content2';
import Testimonial3 from '../elements/testimonial3';
import PopularCoursesSlider2 from '../elements/popular-courses-slider2';

// Images
import bg4 from '../../images/background/bg4.jpg';

class Index3 extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content bg-white">
				
					<MainSlider />
					
					<div className="content-block" id="content-area">
						
						<div className="popular-courses-bx" style={{backgroundImage:"url("+bg4+")", backgroundSize: "cover"}}>
							<div className="section-area section-sp3">
								<div className="container">
									<div className="row">
										<div className="col-md-12 heading-bx style1 text-center">
											<h2 className="title-head">Our Awesome Services</h2>
											<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
										</div>
									</div>
									
									<ServicesContent3 />
									
								</div>
							</div>
							
							<div className="section-area section-sp1">
								<div className="container-fluid">
									<div className="row">
										<div className="col-md-12 heading-bx style1 text-center">
											<h2 className="title-head">Popular Courses</h2>
											<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
										</div>
									</div>
									
									<PopularCoursesSlider2 />
								
								</div>
							</div>
						</div>
						
						<AppointmentBox />
						
						<EventsContent2 />
												
						<OurStory2 />
						
						<Testimonial3 />
												
					</div>
					
				</div>
				
				<Footer/>
				
			</>
		);
	}
}

export default Index3;
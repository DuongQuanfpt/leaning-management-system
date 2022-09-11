import React, {Component} from 'react';

// Layout
import Header from "../layout/header/header2";
import Footer from "../layout/footer/footer1";

// Elements
import MainSlider from '../elements/slider/slider1';
import ServicesContent2 from '../elements/services-content-2';
import OnlineCourses from '../elements/online-courses';
import Testimonial2 from '../elements/testimonial2';
import PopularCoursesSlider from '../elements/popular-courses-slider';
import UpcomingEventSlider from '../elements/upcoming-event-slider';
import RecentNewsSlider from '../elements/recent-news-slider';

class Index extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content bg-white">
				
					<MainSlider />
					
					<div className="content-block" id="content-area">
						
						
						<ServicesContent2 />
						
						<PopularCoursesSlider />
						
						<OnlineCourses />
						
						<UpcomingEventSlider />
						
						<Testimonial2 />
						
						<RecentNewsSlider />
						
					</div>
					
				</div>
				
				<Footer/>
				
			</>
		);
	}
}

export default Index;
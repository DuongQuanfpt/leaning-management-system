import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import OurStory1 from '../elements/our-story/our-story1';
import Counter1 from '../elements/counter/counter1';
import ServicesContent1 from '../elements/services-content-1';
import FeatureContent3 from '../elements/feature-content3';
import Testimonial1 from '../elements/testimonial1';

// Images
import bannerImg from '../../images/banner/banner3.jpg';

class About2 extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">About Us 2</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>About Us 2</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<FeatureContent3 />
						
						<ServicesContent1 />
			
						<div className="section-area content-inner section-sp1">
							<div className="container">
								<div className="section-content">
									<Counter1 />
								</div>
							</div>
						</div>
						
						<OurStory1 />
						
						<Testimonial1 />
						
					</div>
					
				</div>
				
				<Footer/>
				
			</>
		);
	}
}

export default About2;
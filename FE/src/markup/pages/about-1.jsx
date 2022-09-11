import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import FeatureContent2 from '../elements/feature-content1';
import Counter2 from '../elements/counter/counter2';
import OurStory1 from '../elements/our-story/our-story1';
import Testimonial1 from '../elements/testimonial1';

// Images
import bannerImg from '../../images/banner/banner2.jpg';


class About1 extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">About Us 1</h1>
							</div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>About Us 1</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="section-area section-sp1">
							<div className="container">
								<FeatureContent2 />
							</div>
						</div>
						
						<OurStory1 />
						
						<Counter2 />
						
						<Testimonial1 />
						
					</div>
					
				</div>
				
				<Footer/>
				
			</>
		);
	}
}

export default About1;
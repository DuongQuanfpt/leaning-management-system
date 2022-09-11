import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import PortfolioContent from "../elements/portfolio-content";

// Images
import bannerImg from '../../images/banner/banner1.jpg';

class Portfolio extends Component{
	
	render(){
		return (
			<>
				
				<Header />
				
				<div className="page-content">
					
					<div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
						<div className="container">
							<div className="page-banner-entry">
								<h1 className="text-white">Portfolio</h1>
							 </div>
						</div>
					</div>
					<div className="breadcrumb-row">
						<div className="container">
							<ul className="list-inline">
								<li><Link to="/">Home</Link></li>
								<li>Portfolio</li>
							</ul>
						</div>
					</div>
					
					<div className="content-block">
						
						<div className="section-area section-sp1 gallery-bx">
							<div className="container">
								<PortfolioContent />
							</div>
						</div>
						
					</div>
					
				</div>
				
				<Footer/>
				
			</>
		);
	}
}

export default Portfolio;
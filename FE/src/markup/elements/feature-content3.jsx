import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Elements
import Count from '../elements/counter/counter-sensor';

// Images
import icon1 from '../../images/icon/icon1.png';
import icon2 from '../../images/icon/icon2.png';
import icon3 from '../../images/icon/icon3.png';
import icon4 from '../../images/icon/icon4.png';

const content = [
	{
		IconImg: icon1,
		Title: "Our Philosophy",
		Text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
	},
	{
		IconImg: icon2,
		Title: "Kingster's Principle",
		Text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
	},
	{
		IconImg: icon3,
		Title: "Key Of Success",
		Text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
	},
	{
		IconImg: icon4,
		Title: "Our Philosophy",
		Text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
	},
]

class FeatureContent3 extends Component{
	render(){
		return(
			<>
				<div className="section-area section-sp1">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-6 m-b50">
								<div className="heading-bx left mb-3">
									<h2 className="title-head m-b0">Learn A New <span>Skill online</span></h2>
									<p className="m-b0">It is a long established fact that a reader will be distracted by the readable content of a page</p>
								</div>
								<p class="m-b15">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
								<h4 class="m-b30"><Count counter={57000}/> Online Courses</h4>
								<Link to="/contact-1" className="btn button-md">Join Now</Link>
							</div>
							<div className="col-lg-6">
								<div className="row">
									{content.map((item) => (
										<div className="col-lg-6 col-md-6 col-sm-6 m-b40">
											<div className="feature-container">
												<div className="feature-md text-white m-b20">
													<Link to="#" className="icon-cell"><img src={item.IconImg} alt=""/></Link> 
												</div>
												<div className="icon-content">
													<h5 className="ttr-tilte">{item.Title}</h5>
													<p>{item.Text}</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default FeatureContent3;
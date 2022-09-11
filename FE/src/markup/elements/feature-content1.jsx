import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

class FeatureContent1 extends Component{
	render(){
		return(
			<>
				<div className="row">
					{content.map((item) => (
						<div className="col-lg-3 col-md-6 col-sm-6 m-b30">
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
			</>
		);
	}
}

export default FeatureContent1;
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Images
import logoWhite2 from '../../images/logo-white-2.png';
import bannerImg from '../../images/background/bg2.jpg';

class Error404 extends Component{
	
	render(){
		return (
			<>
				<div className="account-form">
					<div className="account-head" style={{backgroundImage:"url("+bannerImg+")"}}>
						<Link to="/"><img src={logoWhite2} alt=""/></Link>
					</div>
					<div className="account-form-inner">
						<div className="account-container">
							<div className="error-page">
								<h2 className="error-title">404</h2>
								<h4 className="m-b15">The Page you were looking for, couldn't be found.</h4>
								<p className="m-b30">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
								<div className="">
									<Link to="/" className="btn m-r15">Preview</Link>
									<Link to="/" className="btn outline black">Back To Home</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Error404;
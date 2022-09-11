import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Images
import logoWhite2 from '../../images/logo-white-2.png';
import bannerImg from '../../images/background/bg2.jpg';

class Login extends Component{
	
	render(){
		return (
			<>
				
				<div className="account-form">
					<div className="account-head" style={{backgroundImage: "url("+bannerImg+")"}}>
						<Link to="/"><img src={logoWhite2} alt=""/></Link>
					</div>
					<div className="account-form-inner">
						<div className="account-container">
							<div className="heading-bx left">
								<h2 className="title-head">Login to your <span>Account</span></h2>
								<p>Don't have an account? <Link to="/register">Create one here</Link></p>
							</div>	
							<form className="contact-bx">
								<div className="row placeani">
									<div className="col-lg-12">
										<div className="form-group">
											<div className="input-group">
												<input name="name" type="text" required="" placeholder="Your Name" className="form-control"/>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group">
											<div className="input-group">
												<input name="email" type="password" className="form-control" placeholder="Your Password" required=""/>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group form-forget">
											<div className="custom-control custom-checkbox">
												<input type="checkbox" className="custom-control-input" id="customControlAutosizing"/>
												<label className="custom-control-label" htmlFor="customControlAutosizing">Remember me</label>
											</div>
											<Link to="/forget-password" className="ml-auto">Forgot Password?</Link>
										</div>
									</div>
									<div className="col-lg-12 m-b30">
										<button name="submit" type="submit" value="Submit" className="btn button-md">Login</button>
									</div>
									<div className="col-lg-12">
										<h6 className="m-b15">Login with Social media</h6>
										<Link className="btn flex-fill m-r10 facebook" to="#"><i className="fa fa-facebook"></i>Facebook</Link>
										<Link className="btn flex-fill m-l5 google-plus" to="#"><i className="fa fa-google-plus"></i>Google Plus</Link>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				
			</>
		);
	}
}

export default Login;
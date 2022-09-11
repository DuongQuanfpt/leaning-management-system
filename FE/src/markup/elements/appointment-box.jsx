import React, { Component } from 'react';

// Images
import bg1 from '../../images/background/bg1.jpg';
import appBg from '../../images/background/appointment-bg.png';

class AppointmentBox extends Component{
	render(){
		return(
			<>
				<div className="section-area section-sp3 ovpr-dark bg-fix appointment-box" style={{backgroundImage:"url("+bg1+")"}}>
					<div className="container">
						<div className="row">
							<div className="col-md-12 heading-bx style1 text-white text-center">
								<h2 className="title-head">Register Now</h2>
								<p>Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley.</p>
							</div>
						</div>
						<form className="contact-bx ajax-form">
							<div className="ajax-message"></div>
							<div className="row placeani">
								<div className="col-lg-6">
									<div className="form-group">
										<div className="input-group">
											<input name="name" type="text" placeholder="Your Name" required className="form-control valid-character"/>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<div className="input-group">
											<input name="email" type="email" placeholder="Your Email Address" className="form-control" required />
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<div className="input-group">
											<input name="phone" type="text" placeholder="Your Phone" required className="form-control int-value"/>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<div className="input-group">
											<input name="subject" type="text" placeholder="Subject" required className="form-control"/>
										</div>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group">
										<div className="input-group">
											<textarea name="message" rows="4" placeholder="Type Message" className="form-control" required ></textarea>
										</div>
									</div>
								</div>
								<div className="col-lg-12">
									<button name="submit" type="submit" value="Submit" className="btn button-md">Send Message</button>
								</div>
							</div>
						</form>
					</div>
					<img src={appBg} className="appoint-bg" alt=""/>
				</div>
			</>
		);
	}
}

export default AppointmentBox;
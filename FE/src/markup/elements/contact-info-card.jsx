import React,{Component} from 'react'; 
import { Link } from 'react-router-dom';

class ContactInfoCard extends Component{
	render(){
		return(
			<>
				<div className="bg-primary text-white contact-info-bx">
					<div className="heading-bx left mb-4">
						<h3 className="m-b10 title-head">Contact <span> Info</span></h3>
						<p className="m-b0">It is a long established fact that a reader will be distracted</p>
					</div>
					<div className="widget widget_getintuch">	
						<ul>
							<li><i className="ti-location-pin"></i>75k Newcastle St. Ponte Vedra Beach, FL 309382 New York New York</li>
							<li><i className="ti-mobile"></i>0800-123456 (24/7 Support Line)</li>
							<li><i className="ti-email"></i>info@example.com</li>
						</ul>
					</div>
					<h5 className="m-t0 m-b20">Follow Us</h5>
					<ul className="list-inline contact-social-bx m-b0">
						<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-facebook"></i></Link></li>
						<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-twitter"></i></Link></li>
						<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-linkedin"></i></Link></li>
						<li><Link to="#" className="btn outline radius-xl"><i className="fa fa-google-plus"></i></Link></li>
					</ul>
				</div>
			</>
		);
	}
}

export default ContactInfoCard;
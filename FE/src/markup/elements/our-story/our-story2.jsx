import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ModalVideo from 'react-modal-video'

// Images
import aboutPic1 from '../../../images/about/pic1.jpg';

class OurStory2 extends Component{
	
	constructor () {
		super()
		this.state = {
			isOpen: false
		}
		this.openModal = this.openModal.bind(this)
	}
	openModal () {
		this.setState({isOpen: true})
	}
	
	render(){
		return(
			<>
				<div className="section-area bg-primary section-sp1 our-story popp">
					<div className="container">
						<div className="row align-items-center d-flex">
							<div className="col-lg-5 col-md-12 text-white m-b30">
								<div className="heading-bx style1 mb-3">
									<h2 className="title-head">Our Story</h2>
									<p className="text-white">It is a long established fact that a reader will be distracted by the readable content of a page</p>
								</div>
								<p className="m-b30">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
								<Link to="/blog-details" className="btn">Read More</Link>
							</div>
							<div className="col-lg-7 col-md-12 heading-bx p-lr">
								<div className="video-bx">
									<img src={aboutPic1} alt=""/>
									<Link onClick={this.openModal} to="#" className="popup-youtube video"><i className="fa fa-play"></i></Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='x_sJzVe9P_8' onClose={() => this.setState({isOpen: false})} />
				
			</>
		);
	}
}

export default OurStory2;
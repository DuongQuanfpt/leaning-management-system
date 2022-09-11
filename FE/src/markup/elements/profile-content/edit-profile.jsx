import React, { Component } from 'react';

class EditProfile extends Component{
	render(){
		return(
			<>
				<div className="profile-head">
					<h5>Edit Profile</h5>
				</div>
				<form className="edit-profile">
					<div className="">
						<div className="form-group row">
							<div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
								<h3>1. Personal Details</h3>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Full Name</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="Mark Andre"/>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Occupation</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="CTO"/>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Company Name</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="EduChamp"/>
								<span className="help">If you want your invoices addressed to a company. Leave blank to use your full name.</span>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Phone No.</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="+120 012345 6789"/>
							</div>
						</div>
						
						<div className="seperator"></div>
						
						<div className="form-group row">
							<div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
								<h3>2. Address</h3>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Address</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="5-S2-20 Dummy City, UK"/>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">City</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="US"/>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">State</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="California"/>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Postcode</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="000702"/>
							</div>
						</div>

						<div className="m-form__seperator m-form__seperator--dashed m-form__seperator--space-2x"></div>

						<div className="form-group row">
							<div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
								<h3 className="m-form__section">3. Social Links</h3>
							</div>
						</div>

						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Linkedin</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="www.linkedin.com"/>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Facebook</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="www.facebook.com"/>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Twitter</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="www.twitter.com"/>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Instagram</label>
							<div className="col-12 col-sm-9 col-md-9 col-lg-7">
								<input className="form-control" type="text" value="www.instagram.com"/>
							</div>
						</div>
					</div>
					<div className="">
						<div className="">
							<div className="row">
								<div className="col-12 col-sm-3 col-md-3 col-lg-2">
								</div>
								<div className="col-12 col-sm-9 col-md-9 col-lg-7">
									<button type="reset" className="btn m-r10">Save changes</button>
									<button type="reset" className="btn-secondry">Cancel</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</>
		);
	}
}

export default EditProfile;
import React, { Component } from 'react';

class QuizResults extends Component{
	render(){
		return(
			<>
				<div className="profile-head">
					<h5>Quiz Results</h5>
				</div>
				<div className="courses-filter">
					<div className="row">
						<div className="col-md-6 col-lg-6">
							<ul className="course-features">
								<li>
									<i className="ti-book"></i> 
									<span className="label">Lectures</span> 
									<span className="value">8</span>
								</li>
								<li>
									<i className="ti-help-alt"></i> 
									<span className="label">Quizzes</span> 
									<span className="value">1</span>
								</li>
								<li>
									<i className="ti-time"></i> 
									<span className="label">Duration</span> 
									<span className="value">60 hours</span>
								</li>
								<li>
									<i className="ti-stats-up"></i> 
									<span className="label">Skill level</span> 
									<span className="value">Beginner</span>
								</li>
								<li>
									<i className="ti-smallcap"></i> 
									<span className="label">Language</span> 
									<span className="value">English</span>
								</li>
								<li>
									<i className="ti-user"></i> 
									<span className="label">Students</span> 
									<span className="value">32</span>
								</li>
								<li>
									<i className="ti-check-box"></i> 
									<span className="label">Assessments</span> 
									<span className="value">Yes</span>
								</li>
							</ul>
						</div>
						<div className="col-md-6 col-lg-6">
							<ul className="course-features">
								<li>
									<i className="ti-book"></i> 
									<span className="label">Lectures</span> 
									<span className="value">8</span>
								</li>
								<li>
									<i className="ti-help-alt"></i> 
									<span className="label">Quizzes</span> 
									<span className="value">1</span>
								</li>
								<li>
									<i className="ti-time"></i> 
									<span className="label">Duration</span> 
									<span className="value">60 hours</span>
								</li>
								<li>
									<i className="ti-stats-up"></i> 
									<span className="label">Skill level</span> 
									<span className="value">Beginner</span>
								</li>
								<li>
									<i className="ti-smallcap"></i> 
									<span className="label">Language</span> 
									<span className="value">English</span>
								</li>
								<li>
									<i className="ti-user"></i> 
									<span className="label">Students</span> 
									<span className="value">32</span>
								</li>
								<li>
									<i className="ti-check-box"></i> 
									<span className="label">Assessments</span> 
									<span className="value">Yes</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default QuizResults;
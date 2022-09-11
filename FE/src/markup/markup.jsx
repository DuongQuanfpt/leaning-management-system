import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Elements
import BackToTop from './elements/back-top';
import PageScrollTop from './elements/page-scroll-top';

// Home Pages
import Index from './pages/index';
import Index2 from './pages/index-2';
import Index3 from './pages/index-3';

// About Us
import About1 from './pages/about-1';
import About2 from './pages/about-2';

// Events
import Events from './pages/event';
import EventsDetails from './pages/events-details';

// Faq
import Faq1 from './pages/faq-1';
import Faq2 from './pages/faq-2';

// Other Pages
import Portfolio from './pages/portfolio';
import Profile from './pages/profile';
import Membership from './pages/membership';
import Error404 from './pages/error-404';
import Register from './pages/register';
import Login from './pages/login';
import ForgetPassword from './pages/forget-password';

// Courses
import Courses from './pages/courses';
import CoursesDetails from './pages/courses-details';

// Blog Pages
import BlogClassicGrid from './pages/blog-classic-grid';
import BlogClassicSidebar from './pages/blog-classic-sidebar';
import BlogListSidebar from './pages/blog-list-sidebar';
import BlogStandardSidebar from './pages/blog-standard-sidebar';
import BlogDetails from './pages/blog-details';

// Contact Us
import Contact1 from './pages/contact-1';
import Contact2 from './pages/contact-2';

class Markup extends Component{
	render(){
		return(
			<>
				<BrowserRouter basename={'/react/'}>
					<Switch>
					
						{/* Home Pages */}
						<Route path='/' exact component={Index} />
						<Route path='/index-2' exact component={Index2} />
						<Route path='/index-3' exact component={Index3} />
						
						{/* About Us */}
						<Route path='/about-1' exact component={About1} />
						<Route path='/about-2' exact component={About2} />
						
						{/* Events */}
						<Route path='/event' exact component={Events} />
						<Route path='/events-details' exact component={EventsDetails} />
						
						{/* Faq */}
						<Route path='/faq-1' exact component={Faq1} />
						<Route path='/faq-2' exact component={Faq2} />
						
						{/* Other Pages */}
						<Route path='/portfolio' exact component={Portfolio} />
						<Route path='/profile' exact component={Profile} />
						<Route path='/membership' exact component={Membership} />
						<Route path='/error-404' exact component={Error404} />
						<Route path='/register' exact component={Register} />
						<Route path='/login' exact component={Login} />
						<Route path='/forget-password' exact component={ForgetPassword} />
						
						{/* Courses */}
						<Route path='/courses' exact component={Courses} />
						<Route path='/courses-details' exact component={CoursesDetails} />
						
						{/* Blog Pages */}
						<Route path='/blog-classic-grid' exact component={BlogClassicGrid} />
						<Route path='/blog-classic-sidebar' exact component={BlogClassicSidebar} />
						<Route path='/blog-list-sidebar' exact component={BlogListSidebar} />
						<Route path='/blog-standard-sidebar' exact component={BlogStandardSidebar} />
						<Route path='/blog-details' exact component={BlogDetails} />
						
						{/* Contact Us */}
						<Route path='/contact-1' exact component={Contact1} />
						<Route path='/contact-2' exact component={Contact2} />
						
					</Switch>
					
					<PageScrollTop />
					
				</BrowserRouter>
				
				<BackToTop />
				
			</>
			
		);
	}
}

export default Markup;
import React,{Component,useState, useEffect} from 'react'; 
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';

// Images
import coursesPic1 from '../../../images/courses/pic1.jpg';
import coursesPic2 from '../../../images/courses/pic2.jpg';
import coursesPic3 from '../../../images/courses/pic3.jpg';
import coursesPic4 from '../../../images/courses/pic4.jpg';
import coursesPic5 from '../../../images/courses/pic5.jpg';
import coursesPic6 from '../../../images/courses/pic6.jpg';
import coursesPic7 from '../../../images/courses/pic7.jpg';
import coursesPic8 from '../../../images/courses/pic8.jpg';
import coursesPic9 from '../../../images/courses/pic9.jpg';

// Portfolio Content
const content = [
	{ 
		thumb: coursesPic1, 
		tag: ['Publish',],
		title: "Introduction EduChamp – LMS plugin",
		exetitle: "Programming",
		Review: 4,
		PriceDel: 120,
		Price: 260,
	},
	{ 
		thumb: coursesPic2, 
		tag: ['Pending',],
		title: "Learn PHP Programming From Scratch",
		exetitle: "Developing",
		Review: 4,
		PriceDel: 120,
		Price: 260,
	},
	{ 
		thumb: coursesPic3, 
		tag: ['Pending',],
		title: "Strategy Law And Organization Foundation",
		exetitle: "Coding",
		Review: 4,
		PriceDel: 220,
		Price: 660,
	},
	{ 
		thumb: coursesPic4, 
		tag: ['Publish',],
		title: "Strategy Law And Organization Foundation",
		exetitle: "Marketing",
		Review: 3,
		PriceDel: 120,
		Price: 260,
	},
	{ 
		thumb: coursesPic5, 
		tag: ['Pending',],
		title: "Introduction EduChamp – LMS plugin",
		exetitle: "Programming",
		Review: 3,
		PriceDel: 320,
		Price: 460,
	},
	{ 
		thumb: coursesPic6, 
		tag: ['Pending',],
		title: "Introduction EduChamp – LMS plugin",
		exetitle: "Programming",
		Review: 2,
		PriceDel: 600,
		Price: 520,
	},
	{ 
		thumb: coursesPic7, 
		tag: ['Publish',],
		title: "Learn PHP Programming From Scratch",
		exetitle: "Programming",
		Review: 1,
		PriceDel: 220,
		Price: 160,
	},
	{ 
		thumb: coursesPic8, 
		tag: ['Pending',],
		title: "Introduction EduChamp – LMS plugin",
		exetitle: "Programming",
		Review: 3,
		PriceDel: 120,
		Price: 260,
	},
	{ 
		thumb: coursesPic9, 
		tag: ['Pending',],
		title: "Strategy Law And Organization Foundation",
		exetitle: "Programming",
		Review: 5,
		PriceDel: 542,
		Price: 180,
	},
]

const FilterList = ({dataFilter, defaultTag, activeFilter}) => {                                                               
	return (	
		<li className={`${activeFilter ? 'btn active' : 'btn'}` } onClick={() => defaultTag(dataFilter)} >
			<Link to={"#"}>{dataFilter}</Link>
		</li> 
	);
};

function CoursesContent(){
	const [tag, setTag] = useState('All');
	const [filteredImages, setFilterdImages] = useState([]);
	
	useEffect( () => {
		tag === 'All' ? setFilterdImages(content) : setFilterdImages(content.filter( image => image.tag.find(element => element === tag)))
	}, [tag])	
	
	return(
			
			<>
			
			<div className="profile-head">
				<h5>My Courses</h5>
				<div className="feature-filters style1 ml-auto">
					<ul className="filters" data-toggle="buttons">
						<FilterList 
							dataFilter="All" 
							defaultTag={setTag} 
							activeFilter={ tag === 'All' ? true : false }	
						/>
						<FilterList 
							dataFilter="Publish" 
							defaultTag={setTag} 
							activeFilter={ tag === 'Publish' ? true : false }
						/>
						<FilterList 
							dataFilter="Pending" 
							defaultTag={setTag} 
							activeFilter={ tag === 'Pending' ? true : false }
						/>
					</ul>
				</div>
			</div>
			
			<div className="courses-filter">
				<Masonry>
					<ul className="ttr-gallery-listing magnific-image row">
						{filteredImages.map((item, index)=>(	
							<li className="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6" key={index}>
								<div className="cours-bx">
									<div className="action-box">
										<img src={item.thumb} alt=""/>
										<Link to="/courses-details" className="btn">Read More</Link>
									</div>
									<div className="info-bx">
										<span>{item.exetitle}</span>
										<h6><Link to="/courses-details">{item.title}</Link></h6>
									</div>
									<div className="cours-more-info">
										<div className="review">
											<span>{item.Review} Review</span>
											<ul className="cours-star">
												<li className="active"><i className="fa fa-star"></i></li>
												<li className="active"><i className="fa fa-star"></i></li>
												<li className="active"><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
											</ul>
										</div>
										<div className="price">
											<del>${item.PriceDel}</del>
											<h5>${item.Price}</h5>
										</div>
									</div>
								</div>
							</li>
						))}	
					</ul>
				</Masonry>
			</div>
			
		</>
		
	);
}

class Courses extends Component{
	render(){
		return(
			<>
				
				<CoursesContent />
							
			</>
		);
	}
}

export default Courses;
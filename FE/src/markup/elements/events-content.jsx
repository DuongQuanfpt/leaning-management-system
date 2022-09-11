import React,{Component,useState, useEffect} from 'react'; 
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';

// Images
import EventImg1 from '../../images/event/pic1.jpg';
import EventImg2 from '../../images/event/pic2.jpg';
import EventImg3 from '../../images/event/pic3.jpg';
import EventImg4 from '../../images/event/pic4.jpg';

// Portfolio Content
const content = [
	{ 
		thumb: EventImg1,
		tag: ['Happening',],
		title: "This Story Behind Education",	
		date: 29,
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",	
	},
	{ 
		thumb: EventImg2,
		tag: ['Upcoming',],
		title: "What Will Education Be Like",
		date: 28,
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{ 
		thumb: EventImg3,
		tag: ['Expired',],
		title: "Master The Skills Of Education",
		date: 27,
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{ 
		thumb: EventImg4,
		tag: ['Happening',],
		title: "Eliminate Your Fears And Doubts",
		date: 26,
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{ 
		thumb: EventImg1,
		tag: ['Upcoming',],
		title: "Seven Reasons You Should Fall",
		date: 25,
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{ 
		thumb: EventImg2,
		tag: ['Expired',],
		title: "What Will Education Be Like",
		date: 24,
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
]

const FilterList = ({dataFilter, defaultTag, activeFilter}) => {                                                               
	return (	
		<li className={`${activeFilter ? 'btn active' : 'btn'}` } onClick={() => defaultTag(dataFilter)} >
			<Link to={"#"}>{dataFilter}</Link>
		</li> 
	);
};

function MasonryContent(){
	const [tag, setTag] = useState('All');
	const [filteredImages, setFilterdImages] = useState([]);
	
	useEffect( () => {
		tag === 'All' ? setFilterdImages(content) : setFilterdImages(content.filter( image => image.tag.find(element => element === tag)))
	}, [tag])	
	
	return(
			
			<>
			
			<div className="feature-filters clearfix center m-b40">
				<ul className="filters" data-toggle="buttons">
					<FilterList 
						dataFilter="All" 
						defaultTag={setTag} 
						activeFilter={ tag === 'All' ? true : false }	
					/>
					<FilterList 
						dataFilter="Happening" 
						defaultTag={setTag} 
						activeFilter={ tag === 'Happening' ? true : false }
					/>
					<FilterList 
						dataFilter="Upcoming" 
						defaultTag={setTag} 
						activeFilter={ tag === 'Upcoming' ? true : false }
					/>
					<FilterList 
						dataFilter="Expired"
						defaultTag={setTag} 
						activeFilter={ tag === 'Expired' ? true : false }	
					/>
				</ul>
			</div>
			
			<Masonry className="ttr-gallery-listing magnific-image row">
				{filteredImages.map((item, index)=>(	
					<div className="action-card col-lg-6 col-md-6 col-sm-12" key={index}>
						<div className="event-bx m-b30">
							<div className="action-box">
								<img src={item.thumb}  alt="" />
								<div className="event-time">
									<div className="event-date">{item.date}</div>
									<div className="event-month">October</div>
								</div>
							</div>
							<div className="info-bx">
								<div className="event-info">
									<ul className="media-post">
										<li><Link to="/events-details"><i className="fa fa-clock-o"></i> 7:00am</Link></li>
										<li><Link to="/events-details"><i className="fa fa-map-marker"></i> Berlin, Germany</Link></li>
									</ul>
									<h4 className="event-title"><Link to="/events-details">{item.title}</Link></h4>
									<p>{item.text}</p>
								</div>
							</div>
						</div>
					</div>
				))}	
			</Masonry>
		</>
		
	);
}

class EventsContent extends Component{
	render(){
		return(
			<>
				<MasonryContent />
			</>
		);
	}
}

export default EventsContent;
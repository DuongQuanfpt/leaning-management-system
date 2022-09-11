import React,{Component,useState, useEffect} from 'react'; 
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import SimpleReactLightbox, {SRLWrapper, useLightbox} from 'simple-react-lightbox';

// Images
import PortImg1 from '../../images/portfolio/image_1.jpg';
import PortImg2 from '../../images/portfolio/image_2.jpg';
import PortImg3 from '../../images/portfolio/image_3.jpg';
import PortImg4 from '../../images/portfolio/image_4.jpg';
import PortImg5 from '../../images/portfolio/image_5.jpg';
import PortImg6 from '../../images/portfolio/image_6.jpg';
import PortImg7 from '../../images/portfolio/image_7.jpg';
import PortImg8 from '../../images/portfolio/image_8.jpg';
import PortImg9 from '../../images/portfolio/image_9.jpg';
import PortImg10 from '../../images/portfolio/image_10.jpg';
import PortImg11 from '../../images/portfolio/image_11.jpg';
import PortImg12 from '../../images/portfolio/image_12.jpg';

// Portfolio Content
const content = [
	{ 
		thumb: PortImg1,
		LightImg: PortImg1,
		tag: ['Book',],
		title: "Soft skills",		
	},
	{ 
		thumb: PortImg2, 
		LightImg: PortImg2,
		tag: ['Courses',],
		title: "Web Development",
	},
	{ 
		thumb: PortImg3, 
		LightImg: PortImg3,
		tag: ['Education',],
		title: "Marketing",
	},
	{ 
		thumb: PortImg4, 
		LightImg: PortImg4,
		tag: ['Book',],
		title: "Creative Design",
	},
	{ 
		thumb: PortImg5, 
		LightImg: PortImg5,
		tag: ['Courses',],
		title: "Creative Design",
	},
	{ 
		thumb: PortImg6, 
		LightImg: PortImg6,
		tag: ['Education',],
		title: "Web Development",
	},
	{ 
		thumb: PortImg7, 
		LightImg: PortImg7,
		tag: ['Book',],
		title: "Marketing",
	},
	{ 
		thumb: PortImg8, 
		LightImg: PortImg8,
		tag: ['Courses',],
		title: "Creative Design",
	},
	{ 
		thumb: PortImg9, 
		LightImg: PortImg9,
		tag: ['Education',],
		title: "Creative Design",
	},
	{ 
		thumb: PortImg10, 
		LightImg: PortImg10,
		tag: ['Book',],
		title: "Creative Design",
	},
	{ 
		thumb: PortImg11, 
		LightImg: PortImg11,
		tag: ['Courses',],
		title: "Creative Design",
	},
	{ 
		thumb: PortImg12, 
		LightImg: PortImg12,
		tag: ['Education',],
		title: "Creative Design",
	},
]

// Magnific Anchor
const MagnificAnchor = props => {
	const { openLightbox } = useLightbox()

	return (
		<Link to={"#"} onClick={() => openLightbox(props.imageToOpen)} className="magnific-anchor" >
			<i className="ti-search"></i>
		</Link>
	)
}

const options = {
	settings: {
		overlayColor: "rgba(0,0,0,0.9)",
		backgroundColor: "#f7b205",
		slideAnimationType: 'slide',
	},
	buttons: {
		backgroundColor: "#f7b205",
		iconColor: "rgba(255, 255, 255, 1)",
		showAutoplayButton: false,
		showDownloadButton: false,
	},
	caption: {
		captionColor: "#a6cfa5",
		captionFontFamily: "Raleway, sans-serif",
		captionFontWeight: "300",
		captionTextTransform: "uppercase",
	}
};

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
						dataFilter="Book" 
						defaultTag={setTag} 
						activeFilter={ tag === 'Book' ? true : false }
					/>
					<FilterList 
						dataFilter="Courses" 
						defaultTag={setTag} 
						activeFilter={ tag === 'Courses' ? true : false }
					/>
					<FilterList 
						dataFilter="Education"
						defaultTag={setTag} 
						activeFilter={ tag === 'Education' ? true : false }	
					/>
				</ul>
			</div>
			
			<SimpleReactLightbox>
				<SRLWrapper options={options}>
					<Masonry className="ttr-gallery-listing">
						{filteredImages.map((item, index)=>(	
							<div className="action-card col-lg-3 col-md-4 col-sm-6" key={index}>
								<div className="ttr-box portfolio-bx">
									<div className="ttr-media media-ov2 media-effect">
										<img src={item.thumb}  alt="" />
										<div className="ov-box">
											<div className="overlay-icon align-m"> 
												<MagnificAnchor />
											</div>
											<div className="portfolio-info-bx">
												<h4>{item.title}</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}	
					</Masonry>
				</SRLWrapper>
			</SimpleReactLightbox>
		</>
		
	);
}

class PortfolioContent extends Component{
	render(){
		return(
			<>
				<MasonryContent />
			</>
		);
	}
}

export default PortfolioContent;
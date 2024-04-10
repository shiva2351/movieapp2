

import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class SliderMovies extends Component {
  render() {
    const {movieList} = this.props
    return (
      <Slider {...settings} className="slider-Card">
        {movieList.map(eachItem => {
          const {id, title, posterPath} = eachItem
          return (
            <Link to={`/movies/${id}`} key={id}>
              <li testid="MovieCard" className="slide-item" key={id}>
                <img className="home-origin-img" alt={title} src={posterPath} />
              </li>
            </Link>
          )
        })}
      </Slider>
    )
  }
}

export default SliderMovies

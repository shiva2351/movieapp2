import {Component} from 'react'
import Cookies from 'js-cookie'
import * as Loader from 'react-loader-spinner'

import Footer from '../Footer'
import HeaderRoute from '../HeaderRoute'
import SliderMovies from '../SliderMovies'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    initialPoster: {},
    trendList: [],
    originList: [],
    topList: [],
    topStatus: apiStatusConstants.initial,
    trendStatus: apiStatusConstants.initial,
    originStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.gettrendData()
    this.getOriginData()
    this.gettopData()
  }

  gettrendData = async () => {
    this.setState({trendStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const response = await fetch(apiUrl, options)
    const resData = await response.json()
    if (response.ok) {
      console.log(resData.results, 'll')
      const updateData = resData.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        trendList: updateData,
        trendStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({trendStatus: apiStatusConstants.failure})
    }
  }

  gettopData = async () => {
    this.setState({trendStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const apiUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const response = await fetch(apiUrl, options)
    const resData = await response.json()
    if (response.ok) {
      const updateData = resData.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))

      this.setState({
        topList: updateData,
        topStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({topStatus: apiStatusConstants.failure})
    }
  }

  getOriginData = async () => {
    this.setState({originStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const response = await fetch(apiUrl, options)
    const resData = await response.json()
    if (response.ok) {
      const updateData = resData.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      const randomPoster =
        updateData[Math.floor(Math.random() * updateData.length)]

      this.setState({
        initialPoster: randomPoster,
        originList: updateData,
        originStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({originStatus: apiStatusConstants.failure})
    }
  }

  homeLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader.TailSpin type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  trendFailView = () => (
    <div>
      <img
        alt="failure view"
        src="https://res.cloudinary.com/delrn2vxa/image/upload/v1701568008/Icon_by75tf.png"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.gettrendData} type="button">
        Try Again
      </button>
    </div>
  )

  originFailView = () => (
    <div>
      <img
        alt="failure view"
        src="https://res.cloudinary.com/delrn2vxa/image/upload/v1701568008/Icon_by75tf.png"
      />

      <p>Something went wrong. Please try again</p>
      <button onClick={this.getOriginData} type="button">
        Try Again
      </button>
    </div>
  )

  renderTrendView = () => {
    const {trendStatus, trendList} = this.state
    switch (trendStatus) {
      case apiStatusConstants.success:
        return <SliderMovies movieList={trendList} />
      case apiStatusConstants.inProgress:
        return this.homeLoader()
      case apiStatusConstants.failure:
        return this.trendFailView()

      default:
        return null
    }
  }

  renderTopView = () => {
    const {topStatus, topList} = this.state
    switch (topStatus) {
      case apiStatusConstants.success:
        return <SliderMovies movieList={topList} />
      case apiStatusConstants.inProgress:
        return this.homeLoader()
      case apiStatusConstants.failure:
        return this.trendFailView()

      default:
        return null
    }
  }

  renderOriginView = () => {
    const {originStatus, originList} = this.state
    switch (originStatus) {
      case apiStatusConstants.success:
        return <SliderMovies movieList={originList} />
      case apiStatusConstants.inProgress:
        return this.homeLoader()
      case apiStatusConstants.failure:
        return this.originFailView()

      default:
        return null
    }
  }

  renderOverCard = () => {
    const {originList} = this.state
    const {id, overview, title} = originList[0]
    console.log('title')
    return (
      <div className="home-origin-Item" key={id}>
        <h1>{title}</h1>
        <p className="home-over-para">{overview}</p>
        <button className="home-play" type="button">
          Play
        </button>
      </div>
    )
  }

  renderOverView = () => {
    const {originStatus} = this.state

    switch (originStatus) {
      case apiStatusConstants.success:
        return this.renderOverCard()

      case apiStatusConstants.inProgress:
        return this.homeLoader()
      case apiStatusConstants.failure:
        return this.originFailView()
      default:
        return null
    }
  }

  render() {
    const {trendList, initialPoster, originList} = this.state
    console.log(trendList, originList)
    const {backdropPath} = initialPoster
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            height: '100%',
          }}
        >
          <HeaderRoute />
          <div className="home-over-card">{this.renderOverView()}</div>
        </div>

        <div className="home-bottom-card">
          <h1 className="home-heading">Trending Now</h1>
          {this.renderTrendView()}
          <h1 className="home-heading">Top Rated</h1>
          {this.renderTopView()}
          <h1 className="home-heading">Originals</h1>
          {this.renderOriginView()}
        </div>
        <Footer />
      </div>
    )
  }
}
export default HomeRoute

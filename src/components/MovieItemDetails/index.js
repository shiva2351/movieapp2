import {Component} from 'react'
import * as Loader from 'react-loader-spinner'
import {format} from 'date-fns'
import Cookies from 'js-cookie'
import HeaderRoute from '../HeaderRoute'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, movieDetail: {}}

  componentDidMount() {
    this.getMovieDetails()
  }

  mDetailsFail = () => (
    <div>
      <img
        alt="failure view"
        src="https://res.cloudinary.com/delrn2vxa/image/upload/v1701399824/Background-Complete_n7qm9f.png"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.getMovieDetails} type="button">
        Try Again
      </button>
    </div>
  )

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(apiUrl, options)
    const resData = await response.json()
    console.log(resData)
    if (response.ok) {
      const details = resData.movie_details
      const updateRes = {
        adult: details.adult,
        backdropPath: details.backdrop_path,
        budget: details.budget,
        genres: details.genres,
        id: details.id,
        overview: details.overview,
        posterPath: details.poster_path,
        releaseDate: details.release_date,
        runtime: details.runtime,
        similarMovies: details.similar_movies,
        spokenLanguages: details.spoken_languages,
        title: details.title,
        voteAverage: details.vote_average,
        voteCount: details.vote_count,
      }
      console.log(updateRes)
      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetail: updateRes,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  movieLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderGenre = () => {
    const {movieDetail} = this.state
    const {
      genres,
      spokenLanguages,
      budget,
      voteAverage,
      releaseDate,
      voteCount,
    } = movieDetail
    const dd = format(new Date(releaseDate), 'do MMMM u')
    return (
      <>
        <div>
          <h1>Genres</h1>
          <ul>
            {genres.map(eachItem => (
              <li key={eachItem.id}>
                <p>{eachItem.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1>Audio Available</h1>
          <ul>
            {spokenLanguages.map(eachItem => (
              <li key={eachItem.english_name}>
                <p>{eachItem.english_name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1>Rating Count</h1>
          <p>{voteCount}</p>
        </div>
        <div>
          <h1>Rating Average</h1>
          <p>{voteAverage}</p>
        </div>
        <div>
          <h1>Budget</h1>
          <p>{budget}</p>
        </div>
        <div>
          <h1>Release Date</h1>
          <p>{dd}</p>
        </div>
      </>
    )
  }

  successView = () => {
    const {movieDetail} = this.state
    const {
      overview,
      releaseDate,
      backdropPath,
      runtime,
      similarMovies,
      title,
    } = movieDetail
    const kk = new Date(releaseDate)
    const d = format(kk, 'u')

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
          <div>
            <div>
              <h1>{title}</h1>
              <div>
                <p>{runtime}</p>
                <p>U/A</p>
                <p>{d}</p>
              </div>
              <p>{overview}</p>
              <button type="button">Play</button>
            </div>
            <div>{this.renderGenre()}</div>
          </div>
        </div>

        <div>
          <h1>More like this</h1>
          <ul>
            {similarMovies.map(eachItem => (
              <li key={eachItem.id}>
                <img alt={eachItem.title} src={eachItem.poster_path} />
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.inProgress:
        return this.movieLoader()
      case apiStatusConstants.failure:
        return this.mDetailsFail()
      default:
        return null
    }
  }

  render() {
    console.log('movie')
    return this.renderView()
  }
}

export default MovieItemDetails

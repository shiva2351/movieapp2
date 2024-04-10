import {Component} from 'react'
import {Link} from 'react-router-dom'
import * as Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import HeaderRoute from '../HeaderRoute'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchRoute extends Component {
  state = {
    searchList: [],
    apiStatus: apiStatusConstants.initial,
    searchText: '',
  }

  getSearchList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const {searchText} = this.state
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const response = await fetch(apiUrl, options)
    const resData = await response.json()
    if (response.ok) {
      const updateRes = resData.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        title: eachItem.title,
        posterPath: eachItem.poster_path,
      }))
      console.log(updateRes)
      this.setState({
        searchList: updateRes,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  searchLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  searchFail = () => (
    <div>
      <img
        alt="failure view"
        src="https://res.cloudinary.com/delrn2vxa/image/upload/v1701399824/Background-Complete_n7qm9f.png"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.getSearchList} type="button">
        Try Again
      </button>
    </div>
  )

  successView = () => {
    const {searchText} = this.state

    const isEmpty = searchText === ''
    console.log(isEmpty)
    return (
      <div className="search-filter-bg-container">
        {isEmpty ? null : this.renderResultsView()}
      </div>
    )
  }

  renderResultsView = () => {
    const {searchList, searchText} = this.state
    const re =
      searchList.length > 0 ? (
        <>
          <ul className="search-filter-ul-container">
            {searchList.map(eachItem => {
              const {id, title, posterPath} = eachItem
              return (
                <Link to={`/movies/${id}`} key={id}>
                  <li className="search-filter-li-item" key={id}>
                    <img
                      className="search-poster"
                      alt={title}
                      src={posterPath}
                    />
                  </li>
                </Link>
              )
            })}
          </ul>
          <Footer />
        </>
      ) : (
        <div>
          <img
            alt="no movies"
            src="https://res.cloudinary.com/delrn2vxa/image/upload/v1701743922/Group_7394_c6lbyq.png"
          />
          <p>Your search for {searchText} did not find any matches.</p>
        </div>
      )
    return re
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.searchFail()
      case apiStatusConstants.inProgress:
        return this.searchLoader()
      default:
        return null
    }
  }

  searchMovie = text => {
    console.log('ll')
    this.setState({searchText: text})
  }

  render() {
    return (
      <div>
        <HeaderRoute
          isShow="true"
          getSearchList={this.getSearchList}
          searchMovie={this.searchMovie}
        />
        <div>{this.renderView()}</div>
      </div>
    )
  }
}

export default SearchRoute

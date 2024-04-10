import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  console.log('notfound')
  return (
    <div className="notfound-card">
      <h1>Lost Your Way</h1>
      <p>
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button type="button">Go to Home</button>
      </Link>
    </div>
  )
}

export default NotFound

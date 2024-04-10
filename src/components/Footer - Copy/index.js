import {FaGoogle, FaYoutube, FaTwitter, FaInstagram} from 'react-icons/fa'
import './index.css'

const Footer = () => {
  console.log('foot')
  return (
    <div className="foot-card">
      <div className="foot-container">
        <ul className="footer-list">
          <li className="footer-list-item">
            <FaGoogle />
          </li>
          <li className="footer-list-item">
            <FaTwitter />
          </li>
          <li className="footer-list-item">
            <FaInstagram />
          </li>
          <li className="footer-list-item">
            <FaYoutube />
          </li>
        </ul>
        <p className="foot-para">Contact us</p>
      </div>
    </div>
  )
}

export default Footer

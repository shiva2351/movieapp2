import {Component} from "react"
import {Link} from "react-router-dom"
import { IoMdSearch } from "react-icons/io";
import "./index.css"
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class HeaderRoute extends Component{

    getmovies=()=>{

    }
    render(){
        return <nav className="header">
            <ul className="header-ul">
                <li>MovieDb</li>
                <li className="header-li"><ul className="header-ul2">
                <li> <Link to ="/popular"><p>Popular</p></Link></li>
                <li><Link to ="/toprated"><p>TopRated</p></Link></li>
                <li><Link to ="/upcoming"><p>UpComing</p></Link></li>
                    </ul><div className="header-search">
                        <input type="search" placeholder="Movie Name"/>
                        <button><IoMdSearch /></button>
                        </div></li>
            </ul>
        </nav>
    }
}

export default withRouter(HeaderRoute) 
import { Link } from "react-router-dom"

const Header = () => {
    return(
            <header>
                <Link className="m-24" to="/">home</Link>
                <Link className="m-24" to="/login">login</Link>
                <Link className="m-24" to="/issues">issues</Link>
            </header>


    )
}
export default Header
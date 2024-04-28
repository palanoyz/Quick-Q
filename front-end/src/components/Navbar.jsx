import { Link, useNavigate } from "react-router-dom"
import { IoMdSearch } from "react-icons/io";

const Navbar = () => {
    return (
        <nav className="flex py-4 px-10 items-center justify-between">
            <div className="flex items-center">
                <a href="#" className="text-3xl text-primary font-bold pr-20">QuickQ</a>
                <a href="#" className="px-10">Explore</a>
                <IoMdSearch className="text-primary" />
                <input type="text" placeholder="Search" className="border-2 border-primary focus:outline-none rounded-3xl p-0.5 pl-2 w-80" />
            </div>
            <div>
                <button className="text-primary font-semibold border-2 border-primary focus:outline-none rounded-3xl py-0.5 px-5 mr-5 focus:bg-primary focus:text-white">Log in</button>
                <button className="text-primary font-semibold border-2 border-primary focus:outline-none rounded-3xl py-0.5 px-5 focus:bg-primary focus:text-white">Sign up</button>
            </div>
        </nav>
    )
}

export default Navbar
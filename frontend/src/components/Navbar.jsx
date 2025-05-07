import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <nav>
        <div>
            <Link to='/'>note app</Link>
        </div>
        <div>
            <Link to='/login'>login</Link>
            <Link to='/register'>register</Link>
            <Link to='/'>note app</Link>
            <Link to='/'>note app</Link>
            <Link to='/'>note app</Link>
        </div>

    </nav>
  )
}

export default Navbar

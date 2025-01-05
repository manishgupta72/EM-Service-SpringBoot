import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className='flex bg-slate-800 h-16 py-2 justify-between'>
                <h1 className='text-4xl font-bold text-white'>💻 EM Service</h1>
                <div className='py-3 flex text-white font-bold gap-4 mr-5'>
                    <NavLink to="/" className='hover:text-blue-400' href="#">Home</NavLink>
                    <a className='hover:text-blue-400' href="#">Profile</a>
                    
                </div>
            </div>
        </>
    )
}

export default Navbar
import React from 'react'

const Register = () => {
  return (
    <div className='bg-gray-300 h-screen '>
      <div className='border-3'>
      <h3>register</h3>
      <div className=''>
        <input type='text' placeholder='username' className='border-2 border-black'/>
        <input type='email' placeholder='email' className='border-2 border-black'/>
        <input type='contact' placeholder='contact(optional)' className='border-2 border-black'/>
        
        <input type='password' placeholder='password' className='border-2 border-black'/>
      <button className='border-2 border-black'>register</button>
      </div>
      </div>
      
    </div>
  )
}

export default Register

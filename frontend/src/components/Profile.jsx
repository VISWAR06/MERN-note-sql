import React from 'react'

const Profile = () => {
  return (
    <div className='bg-gray-100 h-screen flex items-center justify-center'>
      <div className='bg-white p-12 rounded-xl shadow-xl w-96'>
        <h2 className='text-2xl font-semibold text-center mb-8'>Profile</h2>
        <div className='space-y-6'>
          <p>
            <strong>Username: </strong> username
          </p>
          <p>
            <strong>Email: </strong> email
          </p>
          <p>
            <strong>Contact: </strong> contact
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile

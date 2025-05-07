import React from 'react'

const Dashboard = () => {
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <div className='w-96 rounded-lg shadow-lg p-6 bg-white'>
        <h2 className='text-2xl font-semibold mb-4'>Notes</h2>
        <div className='mb-4'>
          <textarea className='w-full p-2 border border-gray-300 rounded-md' placeholder='Write your note...'></textarea>
          <button className='mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>
            Create Note
          </button>
        </div>
        <div className='space-y-4 mt-80'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, nobis. Culpa mollitia corrupti sequi eaque optio iure minima illo quis, animi perspiciatis modi nisi facere? Ut laborum dignissimos earum reiciendis.
          </p>
          <div className='flex justify-between'>
            <button className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600'>
              Edit
            </button>
            <button className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

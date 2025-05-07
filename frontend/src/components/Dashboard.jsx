import React from 'react';

const Dashboard = () => {
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <div className='w-[600px] rounded-lg shadow-lg p-6 bg-white'>
        <h2 className='text-2xl font-semibold mb-4'>Create Note</h2>
        <textarea
          className='w-full p-2 border border-gray-300 rounded-md h-32 resize-none'
          placeholder='Write your note...'
        ></textarea>
        <button className='mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>
          Create Note
        </button>

        <div className='border-t pt-4 mt-6'>
          <h2 className='text-2xl font-semibold mb-4'>Your Notes</h2>
          <div className='space-y-4 overflow-y-auto max-h-96'>
            <div className='border p-3 rounded-md shadow-sm bg-gray-50'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, nobis...
              </p>
              <div className='flex justify-end gap-2 mt-2'>
                <button className='bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600'>
                  Edit
                </button>
                <button className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

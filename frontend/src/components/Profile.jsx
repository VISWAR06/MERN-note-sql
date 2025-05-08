import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <p className="text-center text-gray-500 py-4">Please login first.</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-12 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-semibold text-center mb-8">Profile</h2>
        <div className="space-y-6">
          <p>
            <strong>Username: </strong> {currentUser.username}
          </p>
          <p>
            <strong>Email: </strong> {currentUser.email}
          </p>
          <p>
            <strong>Contact: </strong> {currentUser.contact || 'Not provided'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
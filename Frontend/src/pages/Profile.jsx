// ProfileDetails.js

import React from 'react';
import { useState } from 'react';
import '../style/Profile.css';

const ProfileDetails = () => {
  
  const initialUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bikeName: 'Mountain Bike',
    profilePicture: '/images/Register.jpg', 
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  

  const handleSave = () => {
    // Perform save logic (e.g., update user data in the database)

    // For now, let's just reset isEditing to false
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  return (
    <div className="profile-details-container">
    <div className="user-details">
      {isEditing ? (
        <div className="profile-picture">
          <input
            type="text"
            value={user.profilePicture}
            onChange={(e) => handleChange('profilePicture', e.target.value)}
            placeholder="Profile Picture URL"
          />
        </div>
      ) : (
        <div className="profile-picture">
          <img src={'/images/contactus.jpg'} alt="Profile" />
        </div>
      )}
        <div>
          <h1>Profile Details</h1>
          
          {!isEditing && (
            <div>
              <button onClick={() => handleEdit()}>Edit</button>
            </div>
          )}
          <div>
            <strong>First Name:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                value={user.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
            ) : (
              user.firstName
            )}
          </div>
          <div>
            <strong>Last Name:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                value={user.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            ) : (
              user.lastName
            )}
          </div>
          <div>
            <strong>Email:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                value={user.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            ) : (
              user.email
            )}
          </div>
          <div>
            <strong>Bike Name:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                value={user.bikeName}
                onChange={(e) => handleChange('bikeName', e.target.value)}
              />
            ) : (
              user.bikeName
            )}
          </div>
          {isEditing && (
            <div>
              <button onClick={() => handleSave()}>Save</button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;

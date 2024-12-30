import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Dash.css';

interface Profile {
  id: number;
  name: string;
  email: string;
  nohash: string;
  role: string;
  status: string;
}

const ManageUsers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profil/get');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const deleteProfile = async (profileId: number) => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this profile? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (confirm.isConfirmed) {
        await axios.delete(`http://127.0.0.1:8000/api/profil/delete/${profileId}`);
        Swal.fire('Deleted!', 'The profile has been deleted.', 'success');
        setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== profileId));
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      Swal.fire('Error!', 'Failed to delete the profile.', 'error');
    }
  };

  const handleViewDetails = (profileId: number) => {
    navigate(`/details/${profileId}`);
  };

  const handleEdit = (profile: Profile) => {
    setCurrentProfile(profile);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentProfile(null);
  };

  const handleSaveChanges = async () => {
    if (currentProfile) {
      try {
        await axios.put(`http://127.0.0.1:8000/api/profil/update/${currentProfile.id}`, currentProfile);
        Swal.fire('Updated!', 'The profile has been updated.', 'success');
        setProfiles((prevProfiles) =>
          prevProfiles.map((profile) =>
            profile.id === currentProfile.id ? currentProfile : profile
          )
        );
        handleModalClose();
      } catch (error) {
        console.error('Error updating profile:', error);
        Swal.fire('Error!', 'Failed to update the profile.', 'error');
      }
    }
  };

  const toggleStatus = () => {
    if (currentProfile) {
      const newStatus = currentProfile.status === 'active' ? 'blocked' : 'active';
      setCurrentProfile({ ...currentProfile, status: newStatus });
    }
  };

  const handleAddProfile = () => {
    navigate('/AddProfile'); // Navigate to the Add Profile component
  };

  return (
    <div className="users-container">
      <SideBar />
      <div className="users-content">
        <button onClick={handleAddProfile} className="add-profile-button">
          Add New Profile
        </button>   <br />
        <br />
        <div className="user-cards-container">
          {profiles.map((profile) => (
            <div className="user-card" key={profile.id}>
              <i
                className="bi bi-person-dash-fill icon_personD"
                onClick={() => deleteProfile(profile.id)}
                style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
              ></i>
              <h2>{profile.name}</h2>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
              <p>Status: {profile.status}</p>
              <div className="actions">
                <i
                  className="bi bi-eye-fill"
                  onClick={() => handleViewDetails(profile.id)}
                  style={{ cursor: 'pointer', color: 'blue' }}
                ></i>
                <i
                  className="bi bi-pen-fill"
                  style={{ cursor: 'pointer', color: 'green' }}
                  onClick={() => handleEdit(profile)}
                ></i>
              </div>
            </div>
          ))}
        </div>
        {/* Modal */}
        {isModalOpen && currentProfile && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Profile</h2>
              <label>
                Name:
                <input
                  type="text"
                  value={currentProfile.name}
                  onChange={(e) =>
                    setCurrentProfile({ ...currentProfile, name: e.target.value })
                  }
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={currentProfile.email}
                  onChange={(e) =>
                    setCurrentProfile({ ...currentProfile, email: e.target.value })
                  }
                />
              </label>
              <label>
                Password:
                <input
                  type="text"
                  value={currentProfile.nohash}
                  onChange={(e) =>
                    setCurrentProfile({ ...currentProfile, nohash: e.target.value })
                  }
                />
              </label>
              <label>
                Status:
                <button
                  onClick={toggleStatus}
                  style={{
                    backgroundColor: currentProfile.status === 'active' ? 'red' : 'green',
                    color: 'white',
                    cursor: 'pointer',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    marginLeft: '10px',
                  }}
                >
                  {currentProfile.status === 'active' ? 'Block' : 'Unblock'}
                </button>
              </label>
              <div className="modal-actions">
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={handleModalClose}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;

import React, { useState, useEffect } from 'react';
import styles from './pages.module.css';
import { userAPI } from '../services/api';
import Toast from '../components/Toast';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data.data);
      setFormData(response.data.data);
    } catch (error) {
      console.error('Failed to load profile:', error);
      setToast({ type: 'error', message: 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await userAPI.updateProfile(formData);
      setProfile(formData);
      setEditing(false);
      setToast({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to update profile' });
    }
  };

  if (loading) return <div className={styles.loading}>Loading profile...</div>;
  if (!profile) return <div className={styles.error}>Profile not found</div>;

  return (
    <div className={styles.profilePage}>
      <h1>My Profile</h1>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>{profile.name?.charAt(0)}</div>
          <div>
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
          </div>
        </div>

        {!editing ? (
          <>
            <div className={styles.profileSection}>
              <h3>Preferences</h3>
              <p>Categories: {profile.preferences?.categories?.join(', ') || 'Not set'}</p>
              <p>Price Range: ${profile.preferences?.priceRange?.min} - ${profile.preferences?.priceRange?.max}</p>
            </div>
            <button onClick={() => setEditing(true)} className={styles.primaryBtn}>
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <div className={styles.profileSection}>
              <h3>Edit Preferences</h3>
              <label>Name</label>
              <input 
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className={styles.profileActions}>
              <button onClick={handleUpdate} className={styles.primaryBtn}>
                Save Changes
              </button>
              <button onClick={() => setEditing(false)} className={styles.secondaryBtn}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {toast && (
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Profile;

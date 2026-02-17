import React, { useState, useEffect } from 'react';
import styles from './pages.module.css';
import { notificationAPI } from '../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getAll();
      setNotifications(response.data.data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationAPI.markAsRead(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await notificationAPI.delete(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  if (loading) return <div className={styles.loading}>Loading notifications...</div>;

  return (
    <div className={styles.notificationsPage}>
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <div className={styles.empty}>
          <p>No notifications</p>
        </div>
      ) : (
        <div className={styles.notificationsList}>
          {notifications.map(notification => (
            <div key={notification._id} className={styles.notificationItem}>
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <span className={styles.date}>{new Date(notification.createdAt).toLocaleDateString()}</span>
              {!notification.read && (
                <button 
                  onClick={() => handleMarkAsRead(notification._id)}
                  className={styles.markBtn}
                >
                  Mark as Read
                </button>
              )}
              <button 
                onClick={() => handleDelete(notification._id)}
                className={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;

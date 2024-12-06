import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Subject } from 'rxjs';
import { environment } from '../config/environment';

const socket = io(environment.SERVER_URL);

const SocketService = () => {
  // Create RxJS Subjects to manage socket events
  const newPostSubject = new Subject();
  const newPostLikesSubject = new Subject();
  const newPostCommentsSubject = new Subject();
  const notificationSubject = new Subject();

  // States to store latest emitted values from socket events
  const [newPost, setNewPost] = useState(null);
  const [newPostLikes, setNewPostLikes] = useState(null);
  const [newPostComments, setNewPostComments] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Initialize socket listeners
    const initializeListeners = () => {
      socket.on('newPost', (post) => {
        newPostSubject.next(post);
      });
      socket.on('newPostComment', (post) => {
        newPostCommentsSubject.next(post);
      });
      socket.on('newPostLike', (post) => {
        newPostLikesSubject.next(post);
      });
      socket.on('notification', (notification) => {
        notificationSubject.next(notification);
      });

      socket.on('error', (error) => {
        newPostSubject.error(error);
      });
    };

    // Call the listener setup
    initializeListeners();

    // Subscribe to the subjects and update state
    const newPostSubscription = newPostSubject.subscribe((post) => {
      setNewPost(post);
    });

    const newPostLikesSubscription = newPostLikesSubject.subscribe((like) => {
      setNewPostLikes(like);
    });

    const newPostCommentsSubscription = newPostCommentsSubject.subscribe(
      (comment) => {
        setNewPostComments(comment);
      }
    );

    const notificationSubscription = notificationSubject.subscribe((notif) => {
      setNotification(notif);
    });

    // Cleanup on component unmount
    return () => {
      newPostSubscription.unsubscribe();
      newPostLikesSubscription.unsubscribe();
      newPostCommentsSubscription.unsubscribe();
      notificationSubscription.unsubscribe();

      // Disconnect socket and cleanup listeners
      socket.off('newPost');
      socket.off('newPostLike');
      socket.off('newPostComment');
      socket.off('notification');
      socket.off('error');
    };
  }, []); // Empty dependency array to ensure setup runs only once on mount

  // Functions to handle socket connection management
  const disconnect = () => socket.disconnect();
  const reconnect = () => socket.connect();

  // Return the observables and utility methods
  return {
    newPostSubject,
    newPostLikesSubject,
    newPostCommentsSubject,
    notificationSubject,
    newPost,
    newPostLikes,
    newPostComments,
    notification,
    disconnect,
    reconnect,
  };
};

export default SocketService;

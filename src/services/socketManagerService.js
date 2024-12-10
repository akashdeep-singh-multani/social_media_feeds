import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import SocketService from './socketService'; // Assuming the SocketService is implemented as shown earlier

const SocketManagerService = () => {
  // Subject streams to handle various socket events
  const newPostReceivedSource = new Subject();
  const newPostLikeReceivedSource = new Subject();
  const newPostCommentReceivedSource = new Subject();
  const notificationReceivedSource = new Subject();

  // State to hold the latest event data
  const [newPost, setNewPost] = useState(null);
  const [newPostLike, setNewPostLike] = useState(null);
  const [newPostComment, setNewPostComment] = useState(null);
  const [notification, setNotification] = useState(null);

  // Access SocketService to handle socket listeners
  const {
    newPostSubject,
    newPostLikesSubject,
    newPostCommentsSubject,
    notificationSubject,
    reconnect,
    disconnect,
  } = SocketService();

  useEffect(() => {
    // Setup subscriptions to RxJS streams when the component mounts
    const newPostSubscription = newPostSubject.subscribe((post) => {
      newPostReceivedSource.next(post);
    });

    const newPostLikeSubscription = newPostLikesSubject.subscribe((like) => {
      newPostLikeReceivedSource.next(like);
    });

    const newPostCommentSubscription = newPostCommentsSubject.subscribe(
      (comment) => {
        newPostCommentReceivedSource.next(comment);
      }
    );

    const notificationSubscription = notificationSubject.subscribe(
      (notificationData) => {
        notificationReceivedSource.next(notificationData);
      }
    );

    // Manage the state updates in the component
    newPostReceivedSource.subscribe((post) => setNewPost(post));
    newPostLikeReceivedSource.subscribe((like) => setNewPostLike(like));
    newPostCommentReceivedSource.subscribe((comment) =>
      setNewPostComment(comment)
    );
    notificationReceivedSource.subscribe((notificationData) =>
      setNotification(notificationData)
    );

    // Cleanup subscriptions when component unmounts
    return () => {
      newPostSubscription.unsubscribe();
      newPostLikeSubscription.unsubscribe();
      newPostCommentSubscription.unsubscribe();
      notificationSubscription.unsubscribe();

      // Disconnect socket and cleanup listeners
      disconnect();
    };
  }, []); // Empty dependency array to only run this on mount/unmount

  // Return the current data and utilities for reconnecting/disconnecting
  return {
    newPost,
    newPostLike,
    newPostComment,
    notification,
    newPostReceivedSource,
    newPostLikeReceivedSource,
    newPostCommentReceivedSource,
    notificationReceivedSource,
    reconnect,
    disconnect,
  };
};

export default SocketManagerService;

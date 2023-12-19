import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { createComment, getCommentsForPost } from './utils/data/commentData';
import { useAuth } from '../utils/context/authContext';
import CommentCard from './commentCard';

const CommentContainer = ({ postId }) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (postId) {
      getCommentsForPost(postId)
        .then((commentsData) => {
          setComments(commentsData);
        })
        .catch((error) => {
          console.error('Error fetching comments:', error);
        });
    }
  }, [postId]);

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentPayload = { author_id: user.id, post_id: postId, content: commentText };
    await createComment(commentPayload);
    setCommentText('');
    // Fetch comments again after submitting a new comment
    getCommentsForPost(postId).then((commentsData) => {
      setComments(commentsData);
    });
  };

  return (
    <div className="comments">
      <input
        value={commentText}
        onChange={handleChange}
        placeholder="Leave a comment!"
        type="textarea"
        className="comment-input"
      />
      <Button size="sm" variant="primary" onClick={handleSubmit}>
        Save
      </Button>
      {/* Render comments */}
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

CommentContainer.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default CommentContainer;

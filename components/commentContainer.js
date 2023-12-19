/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { createComment, getCommentsForPost, updateComment } from './utils/data/commentData';
import { useAuth } from '../utils/context/authContext';
import { getSinglePost } from '../utils/data/postData';

export default function CommentContainer({
  postId,
  comment,
  setEditing,
  setPost,
  handleCommentDelete,
  // eslint-disable-next-line react/prop-types
  comments: initialComments,
}) {
  const [commentText, setCommentText] = useState('');
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments || []);

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
    if (comment && comment.id) {
      updateComment(comment.id, commentPayload)
        .then(() => {
          setEditing(false);
          setCommentText('');
          return getSinglePost(postId).then(setPost);
        });
    } else {
      await createComment(commentPayload);
      setCommentText('');
      getSinglePost(postId).then(setPost);
    }
  };

  return (
    <div className="comments">
      <input
        value={commentText}
        onChange={handleChange}
        placeholder={comment?.id ? `${comment.content}` : 'Leave a comment!'}
        type="textarea"
        className="comment-input"
      />
      <Button size="sm" variant="primary" onClick={handleSubmit}>
        Save
      </Button>
      {comment && comment.id ? (
        <Button variant="danger" onClick={handleCommentDelete}>
          Delete
        </Button>
      ) : (
        ''
      )}
    </div>
  );
}

CommentContainer.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
  }),
  setEditing: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
  handleCommentDelete: PropTypes.func.isRequired,
};

CommentContainer.defaultProps = {
  comment: {
    id: null,
    content: '',
  },
};

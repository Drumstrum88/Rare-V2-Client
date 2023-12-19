import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deleteComment, updateComment } from './utils/data/commentData';

// eslint-disable-next-line react/prop-types
const CommentCard = ({ comment, updateComments }) => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);
  const [comments, setComments] = useState([]);
  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleUpdate = () => {
    const payload = { id: comment.id, content: updatedContent };

    updateComment(payload)
      .then((updatedComment) => {
        const updatedComments = comments.map((c) => (c.id === updatedComment.id ? updatedComment : c));
        setComments(updatedComments);
        setEditing(false);
      })
      .catch((error) => {
        console.error('Error updating comment:', error);
      });
  };

  const handleCommentDelete = (commentId, postId) => {
    if (window.confirm('Delete This Comment?')) {
      deleteComment(commentId)
        .then(() => {
          // Update the parent component's state (updateComments function passed as a prop)
          updateComments(postId);
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
        });
    }
  };

  return (
    <Card className="comment-card">
      <Card.Body>
        {editing ? (
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        ) : (
          <p>{comment.content}</p>
        )}
        <p>Created on: {comment.created_on}</p>
      </Card.Body>
      {user.id === comment.author_id && !editing && (
        <div>
          <Button size="sm" variant="danger" onClick={() => handleCommentDelete(comment.id, comment.post_id)}>
            Delete
          </Button>
          <Button size="sm" variant="primary" onClick={handleEditing}>
            Edit
          </Button>
        </div>
      )}
      {editing && (
        <div>
          <Button size="sm" variant="primary" onClick={handleUpdate}>
            Save
          </Button>
          <Button size="sm" variant="secondary" onClick={handleEditing}>
            Cancel
          </Button>
        </div>
      )}
    </Card>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    post_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    author_id: PropTypes.number.isRequired,
    created_on: PropTypes.string.isRequired,
    updateComments: PropTypes.func.isRequired,
  }).isRequired,
};

export default CommentCard;

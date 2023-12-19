import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

const CommentCard = ({ comment, handleCommentDelete }) => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(!editing);
  };

  return (
    <Card className="comment-card">
      <Card.Body>
        <p>{comment.content}</p>
        <p>Author: {comment.author}</p>
        <p>Created on: {comment.created_on}</p>
      </Card.Body>
      {user.id === comment.author && !editing && (
        <div>
          <Button size="sm" variant="danger" onClick={() => handleCommentDelete(comment.id)}>
            Delete
          </Button>
          <Button size="sm" variant="primary" onClick={handleEditing}>
            Edit
          </Button>
        </div>
      )}
      {editing && (
        <div>
          {/* Render input field or editing form for editing the comment */}
          {/* input field here with an "Update" button to update the comment */}
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
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    created_on: PropTypes.string.isRequired,
  }).isRequired,
  handleCommentDelete: PropTypes.func.isRequired,
};

export default CommentCard;

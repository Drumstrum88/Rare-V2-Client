import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { getSinglePost } from '../utils/data/postData';
import { deleteComment } from './utils/data/commentData';
import CommentContainer from './commentContainer';

const CommentCard = ({ comment, setPost }) => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  const handleCommentDelete = () => {
    if (window.confirm('Delete your comment?')) {
      deleteComment(comment.id)
        .then(() => getSinglePost(comment.post))
        .then(setPost);
    }
  };

  const handleEditing = () => {
    if (editing) {
      setEditing(false);
    }
    setEditing(true);
  };

  return (
    <>
      {!editing ? (
        <>
          <Card className="comment-card">
            <Card.Body>{comment.content}</Card.Body>
            <Card.Body>{/* Include comment author and created_on */}</Card.Body>
            {user.id === comment.author ? (
              <>
                <Button size="sm" variant="danger" onClick={handleCommentDelete}>
                  Delete
                </Button>
                <Button size="sm" variant="primary" onClick={handleEditing}>
                  Edit
                </Button>
              </>
            ) : (
              ''
            )}
          </Card>
        </>
      ) : (
        <CommentContainer
          setPost={setPost}
          postId={comment.post}
          comment={comment}
          setEditing={setEditing}
          handleCommentDelete={handleCommentDelete}
        />
      )}
    </>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.number.isRequired,
    post: PropTypes.number.isRequired,
  }).isRequired,
  setPost: PropTypes.func.isRequired,
};

export default CommentCard;

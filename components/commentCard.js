import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleUser } from './utils/data/userData';

const Comment = ({ obj }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    getSingleUser(obj.author_id).then(setUser);
  }, [obj]);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>

        <Card.Subtitle className="mb-2 text-muted">{user.first_name} {user.last_name}</Card.Subtitle>
        <Card.Text>
          {obj.content}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

Comment.propTypes = {
  obj: {
    author_id: PropTypes.num,
    content: PropTypes.string,
    id: PropTypes.num,
  }.isRequired,
};

export default Comment;

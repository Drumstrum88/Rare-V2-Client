import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Link from 'next/link';
import { deletePost } from '../utils/data/postData';
/* eslint-disable object-curly-newline */
export default function SeePostCard({ postObj, onUpdate }) {
  const deleteThisPost = () => {
    if (window.confirm('Delete this post?')) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  return (
    <div className="post-card-container" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      <Card className="post-card" border="light" style={{ width: '18rem', margin: '10px', color: 'white' }}>
        <h5>Title: {postObj.title}</h5>
        <h6>Date Posted: {postObj.publication_date}</h6>
        <Row className="justify-content-center">
          <Link href={`/posts/${postObj.id}`} passHref>
            <Button className="m-2" variant="success">Details</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisPost} className="m-2">Delete</Button>
          <Link href={`/posts/edit/${postObj.id}`} passHref>
            <Button variant="primary" className="m-2">Edit</Button>
          </Link>
        </Row>
      </Card>
    </div>
  );
}

SeePostCard.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    publication_date: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

// Post details
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { deletePost, getSinglePost } from '../../utils/data/postData';

const ViewPost = () => {
  const router = useRouter();
  const [postDetails, setPostDetails] = useState({});
  const { id } = router.query;

  const deleteThisPost = () => {
    if (window.confirm('Delete This Post?')) {
      deletePost(id).then(() => router.push('/posts'));
    }
  };

  useEffect(() => {
    getSinglePost(id).then((postData) => {
      setPostDetails(postData);
    });
  }, [id]);

  return (
    <>
      <Card className="text-center">
        <Image src={postDetails.image_url} />
        <Card.Title> {postDetails.title}</Card.Title>
        <p>posted on: {postDetails.publication_date}</p>
        <p>{postDetails.content}</p>
        {/* TODO: add comments, categories, tags or whatever to show on post */}
        <Button variant="danger" onClick={deleteThisPost} className="m-2">
          Delete Post
        </Button>
      </Card>
    </>
  );
};

export default ViewPost;

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { deletePost, getSinglePost } from '../../utils/data/postData';
import CommentContainer from '../../components/commentContainer';
import CommentCard from '../../components/commentCard';
import { deleteComment, getCommentsForPost } from '../../components/utils/data/commentData';

const ViewPost = () => {
  const router = useRouter();
  const [postDetails, setPostDetails] = useState({});
  const { id } = router.query;

  const deleteThisPost = () => {
    if (window.confirm('Delete This Post?')) {
      deletePost(id).then(() => router.push('/posts'));
    }
  };

  const refreshPost = () => {
    getSinglePost(id).then((postData) => {
      setPostDetails(postData);
    });
  };

  const handleCommentDelete = () => {
    if (window.confirm('Delete This Comment?')) {
      deleteComment(id).then(() => getCommentsForPost());
    }
  };

  useEffect(() => {
    refreshPost();
  }, [id]);

  return (
    <>
      <Card className="text-center">
        <Image src={postDetails.image_url} />
        <Card.Title>{postDetails.title}</Card.Title>
        <p>posted on: {postDetails.publication_date}</p>
        <p>{postDetails.content}</p>
        <CommentContainer setPost={setPostDetails} postId={id} />
        {postDetails.comments
          && postDetails.comments.map((comment) => (
            <CommentCard
              key={`comment${comment.id}`}
              comment={comment}
              handleCommentDelete={handleCommentDelete}
            />
          ))}
        {/* TODO:categories, tags, or whatever to show on post */}
        <Button variant="danger" onClick={deleteThisPost} className="m-2">
          Delete Post
        </Button>
      </Card>
    </>
  );
};

export default ViewPost;

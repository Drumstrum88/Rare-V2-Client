import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { deletePost, getSinglePost } from '../../utils/data/postData';
import CommentContainer from '../../components/commentContainer';
import { deleteComment, getCommentsForPost } from '../../components/utils/data/commentData';
import CommentCard from '../../components/commentCard';

const ViewPost = () => {
  const router = useRouter();
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = router.query;

  const deleteThisPost = () => {
    if (window.confirm('Delete This Post?')) {
      deletePost(id).then(() => router.push('/posts'));
    }
  };

  const updateComments = () => {
    getCommentsForPost(id)
      .then((commentsData) => {
        const filteredComments = commentsData.filter((comment) => comment.post_id === id);
        setComments(filteredComments);
      })
      .catch((error) => {
        console.error('Error updating comments:', error);
      });
  };

  const handleCommentDelete = (commentId) => {
    if (window.confirm('Delete This Comment?')) {
      deleteComment(commentId)
        .then(() => {
          // Update comments after deletion
          updateComments();
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      getSinglePost(id)
        .then((postData) => {
          setPostDetails(postData);
        })
        .catch((error) => {
          console.error('Trouble fetching post details', error);
        });

      getCommentsForPost(id)
        .then((commentsData) => {
          const filteredComments = commentsData.filter((comment) => comment.post_id === id);
          setComments(filteredComments);
        });
    }
  }, [id]);

  return (
    <>
      <Card className="text-center">
        <Image src={postDetails.image_url} />
        <Card.Title>{postDetails.title}</Card.Title>
        <p>posted on: {postDetails.publication_date}</p>
        <p>{postDetails.content}</p>
        <CommentContainer setPost={setPostDetails} postId={id} />
        {comments.map((comment) => (
          <CommentCard
            comment={comment}
            handleCommentDelete={handleCommentDelete}
            key={`comment${comment.id}`}
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

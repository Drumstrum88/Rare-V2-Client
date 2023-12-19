import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../utils/data/postData';
import PostForm from '../../../components/PostForm';

function EditPost() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setEditPost);
  }, [id]);

  return (<PostForm obj={editPost} />);
}

export default EditPost;

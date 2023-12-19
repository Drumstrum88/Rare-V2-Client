import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getPosts } from '../utils/data/postData';
import SeePostCard from '../components/PostCard';

function PostViewHome() {
  const [posts, setPosts] = useState([]);

  const getAllThePosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllThePosts();
  }, []);

  return (
    <div className="text-center">
      <Link href="/new" passHref>
        <Button className="m-2">Add New Post</Button>
      </Link>
      {posts.map((post) => (
        <SeePostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
      ))}
    </div>
  );
}

export default PostViewHome;

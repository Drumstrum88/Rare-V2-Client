import { useEffect, useState } from 'react';
import { getPosts } from '../utils/data/postData';
import SeePostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);

  const getAllThePosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllThePosts();
  }, []);

  return (
    <div className="posts">
      <div className="logo-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHDWPYbmEzou6oNVMMEZ5u8FPyP5GHLvkFvA&usqp=CAU" alt="logo" />
      </div>
      {posts && posts.map((post) => <SeePostCard postObj={post} onUpdate={getAllThePosts} />)}
    </div>
  );
}

export default Home;

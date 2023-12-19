import { useEffect, useState } from 'react';
import { getPosts } from '../utils/data/postData';
import SeePostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className="posts">
      <div className="logo-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo" src="https://www.craiyon.com/image/79IpA6paSDasjDLwaDQARA" alt="logo" />
        <h1 className="rarev2">Rare Version 2</h1>
      </div>
      {posts && posts.map((post) => <SeePostCard post={post} />)}
    </div>
  );
}

export default Home;

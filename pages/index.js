/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
// import { getAllPosts } from '../utils/data/postData';
// import PostCard from '../components/postCard';

function Home() {
  // const [posts, setPosts] = useState([]);

  useEffect(() => {
    // getAllPosts().then(setPosts);
  }, []);

  return (
    <div className="posts">
      <div className="logo-title">
        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHDWPYbmEzou6oNVMMEZ5u8FPyP5GHLvkFvA&usqp=CAU" />
        <h1 className="rarev2">LinkedOut</h1>
      </div>
      {/* {posts && posts.map((post) => <PostCard post={post} />)} */}
    </div>
  );
}

export default Home;

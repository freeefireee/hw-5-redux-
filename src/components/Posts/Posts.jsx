import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../slice/postsSlice';
import { Link } from 'react-router-dom';
import './posts.css';

const getShortValue = (value, maxLength) => {
  if (value.length > maxLength) {
    return value.substring(0, maxLength) + '...';
  }
  return value;
};

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const handleMoreClick = (postId) => {
    console.log(`Ещё: ${postId}`);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='block-content'>
      {posts.map((post) => (
        <div className='key' key={post.id}>
          <div className="block">
            <div className="text">
              <h1>{post.id}</h1>
              <h2>{post.title}</h2>
              <h4>{getShortValue(post.body, 20)}<Link className='more' to={`/posts/${post.id}`}>More...</Link></h4>
              <div>
                <button className='details' onClick={() => handleMoreClick(post.id)}>
                  <Link to={`/posts/${post.id}`}>Details</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

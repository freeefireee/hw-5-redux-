import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../slice/postsSlice';

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.posts.find((post) => post.id === Number(id)));
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (!post || post.id !== Number(id)) {
      dispatch(fetchPost(id));
    }
  }, [dispatch, id, post]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="block2">
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>
            <button className="button-30" role="button" onClick={handleBack}>
              Назад
            </button>
          </p>
        </div>
      ) : (
        <p>Пост не найден</p>
      )}
    </div>
  );
};

export default PostDetails;

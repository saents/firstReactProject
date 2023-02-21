import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});

  // eslint-disable-next-line no-unused-vars
  const [comments, setComments] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data);
  });

  // eslint-disable-next-line no-unused-vars
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div key={params.id}>
      <h1>Вы открыли страницу поста с ID = {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>
        Комментарии
      </h1>
        {isComLoading
          ? <Loader/>
          : <div>
            {comments.map(comm => 
              <div key={comm.id} style={{marginTop: '15px'}}>
                <h5 key={comm.email}>{comm.email}</h5>
                <p key={comm.body}>{comm.body}</p>
              </div>
            )}
          </div>
        }
    </div>
  );
};

export default PostIdPage;

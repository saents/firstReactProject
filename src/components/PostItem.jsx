import React from "react";
import MyButton from "./UI/button/MyButton";
import {useNavigate} from 'react-router-dom';

const PostItem = (props) => {
  const router = useNavigate()
  return (
    <div className='post'>
      <div className='post-content'>
        <h1>
          {props.post.id}. {props.post.title}
        </h1>
        <div>
          <p>{props.post.body}</p>
        </div>
      </div>
      <div className='post-btns'>
        <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Открыть</MyButton>
        <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;

import React, { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/Loader/Loader";
import MyModal from "../components/UI/MyModal/MyModal";
import Pagintation from "../components/UI/pagination/Pagintation";
import MySelect from "../components/UI/select/MySelect";
import { getPagesCount } from "../components/utils/pages";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { usePosts } from "../hooks/usePosts";
import "../styles/App.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPagesCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className='App'>
        <MyButton
          style={{ marginTop: "30px" }}
          onClick={() => setModal(true)}>
          Создать пост
        </MyButton>
        <MyModal
          visible={modal}
          setVisible={setModal}>
          <PostForm create={createPost} />
        </MyModal>
        <hr style={{ margin: "15px 0" }} />
        <PostFilter
          filter={filter}
          setFilter={setFilter}
        />
        <MySelect
          value={limit}
          onChange={value => setLimit(value)}
          defaultValue='Кол-во элементов на странице'
          options={[
            {value: 5, name: '5'}, 
            {value: 10, name: '10'}, 
            {value: 25, name: '25'},
            {value: -1, name: 'Показать все'}
          ]}
        />
        {postError && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>Произошла ошибка ${postError.response.status}!</h1>
          </div>
        )}
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title={"Список постов 1"}
        />
        <div
          ref={lastElement}
          style={{ height: 20, background: "transparent" }}></div>
        {isPostLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 50,
            }}>
            <Loader />
          </div>
        )}
        <Pagintation
          page={page}
          changePage={changePage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default Posts;

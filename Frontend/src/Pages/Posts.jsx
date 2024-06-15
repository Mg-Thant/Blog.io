import { json, useLoaderData } from "react-router-dom";
import PostItem from "../Components/PostItem";

const Posts = () => {
  const posts = useLoaderData();

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <PostItem post={post} key={post.id} />)}
    </>
  );
};

export default Posts;

export const loader = async () => {
  const res = await fetch("http://localhost:8080/posts");
  if (!res.ok) {
    throw json({
      message: "Can't get our posts. Come back later",
    });
  } else {
    const resData = await res.json();
    return resData.posts;
  }
};

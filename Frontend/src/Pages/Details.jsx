import React from 'react'
import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import PostDetails from '../Components/PostDetails';

const Details = () => {
    const post = useRouteLoaderData("post-detail");

  return (
    <section>
      <PostDetails post={post} />
    </section>
  )
}

export default Details;

export const loader = async ({request , params}) => {
    const res = await fetch(`http://localhost:8080/posts/${params.id}`);
    if(!res.ok) {
      throw json({message : "Not Found"})
    } else {
        const data = await res.json();
        return data.post;
    }
}

export const action = async ({request, params}) => {
  const res = await fetch(`http://localhost:8080/posts/${params.id}`, {
    method : request.method
  })

  if(!res.ok) {
    // error handling
    console.log(res)
    throw json({message : "Failed to delete"})  
  } else {
    return redirect("/");
  }
}

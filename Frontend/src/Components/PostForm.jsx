import React from "react";
import { Form, Link, json, redirect, useActionData } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import uuid from "react-uuid";

const PostForm = ({ header, btnText, oldData, method }) => {
  const data = useActionData();

  return (
    <section className="form-section">
      <div className="details-header">
        <p>{header}</p>
        <Link to={"/"}>
          <ArrowLeftIcon className="arrow-left-icon" />
        </Link>
      </div>
      <Form method={method}>
        <div className="form-input">
          {data?.errors?.title && <p className="error">{data.errors.title}</p>}
          <label htmlFor="form-title">Title</label>
          <input
            type="text"
            id="form-title"
            name="title"
            defaultValue={oldData ? oldData.title : ""}
          />
        </div>

        <div>
          {data?.errors?.image && <p className="error">{data.errors.image}</p>}
          <label htmlFor="form-image">Image Url</label>
          <input
            type="url"
            id="form-image"
            name="image"
            defaultValue={oldData ? oldData.image : ""}
          />
        </div>
        <div>
          {data?.errors?.date && <p className="error">{data.errors.date}</p>}
          <label htmlFor="form-date">Date</label>
          <input
            type="date"
            id="form-date"
            name="date"
            defaultValue={oldData && oldData.date}
          />
        </div>
        <div>
          {data?.errors?.description && <p className="error">{data.errors.description}</p>}
          <label htmlFor="form-description">Description</label>
          <textarea
            name="description"
            id="form-description"
            cols="20"
            rows="3"
            defaultValue={oldData ? oldData.description : ""}
          ></textarea>
        </div>
        <button type="submit" className="btn">
          {btnText}
        </button>
      </Form>
    </section>
  );
};

export default PostForm;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const method = request.method;
  const postData = {
    id: uuid(),
    title: data.get("title"),
    description: data.get("description"),
    image: data.get("image"),
    date: data.get("date"),
  };

  let url = "http://localhost:8080/posts";
  if (method === "PATCH") {
    const id = params.id;
    url = `http://localhost:8080/posts/${id}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  console.log(response)

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Post can't load. Try again later" });
  } else {
    return redirect("/");
  }
};

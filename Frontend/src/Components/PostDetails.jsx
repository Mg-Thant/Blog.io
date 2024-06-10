import { CalendarDaysIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, useSubmit } from "react-router-dom";

const PostDetails = ({ post }) => {
  const { title, description, date, image } = post;
  const submit = useSubmit();

  const postDeleteHandler = () => {
    const confirmStatus = window.confirm(
      "Are you sure want to delete this post?"
    );

    if (confirmStatus) {
      submit(null, {
        method: "DELETE",
      });
    } else {
      return ;
    }
  };

  return (
    <section className="details">
      <div className="details-header">
        <div>
          <p className="details-title">{title}</p>
          <p className="date">
            <CalendarDaysIcon className="clock-icon" /> <span>{date}</span>
          </p>
        </div>
        <Link to={"/"}>
          <ArrowLeftIcon className="arrow-left-icon" />
        </Link>
      </div>
      <img src={image} alt={title} />
      <p className="description">{description}</p>
      <div className="details-footer">
        <Link to={`edit-post`}>
          <p className="btn sm">Edit</p>
        </Link>
        <p className="btn sm" onClick={postDeleteHandler}>
          Delete
        </p>
      </div>
      <hr />
    </section>
  );
};

export default PostDetails;
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="error">
      {error.data ? (
        <>
          <h1>{error.data.message}</h1>
          <Link to={"/"}>
            <button className="button">Home</button>
          </Link>
        </>
      ) : (
        <h1>Something went wrong. Please check your url</h1>
      )}
    </div>
  );
};

export default Error;

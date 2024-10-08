import { useRouteError, NavLink } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <main className="main--error">
      <div className="error__wrapper">
        <div className="error__message">
          <h2>Oops!</h2>
          <h3>Something when wrong.</h3>
          <p className="error">
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
        <div className="error__link">
          <p>In the meanwhile</p>
          <NavLink to={`${import.meta.env.BASE_URL}/`} className={`button button--primary error__button`}>relax and explore some artworks</NavLink>
        </div>
      </div>
    </main>
  );
}

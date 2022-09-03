import React, {Fragment} from "react";
import { Link } from "react-router-dom";

export default function NavBar({
  linkName = "",
  link = "",
  pageName = "",
}) {
  const multi = (
    // for embedded paths (home/link/current page)
    <Fragment>
      <li className="breadcrumb-item">
        <Link to={link}>{linkName}</Link>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
        {pageName}
      </li>
    </Fragment>
  );
  const current = (
    //for a single path (home/current page)
    <li className="breadcrumb-item active" aria-current="page">
      {pageName}
    </li>
  );
  return (
    <nav className="w-100" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item text-secondary">
          <Link to={"/"}>
            <i className="fa-solid fa-house-chimney"></i> Home
          </Link>
        </li>
        {link !== "" ? multi : current}
      </ol>
    </nav>
  );
}
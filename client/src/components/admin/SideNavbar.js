import { Link } from "react-router-dom";
import {
  Grid1x2Fill,
  HouseDoorFill,
  ListTask,
  PeopleFill,
  TagFill,
  ViewStacked,
} from "react-bootstrap-icons";

function Sidebar() {
  return (
    <>
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark mt-4 ">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-5 d-none d-sm-inline">Menu</span>
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start "
            id="menu"
          >
            <li className="nav-item">
              <Link
                to={"/admin"}
                className="nav-link align-middle px-0 text-white"
              >
                <HouseDoorFill />{" "}
                <span className="ms-1 d-none d-sm-inline ">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin"}
                className="nav-link px-0 align-middle text-white"
              >
                <Grid1x2Fill />{" "}
                <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/orders"}
                className="nav-link px-0 align-middle text-white"
              >
                <ListTask />{" "}
                <span className="ms-1 d-none d-sm-inline">Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/products"}
                className="nav-link px-0 align-middle text-white"
              >
                <TagFill />{" "}
                <span className="ms-1 d-none d-sm-inline">Products</span>{" "}
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/categories"}
                className="nav-link px-0 align-middle text-white"
              >
                <ViewStacked />{" "}
                <span className="ms-1 d-none d-sm-inline">Category</span>{" "}
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/customers"}
                className="nav-link px-0 align-middle text-white"
              >
                <PeopleFill />{" "}
                <span className="ms-1 d-none d-sm-inline">Customers</span>{" "}
              </Link>
            </li>
          </ul>
          <hr />
        </div>
      </div>
    </>
  );
}

export default Sidebar;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios.get("https://localhost:7258/UserProfiles").then((res) => {
        console.log("user details", res.data);
        setCustomers(res.data);
      });
    } catch (err) {
      console.log("user details fetching failed", err);
    }
  }, []);
  const backToHome = () => {
    navigate("/admin");
  };
  return (
    <>
      <div className="col py-3 mt-4">
        <div className="d-flex justify-content-between">
          <div>
            <h2>Registered Users</h2>
          </div>
          <div className="">
            <button type="button" className="btn btn-success btn-md">
              Edit
            </button>
          </div>
        </div>
        <div className="card">
          <div
            className="table-responsive card-body p-4"
            style={{ height: "60vh" }}
          >
            {customers && (
              <>
                <table className="table table-primary table-striped table-hover table-responsive-md table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sl No</th>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Date of Birth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((user, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.dateOfBirth}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div className="card-body shadow p-1">
            <button
              type="button"
              className="btn btn-secondary btn-md"
              onClick={backToHome}
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Customers;

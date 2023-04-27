import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

function CategoryCreate() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data to be submitted", data);
    try{
        axios.post("https://localhost:7258/api/Category",data)
        .then(res => {
            console.log("result after adding category",res)
        })
    }
    catch(error){
        console.log("error while adding new category",error);
    }
  };
  return (
    <>
      <div className="col py-3 mt-4">
        <div className="card">
          <div className="table-responsive card-body p-4"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <table className="table table-light table-striped table-hover table-responsive-md table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Desciption</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="form-group mb-3">
                      <label htmlFor="exampleFormControlInput1">
                        Category Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="eg.Adidas T-shirt"
                        {...register("name", {
                          required: "required field",
                          minLength: {
                            value: 4,
                            message:
                              "Product title should have a minimum of 5 characters",
                          },
                        })}
                      />
                      <p className="text-danger">{errors.name?.message}</p>
                    </div>
                  </td>
                  <td>
                    <div className="form-group mb-3">
                      <label htmlFor="exampleFormControlTextarea1">
                        Enter Description
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        {...register("description", {
                          required: "required field",
                          minLength: {
                            value: 25,
                            message:
                              "Description filed should have a minimum of 25 characters",
                          },
                        })}
                      ></textarea>
                      <p className="text-danger">
                        {errors.description?.message}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div
                      className="btn-group text-dark"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" className="btn btn-secondary">
                        cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
}

export default CategoryCreate;

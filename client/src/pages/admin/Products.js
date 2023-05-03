import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCreate from "../../components/admin/ProductCreate";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { errorAlert } from "../../components/SweetAlert";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [editProductId, setEditProductId] = useState(null);
  const [category, setCategory] = useState([]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    try {
      axios.get("https://localhost:7258/api/Category").then((res) => {
        console.log("categories from prod pahge", res.data);
        setCategory(res.data);
      });
    } catch (error) {
      console.log("error while fetching categories in prod page", error);
    }
    getProducts();
  }, []);

  const getProducts = () => {
    try {
      axios.get("https://localhost:7258/api/Product").then((res) => {
        console.log("result for prod fetch", res.data);
        setProducts(res.data);
      });
    } catch (err) {
      console.log("product fetching failed", err);
    }
  };

  const deleteProduct = async (id) => {
    console.log("product to be del", id);
    const deleteProdAlert = errorAlert("Deleting this product can cause many alterations in database. Do you wish to continue","warning","Product Removed from the Database");
    deleteProdAlert.then(async (res) => {
      if(!res){
        console.log("deleting product");
        return;
      }
      else {
        try{
          await axios
          .delete(`https://localhost:7258/api/Product/${id}`)
          .then((res) => {
            console.log("deleted Product successfully", res);
            // toast.success("Product removed from database", {
            //   position: toast.POSITION.TOP_CENTER,
            // });
            getProducts();
          })
        }
        catch(err){
          console.log("deletion failed", err);
        }
      }
    })
    // if (!window.confirm("Are you sure to delete this Product?")) {
    //   console.log("deleting product");
    //   return;
    // } else {
    //   try{
    //     await axios
    //     .delete(`https://localhost:7258/api/Product/${id}`)
    //     .then((res) => {
    //       console.log("deleted Product successfully", res);
    //       toast.success("Product removed from database", {
    //         position: toast.POSITION.TOP_CENTER,
    //       });
    //       getProducts();
    //     })
    //   }
    //   catch(err){
    //     console.log("deletion failed", err);
    //   }
    // }
  };

  const editProduct = async (id) => {
    setEditProductId(id);
  };

  const cancelEdit = async () => {
    setEditProductId(null);
    window.location.reload(1);
  }

  const onSubmit = async (data) => {
    console.log("updated data", data);
    try {
      await axios.put(`https://localhost:7258/api/Product/${editProductId}`, data).then((res) => {
        console.log("product details successfully updated", res);
        if(res.status === 200){
          toast.success("Product details updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setEditProductId(null);
        window.location.reload();
      });
      
    } catch (err) {
      console.log("product updation failed", err);
    }
  };

  const backToHome = () => {
    navigate("/admin");
  };
  return (
    <>
      <div className="col py-3 mt-4">
        <div className="d-flex justify-content-between">
          <div>
            <h2>Products</h2>
          </div>
          <div className="">
            <ProductCreate
              onAddProduct={(product) => setProducts([...products, product])}
            />
          </div>
        </div>
        <div className="card">
          <div
            className="table-responsive card-body p-4"
            style={{ height: "70vh" }}
          >
            {products && (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <table className="table table-light table-striped table-hover table-responsive-md table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Sl No</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Desciption</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              {editProductId === item.id ? (
                                <>
                                  <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlInput1">
                                      image url
                                    </label>
                                    <input
                                      type="text"
                                      defaultValue={item.imageUrl}
                                      className="form-control"
                                      id="exampleFormControlInput1"
                                      placeholder="eg.https://fakestoreapi.com/img/Tshirt.jpg"
                                      {...register("imageUrl", {
                                        required: "required field",
                                        minLength: {
                                          value: 10,
                                          message: "Proper url should be given",
                                        },
                                      })}
                                    />
                                    <p className="text-danger">
                                      {errors.imageUrl?.message}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <img
                                    src={item.imageUrl}
                                    className="img-fluid rounded-3"
                                    alt={item.name}
                                    style={{ width: "65px" }}
                                  />
                                </>
                              )}
                            </td>
                            <td>
                              {editProductId === item.id ? (
                                <>
                                  <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlInput1">
                                      Product Title
                                    </label>
                                    <input
                                      type="text"
                                      defaultValue={item.name}
                                      className="form-control"
                                      id="exampleFormControlInput1"
                                      placeholder="eg.Adidas T-shirt"
                                      {...register("name", {
                                        required: "required field",
                                        minLength: {
                                          value: 5,
                                          message:
                                            "Product title should have a minimum of 5 characters",
                                        },
                                      })}
                                    />
                                    <p className="text-danger">
                                      {errors.name?.message}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>{item.name}</>
                              )}
                            </td>
                            <td>
                              {editProductId === item.id ? (
                                <>
                                  <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlSelect1">
                                      Select Category
                                    </label>
                                    <select
                                      className="form-control"
                                      id="exampleFormControlSelect1"
                                      {...register("categoryId", {
                                        required: "required field",
                                        min: {
                                          value: 1,
                                          message:
                                            "select a category from list",
                                        },
                                      })}
                                    >
                                      {category &&
                                        category.map((category, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={category.id}
                                            >
                                              {category.name}
                                            </option>
                                          );
                                        })}
                                    </select>
                                    <p className="text-danger">
                                      {errors.categoryId?.message}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>{item.category.name}</>
                              )}
                            </td>
                            <td>
                              {editProductId === item.id ? (
                                <>
                                  <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlTextarea1">
                                      Enter Description
                                    </label>
                                    <textarea
                                      className="form-control"
                                      id="exampleFormControlTextarea1"
                                      defaultValue={item.description}
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
                                </>
                              ) : (
                                <>
                                  <span
                                    className="d-inline-block text-truncate"
                                    style={{ maxWidth: "150px" }}
                                  >
                                    {item.description}
                                  </span>
                                </>
                              )}
                            </td>
                            <td>
                              {editProductId === item.id ? (
                                <>
                                  <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlInput1">
                                      Price
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      defaultValue={item.price}
                                      id="exampleFormControlInput1"
                                      placeholder="eg.50.99"
                                      {...register("price", {
                                        required: "required field",
                                        min: {
                                          value: 1,
                                          message:
                                            "minimum price value should 1",
                                        },
                                      })}
                                    />
                                    <p className="text-danger">
                                      {errors.price?.message}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>{item.price}</>
                              )}
                            </td>
                            <td>
                              {editProductId === item.id ? (
                                <>
                                  <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlInput1">
                                      Quantity
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      defaultValue={item.quantity}
                                      id="exampleFormControlInput1"
                                      placeholder="eg. 100"
                                      {...register("quantity", {
                                        required: "required field",
                                        min: {
                                          value: 1,
                                          messsage:
                                            "Product quantity should be greater than 1",
                                        },
                                      })}
                                    />
                                    <p className="text-danger">
                                      {errors.quantity?.message}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>{item.quantity}</>
                              )}
                            </td>
                            <td>
                              {editProductId === item.id ? (
                                <>
                                  <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlInput1">
                                      Rating
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      defaultValue={item.rating}
                                      id="exampleFormControlInput1"
                                      placeholder="eg.3.5"
                                      {...register("rating", {
                                        required: "required field",
                                        min: {
                                          value: 1,
                                          message:
                                            "minimum value for rating should be 1",
                                        },
                                        max: {
                                          value: 5,
                                          message:
                                            "maximum value for rating should be 5",
                                        },
                                      })}
                                    />
                                    <p className="text-danger">
                                      {errors.rating?.message}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>{item.rating}</>
                              )}
                            </td>
                            <td>
                              {editProductId === item.id ? (
                                <>
                                  <div
                                    className="btn-group text-dark"
                                    role="group"
                                    aria-label="Basic example"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={cancelEdit}
                                    >
                                      cancel
                                    </button>
                                    {/* <ProductEdit prodId={item.id}/> */}
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="btn-group text-dark"
                                    role="group"
                                    aria-label="Basic example"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-outline-success"
                                      onClick={() => {
                                        editProduct(item.id);
                                      }}
                                    >
                                      <PencilFill />
                                    </button>
                                    {/* <ProductEdit prodId={item.id}/> */}
                                    <button
                                      type="button"
                                      className="btn btn-outline-danger"
                                      onClick={() => {
                                        deleteProduct(item.id);
                                      }}
                                    >
                                      <TrashFill />
                                    </button>
                                  </div>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </form>
              </>
            )}
          </div>
          <div className="card-body shadow p-2">
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
export default Products;

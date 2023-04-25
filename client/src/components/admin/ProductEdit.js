import axios from "axios";
import React, { useEffect, useState } from "react";
import { PencilFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductEdit(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("id jwhbcuvcvuvcu",props.prodId)
    try {
      axios.get("https://localhost:7258/api/Category").then((res) => {
        console.log("categories", res.data);
        setCategory(res.data);
      });
    } catch (error) {
      console.log("error while fetching categories", error);
    }
    getProductDetails(props.prodId);
  }, []);

  const getProductDetails = async (id) =>{
    try{
        await axios.get(`https://localhost:7258/api/Product/ProductById/${id}`)
        .then(res => {
            console.log("Product by id",res);
        })
    }
    catch(err){
        console.log("product fetching failed",err)
    }
  }

  const onSubmit = async (data) => {
    handleClose();
    console.log("new prod data", data);
    try {
      await axios
        .post("https://localhost:7258/api/Product", data)
        .then((res) => {
          console.log("product successfully created", res);
          if (res.status === 200) {
            toast.success("Product added successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/admin/products");
          }
        });
    } catch (err) {
      console.log("product addition failed", err);
    }
  };

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        <PencilFill/>
      </Button>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Updation</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="p-4">
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlInput1">Product Title</label>
                <input
                  type="text"
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
                <p className="text-danger">{errors.name?.message}</p>
              </div>
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
                <p className="text-danger">{errors.description?.message}</p>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlSelect1">
                  Select Category
                </label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  {...register("categoryId", {
                    required: "required field",
                    min: { value: 1, message: "select a category from list" },
                  })}
                >
                  <option value={0}>Select a Category</option>
                  {category &&
                    category.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
                <p className="text-danger">{errors.categoryId?.message}</p>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlInput1">ImageUrl</label>
                <input
                  type="text"
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
                <p className="text-danger">{errors.imageUrl?.message}</p>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlInput1">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="eg.50.99"
                  {...register("price", {
                    required: "required field",
                    min: { value: 1, message: "minimum price value should 1" },
                  })}
                />
                <p className="text-danger">{errors.price?.message}</p>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlInput1">Rating</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="eg.3.5"
                  {...register("rating", {
                    required: "required field",
                    min: {
                      value: 1,
                      message: "minimum value for rating should be 1",
                    },
                    max: {
                      value: 5,
                      message: "maximum value for rating should be 5",
                    },
                  })}
                />
                <p className="text-danger">{errors.rating?.message}</p>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlInput1">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="eg. 100"
                  {...register("quantity", {
                    required: "required field",
                    min: {
                      value: 1,
                      messsage: "Product quantity should be greater than 1",
                    },
                  })}
                />
                <p className="text-danger">{errors.quantity?.message}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ProductEdit;

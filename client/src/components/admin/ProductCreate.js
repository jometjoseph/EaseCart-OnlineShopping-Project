import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ProductCreate() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    try {
      axios.get("https://localhost:7258/api/Category").then((res) => {
        console.log("categories", res.data);
        setCategory(res.data);
      });
    } catch (error) {
      console.log("error while fetching categories", error);
    }
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        +Add New Product
      </Button>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-4">
            <form>
              <div class="form-group mb-3">
                <label for="exampleFormControlInput1">Product Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="eg.Adidas T-shirt"
                />
              </div>
              <div class="form-group mb-3">
                <label for="exampleFormControlTextarea1">
                  Enter Description
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <div class="form-group mb-3">
                <label for="exampleFormControlSelect1">Select Category</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  {category &&
                    category.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div class="form-group mb-3">
                <label for="exampleFormControlInput1">ImageUrl</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="eg.https://fakestoreapi.com/img/Tshirt.jpg"
                />
              </div>
              <div class="form-group mb-3">
                <label for="exampleFormControlInput1">Price</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="eg.50.99"
                />
              </div>
              <div class="form-group mb-3">
                <label for="exampleFormControlInput1">Rating</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="eg.3.5"
                />
              </div>
              <div class="form-group mb-3">
                <label for="exampleFormControlInput1">Quantity</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="eg. 100"
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductCreate;

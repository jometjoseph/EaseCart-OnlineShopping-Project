import axios from "axios";
import { useEffect, useState } from "react";
import { TrashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryCreate from "../../components/admin/CategoryCreate";
import Button from "react-bootstrap/esm/Button";
import React from 'react'
import Swal from 'sweetalert2'

function Category() {
  const [productCategory, setProductCategory] = useState([]);
  const navigate = useNavigate();
  const [addnewCategory,setAddNewCategory] = useState(false)
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    try {
        axios.get("https://localhost:7258/api/Category").then((res) => {
          console.log("user details", res.data);
          setProductCategory(res.data);
        });
      } catch (err) {
        console.log("user details fetching failed", err);
      }
  }
  const deleteAlert = async (id) => {
		Swal.fire({
			title: 'Do you want to proceed with this action? (hint: Deleting this category can cause many alterations in database)',
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: "OK",
			cancelButtonText: "Cancel",
			icon: 'warning'
		}
		).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {

				Swal.fire('Continue with delete process', '', 'success').then(res => {
          if(res.isConfirmed){
            try{
           axios
            .delete(`https://localhost:7258/api/Category/`,{params: {
              id: id
            }})
            .then((res) => {
              console.log("deleted category successfully", res);
              toast.success("Deleted category and products ", {
                position: toast.POSITION.TOP_CENTER,
              });
              getCategory();
            })
          }
          catch(err){
              console.log("deletion failed", err);
          }
          }
        })

			} 
      else
				Swal.fire(' Process Cancelled', '', 'error')

		})
	}
  // const deleteCategory = async (id) => {
  //   console.log("product to be del", id);
  //     if (window.confirm("Do you want to proceed with this action? (hint: Deleting this category can cause many alterations in database)")) {
  //       console.log("continuing to delete category");
  //       toast.warning("Deleting a category can cause deletion of all the products belongong to that category ", {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       await continueDelete(id);
  //     }
  //     else{
  //       return;
  //     }
    
  // };
  // const continueDelete = async (id) => {
  //   if (!window.confirm("Are you sure to delete this Category?")) {
  //       console.log("deleting category");
  //       return;
  //     } else {
  //       try{
  //           await axios
  //         .delete(`https://localhost:7258/api/Category/${id}`)
  //         .then((res) => {
  //           console.log("deleted category successfully", res);
  //           toast.success("Deleted category and products ", {
  //             position: toast.POSITION.TOP_CENTER,
  //           });
  //           getCategory();
  //         })
  //       }
  //       catch(err){
  //           console.log("deletion failed", err);
  //       }
  //     }
  // }

  const addCategory = () => {
    setAddNewCategory(true)
  }

  const backToHome = () => {
    navigate("/admin");
  };
  return (
    <>
    
      <div className="col py-3 mt-4">
        <div className="d-flex justify-content-between">
          
        </div>
        {addnewCategory === true ? <div>
            <h2>Adding New Category</h2>
        <CategoryCreate/> </div> : <div className="d-flex justify-content-between">
        <div>
            <h2>Product Categories</h2>
          </div>
          <div>
            <Button variant="primary" onClick={addCategory}>+Add New Category</Button>
            </div>
        </div>}
        <div className="card">
          <div
            className="table-responsive card-body p-4"
            style={{ height: "60vh" }}
          >
            {productCategory && (
              <>
                <table className="table table-primary table-striped table-hover table-responsive-md table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sl No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Desciption</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productCategory.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>
                          <button
                                      type="button"
                                      className="btn btn-outline-danger"
                                      onClick={() => {
                                        deleteAlert(item.id);
                                      }}
                                    >
                                      <TrashFill />
                                    </button>
                          </td>
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
export default Category;

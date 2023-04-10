import { useEffect, useState } from 'react';
import './Product.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Product(){
  const navigate = useNavigate();
    const [product,setProduct] = useState("");
    const { id } = useParams();
    useEffect(() => {
        console.log("productid is ",id);
       try{
        axios.get(`https://localhost:7258/api/Product/ProductById/${id}`)
        .then(res => {
            console.log("result ",res);
            setProduct(res.data.result);
            console.log("product",product);
            console.log("product name",product.name);
        })
       }
       catch(err){
        console.log("error is",err);
       }
    }, []);
    
    const backToHome = () =>{
      navigate('/home');
    } 
    return(
        <>
<section class="py-5">
  <div class="container">
    <div class="row gx-5">
      <aside class="col-lg-6">
        <div class="border rounded-4 mb-3 d-flex justify-content-center">
          <a data-fslightbox="mygalley" class="rounded-4" target="" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp">
            <img style={{maxWidth: "100%", maxHeight: "90vh", margin: "auto"}} class="rounded-4 fit" src={product.imageUrl} alt="" />
          </a>
        </div>
      </aside>
      <main class="col-lg-6">
        <div class="ps-lg-3">
          <h4 class="title text-dark">
             {product.name}<br />
             
          </h4>
          <div class="d-flex flex-row my-3">
            <div class="text-warning mb-1 me-2">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
              <span class="ms-1">
                {product.rating}
              </span>
            </div>
            <span class="text-muted"><i class="fas fa-shopping-basket fa-sm mx-1"></i>{product.quantity} orders</span>
            <span class="text-success ms-2">In stock</span>
          </div>

          <div class="mb-3">
            <span class="h5">${product.price}</span>
            <span class="text-muted">/per piece</span>
          </div>

          <p>
            {product.description}
          </p>

          <hr />
         {/* {product.categoryId} */}
          <div class="row mb-4">
            {/* <div class="col-md-4 col-6">
              <label class="mb-2">Size</label>
              <select class="form-select border border-secondary" style={{height: "35px"}}>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div> */}
            
            <div class="col-md-4 col-6 mb-3">
              <label class="mb-2 d-block">Quantity</label>
              <div class="input-group mb-3" style={{width: "170px"}}>
                <button class="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                  -
                </button>
                <input type="text" class="form-control text-center border border-secondary" placeholder="14" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                <button class="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                  +
                </button>
              </div>
            </div>
          </div>
          {/* <a href="#" class="btn btn-warning shadow-0"> Buy now </a> */}
          <a href="#c" class="btn btn-primary shadow-0"> <i class="me-1 fa fa-shopping-basket"></i> Add to cart </a>
          <button type='button'  onClick={backToHome} class="btn btn-light border border-secondary py-2 icon-hover px-3">  Back to Home </button>
        </div>
      </main>
    </div>
  </div>
</section>
</>
    )
}

export default Product;
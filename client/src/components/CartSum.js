import { useNavigate } from "react-router-dom";



function CartSum(props){
    const navigate = useNavigate();
    const backToHome = () => {
    navigate('/home');
  }
    return(
        <>
            <div className="col-lg-5">
                      <div className="card bg-light text-dark rounded-3">
                        <div className="card-body">
                          <h3>Checkout</h3>
                          <hr className="my-4" />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">${Math.round(props.sum)}.00</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">$20.00</p>
                          </div>

                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">${Math.round(props.sum + 20)}.00</p>
                          </div>

                          <button type="button" className="btn btn-info btn-block btn-lg">
                            <div className="d-flex justify-content-between">
                              <span>${Math.round(props.sum + 20)}.00</span>
                              <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                            </div>
                          </button>
                          <button type='button' className='btn btn-secondary btn-lg' onClick={backToHome}>
                            Back to home
                          </button>

                        </div>
                      </div>

                    </div>
        
                    </>
    )
}

export default CartSum;
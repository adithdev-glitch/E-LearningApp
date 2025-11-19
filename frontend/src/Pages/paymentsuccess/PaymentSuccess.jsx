import React from 'react'
import { Link, useParams } from 'react-router-dom';
import "./paymentSuccess.css"
import { TiTickOutline } from "react-icons/ti";
const PaymentSuccess = ({user}) => {
    const params = useParams();
    return (
      <>
      <div className="container_0">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="_success" role="alert">
            <i className="fa fa-check-circle fa-2x text-success" aria-hidden="true"><TiTickOutline className="tick-animation" style={{
              fontSize:"100px"
            }}/></i>
            <h2 className="mt-2">Your payment was successful</h2>
            <p className='para'>Thank you for your payment. We will <br /> be in contact with more details shortly.</p>
            <p>Reference no - {params.id}</p>
            <Link to={`/${user._id}/dashboard`} className="start-btn">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
      </>
    );
}

export default PaymentSuccess

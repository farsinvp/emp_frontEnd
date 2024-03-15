import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center m-5 '>
    <Spinner animation="border" variant="warning" />Loading.....
    </div>
      
    </>
  )
}

export default LoadingSpinner

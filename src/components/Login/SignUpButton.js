import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import SignUpForm from './SignUpForm'

const SignUpButton = ({addAccount}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      
      <Button className="signUpButton" onClick={handleShow} ><i class="far fa-hand-point-right"></i>  Create Yours !</Button>
      {show &&
        <SignUpForm
            show={show}
            handleClose={handleClose}
            addAccount={addAccount}
        ></SignUpForm>
        }
    </div>
  )
}

export default SignUpButton;
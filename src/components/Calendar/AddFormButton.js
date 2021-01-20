import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddForm from './AddForm'

const AddFormButton = ({addEvent, addTodoEvent}) => {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button className="addFromButton" onClick={handleShow} >Add</Button>
      {show &&
        <AddForm /** 編輯視窗 */
          show={show}
          handleClose={handleClose}
          //state="editing"
          addEvent={addEvent}
          addTodoEvent={addTodoEvent}
        />}
    </div>
  )
}

export default AddFormButton;


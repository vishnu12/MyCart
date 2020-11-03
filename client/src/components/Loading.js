import React from 'react'
import {Spinner} from 'react-bootstrap'
const Loading = () => {
  return (
    
    <Spinner animation='grow' role='status'
    style={{width:'100px',height:'100px',margin:'auto',display:'block',
    marginTop:'10rem'}}>

<span className='sr-only'>Loading...</span>

    </Spinner>
   
  )
}

export default Loading

import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap'

const SearchBox = ({history}) => {

   const [keyword, setKeyword] = useState('') 
   
   const submit=e=>{
       e.preventDefault()
       if(keyword.trim()){
        history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
   }

  return (
    <Form className='d-flex' onSubmit={submit}>
      <Form.Control type='text' value={keyword} onChange={e=>setKeyword(e.target.value)}/>
      <Button variant='light' type='submit' className='btn btn-outline-success ml-2'>Search</Button>
    </Form>
  )
}

export default SearchBox


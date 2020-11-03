
import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { Row,Col,Form, Button } from 'react-bootstrap'
import { saveDetails } from '../actions/cartActions'

const ShippingScreen = ({history}) => {

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalcode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const [payment, setPayment] = useState('PayPal')

    const dispatch=useDispatch()

    const submit=e=>{
        e.preventDefault()
        dispatch(saveDetails({address,city,postalcode,country,payment}))
        history.push('/placeorder')
    }

  return (
    <Row className='col-md-6 m-auto'>
      <Col>
      <h1>Enter the details</h1>
       <Form onSubmit={submit}>
       <Form.Group>
           <Form.Label>Address</Form.Label>
           <Form.Control type='text' value={address} onChange={e=>setAddress(e.target.value)}/>
       </Form.Group>
       <Form.Group>
           <Form.Label>City</Form.Label>
           <Form.Control type='text' value={city} onChange={e=>setCity(e.target.value)}/>
       </Form.Group>
       <Form.Group>
           <Form.Label>PostalCode</Form.Label>
           <Form.Control type='text' value={postalcode} onChange={e=>setPostalCode(e.target.value)}/>
       </Form.Group>

       <Form.Group>
           <Form.Label>Country</Form.Label>
           <Form.Control type='text' value={country} onChange={e=>setCountry(e.target.value)}/>
       </Form.Group>

       <Form.Group>
            <Form.Label as='legend'>select method</Form.Label>
       
        <Col>
        <Form.Check type='radio' label='PayPal or Credit card'
        id='PayPal' name='paymentMethod' value='PayPal'
        checked onChange={e=>setPayment(e.target.checked)}>
        </Form.Check>
        <Form.Check type='radio' label='Stripe'
        id='Stripe' name='paymentMethod' value='Stripe'
        checked onChange={e=>setPayment(e.target.checked)}>
        </Form.Check>
        </Col>
        </Form.Group>
        <Button variant='outline-dark' type='submit'>Proceed</Button>
       </Form>
      </Col>
    </Row>
  )
}

export default ShippingScreen

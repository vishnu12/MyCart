
import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Route} from 'react-router-dom'
import {Nav,Navbar,NavDropdown,Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {


const dispatch=useDispatch()

const userLogin=useSelector(state=>state.userLogin)
const {user}=userLogin

let isAdmin=user && user.isAdmin

const cart=useSelector(state=>state.cart)
const {cartItems}=cart

const logoutHandler=()=>{
  dispatch(logout())
}
  return (
      <section className='header'>
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
  <Navbar.Brand ><Link className='text-white' style={{textDecoration:'none'}} to='/'>Home</Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <div className='ml-4 p-2'>
    <Route render={({history})=><SearchBox history={history}/>} />
    </div>
    <Nav className="ml-auto">
        <LinkContainer to='/cart'>
        <Nav.Link className='text-white'><i className='fas fa-shopping-cart mr-1'></i>
        Cart<Badge variant="secondary">{cartItems.length===0?'':cartItems.length}</Badge>
        </Nav.Link>
        </LinkContainer>
     {
       !user?
       <LinkContainer to='/login'>
      <Nav.Link className='text-white'><i className="fas fa-user mr-1"></i>Login</Nav.Link>
     </LinkContainer>
     :user && !isAdmin?
     <NavDropdown title={<span className="text-white my-auto">{user.name}</span>} id='username'>
      <LinkContainer to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item onClick={()=>logoutHandler()}>Logout</NavDropdown.Item>
      </NavDropdown>
      :
      <>

<NavDropdown title={
      <span className="text-white my-auto">{user.name}</span>
  } id='username'>
      <LinkContainer to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item onClick={()=>logoutHandler()}>Logout</NavDropdown.Item>
      </NavDropdown>   
   <NavDropdown title={
      <span className="text-white my-auto">Admin</span>
  } id='admin'>
      <LinkContainer to='/admin/users'>
          <NavDropdown.Item>Users</NavDropdown.Item>
      </LinkContainer>

      <LinkContainer to='/admin/products'>
          <NavDropdown.Item>Products</NavDropdown.Item>
      </LinkContainer>
     
      <LinkContainer to='/admin/orders'>
          <NavDropdown.Item>Orders</NavDropdown.Item>
      </LinkContainer>
      </NavDropdown>
      </>
     }
     
    </Nav>
  </Navbar.Collapse>
</Navbar>
</section>
  )
}

export default Header

import { React, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { removeCart, emptycart } from 'store/cartSlice';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ViewCart() {
  const navigate = useNavigate()
  const [cardno, setCardno] = useState(" ")
  const [expire, setExpire] = useState(" ")
  const [cvv, setCvv] = useState(" ")
  const [show, setShow] = useState(false)
  const dispatch = useAppDispatch();
  const cartdata = useAppSelector((state) => state.cart);
  console.log("select", cartdata);

  const cartArray = cartdata && cartdata.cart ? cartdata.cart : [];
  console.log("cartarray", cartArray)

  const totalPrice = cartArray.reduce((total, item) => total + (item.Price), 0);


  const onSubmitHandler = async (event) => {
    setShow(true)
    event.preventDefault()
    let cartData = {
      RestaurantName: cartdata.RestaurantName.restaurantName,
      userid: cartdata.userid.userId.id,
      TotalAmount: totalPrice,
      cart: cartArray.map(item => ({
        img: item.img,
        Title: item.Title,
        Price: item.Price,
        Quantity: item.Quantity,
        Description: item.Description
      }))
    }
    console.log("cart", cartData)
    await axios.post('cart/addcart', cartData)
      .then((response) => {
        console.log("cartres", response)
        toast.success("Ordered Successfully")
        dispatch(emptycart())
      })
      .catch((err) => {
        console.log("errcart", err)
        toast.error("Something Went Wrong")
      })
  }


  const handleRemoveFromCart = (itemTitle) => {
    dispatch(removeCart(itemTitle));
  }

  const handleClose = () => {
    setShow(false)
  }

  const paymentSubmit = () => {
    toast.success("Successfully Paid")
    setCardno(" ")
    setCvv(" ")
    setExpire(" ")
  }

  const home = () => {
    navigate('/home')
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%' }}>
        <h2 style={{ color: 'red', padding: '5px' }}>View Cart</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
          {cartArray.map((item, index) => (
            <Card key={index} style={{ width: '220px', margin: '10px', transform: 'none' }}>
              <div style={{ width: '220px', height: '150px' }}>
                <div style={{ height: '100%', width: '100%', position: 'sticky', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: `url(${item.img})` }}></div>
              </div>
              <div style={{ height: '160px', padding: '5px' }}>
                <h6 style={{ margin: '0px 0px', color: 'GrayText' }}>{item.Title}</h6><br />
                <h6 style={{ margin: '0px 0px' }}>Price: {item.Price}</h6><br />
                <h6 style={{ margin: '0px 0px' }}>Quantity: {item.Quantity}</h6><br />
                <h6 style={{ margin: '0px 0px' }}>Description: {item.Description}</h6><br />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '5px' }}>
                <Button variant='danger' onClick={() => handleRemoveFromCart(item.Title)}>Remove</Button>
              </div>
            </Card >
          ))}
        </div>
        <div>

        </div>
        <Card style={{ display: 'flex', justifyContent: 'center', padding: '10px', height: '120px', width: 'auto', marginLeft: '50rem', transform: 'none' }}>
          <h6>Total Price: <i className="fa-solid fa-indian-rupee-sign"></i>{totalPrice}</h6>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px', bottom: '5px' }}>
            <Button variant='secondary' onClick={home}>Home</Button>
            <Button variant='primary' onClick={onSubmitHandler}>Checkout</Button>
          </div>
        </Card>
        <Modal style={{ width: '100%', height: '100%', maxHeight: '600px', maxWidth: '350px', borderRadius: '10px', position: 'absolute', top: '50%', left: '58%', transform: 'translate(-50%, -50%)', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }} show={show} onHide={handleClose} size="lg" centered>
          <Modal.Body style={{ padding: '30px', minHeight: '300px' }}>
            <h5 style={{ display: 'flex', justifyContent: "center", fontWeight: 'bold' }}>Payment Details</h5><br />
            <div>
              <h6>Card Number</h6>
              <Form.Control type='text' value={cardno} onChange={(e) => setCardno(e.target.value)} /><br />
              <h6>Expiration Date</h6>
              <Form.Control type='Date' value={expire} onChange={(e) => setExpire(e.target.value)} /><br />
              <h6>Cvv</h6>
              <Form.Control type='text' value={cvv} onChange={(e) => setCvv(e.target.value)} /><br />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ color: 'white' }} variant="secondary" onClick={handleClose}>Close</Button>
            <Button style={{ color: 'white' }} variant='primary' onClick={paymentSubmit}>Payment</Button>
          </Modal.Footer>
        </Modal>
      </div >
    </>

  )
}

export default ViewCart;

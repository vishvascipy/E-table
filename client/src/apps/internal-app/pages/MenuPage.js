import { React, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { Toaster, toast } from 'react-hot-toast';
import { setrestaurant, addToCart } from "store/cartSlice";

function MenuPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userid = useAppSelector((state) => state.logineduser)
    console.log("myid", userid)
    const [getitem, setGetitem] = useState([])
    const [quantity, setQuantity] = useState(1);
    const [totalprice, setTotalPrice] = useState(0);
    const [show, setShow] = useState(false)
    const [queryParameters] = useSearchParams()
    const companyName = queryParameters.get("companyName")
    console.log("rest", companyName)
    const [data, setData] = useState([])



    useEffect(() => {
        axios.get(`menuRoute/menu?companyName=${encodeURIComponent(companyName)}`)
            .then((response) => {
                console.log("hi", response.data.restaurant.menu)
                setData(response.data.restaurant.menu)

            }).catch((err) => {
                console.log(err)
            });
    }, [companyName])

    useEffect(() => {
        const newTotalPrice = getitem.Price * quantity;
        setTotalPrice(newTotalPrice);
    }, [quantity, getitem]);


    function getmenuid(id) {
        console.log("menuitemid", id)
        setShow(true)
        axios.get(`menuRoute/getmenuid/${id}`)
            .then((response) => {
                console.log("res", response.data.menuItem)
                setGetitem(response.data.menuItem)
                setTotalPrice(response.data.menuItem.Price)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }
    console.log("state", getitem)

    const handleClose = async () => {
        setShow(false)

    }
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Function to decrement quantity with lower limit of zero
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    // const totalPrice = getitem.Price * quantity;


    const viewcart = async () => {
        navigate('/viewcart')
    }

    console.log("tocart", data)
    console.log("menuitem", getitem)

    const onSubmitHandler = async (event) => {
        const cartdata = {
            RestaurantName: companyName,
            userid: userid,
            cart: [{
                img: getitem.img,
                Title: getitem.Title,
                Price: totalprice,
                Quantity: quantity,
                Description: getitem.Description
            }]

        }
        dispatch(setrestaurant(({ restaurantName: cartdata.RestaurantName, userId: cartdata.userid })))
        dispatch(addToCart(cartdata.cart))
        setQuantity(1)
        toast.success("Added to Cart")
    }



    return (
        <>
            <Toaster position="bottom-right" />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <Button style={{ display: 'flex', justifyContent: 'flex', marginLeft: '62rem', marginBottom: '30rem' }} variant="primary" onClick={viewcart}>Cart</Button>
                </div>
                <Card style={{ width: '100%', height: '90%', maxWidth: '600px', borderRadius: '10px', position: 'absolute', top: '50%', left: '58%', transform: 'translate(-50%, -50%)' }}>
                    <h1 style={{ color: 'red', textAlign: 'center', marginBottom: '20px', padding: '10px 0px 0px 0px' }}>{companyName} Menu</h1>
                    <ul style={{ listStyleType: 'none', padding: 20, overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                        {data.map((item, index) => (

                            <li key={index} style={{ marginBottom: '10px', fontSize: '18px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 'bold' }}>{item.Title}</span>

                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button style={{ height: '30px', width: '50px', marginRight: '5px' }} variant='btn btn-warning' onClick={() => getmenuid(item._id)}><i class="fa-solid fa-cart-plus"></i></Button>
                                        <i className="fa-solid fa-indian-rupee-sign"></i> {item.Price}
                                    </span>

                                </div>
                            </li>
                        ))}
                    </ul>
                </Card >
                <Modal style={{ width: '100%', height: '100%', maxHeight: '600px', maxWidth: '350px', borderRadius: '10px', position: 'absolute', top: '50%', left: '58%', transform: 'translate(-50%, -50%)', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }} show={show} onHide={handleClose} size="lg" centered>
                    <Modal.Body style={{ padding: '30px', minHeight: '500px' }}>
                        {/* <div style={{ marginBottom: '20px', position: 'relative', maxWidth: '50%' }}>
                            <img src={getitem.img} alt="Item Image" style={{ maxWidth:'100%', objectFit: 'contain' }} />
                        </div> */}
                        <div
                            style={{
                                height: '20rem',
                                backgroundImage: `url(${getitem.img})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                width: '50px'
                            }}
                            className="w-100"
                        ></div>
                        <div style={{ marginTop: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <h6 style={{ fontSize: 'bold' }}><b>Title:</b> {getitem.Title}</h6>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <h6 style={{ fontSize: 'bold' }}><b>Price:</b> <i className="fa-solid fa-indian-rupee-sign"></i>{totalprice}</h6>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <h6 style={{ fontSize: 'bold' }}><b>Quantity:</b></h6>
                                <Button type="button" style={{ padding: '2px 6px', fontSize: '12px', height: '25px', outline: 'none' }} variant="btn btn-light" onClick={decrementQuantity}>-</Button>
                                <h6 style={{ textAlign: 'center', width: '30px', height: '25px', lineHeight: '25px' }}>{quantity}</h6>
                                <Button type="button" style={{ padding: '2px 6px', fontSize: '12px', height: '25px', outline: 'none' }} variant="btn btn-light" onClick={incrementQuantity}>+</Button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <h6 style={{ fontSize: 'bold' }}><b>Description:</b> {getitem.Description}</h6>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Button onClick={onSubmitHandler} variant="success">Add to Cart</Button>
                            </div>

                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{ color: 'white' }} variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div >
        </>
    )
}
export default MenuPage
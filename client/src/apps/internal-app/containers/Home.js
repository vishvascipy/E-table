import React, { useEffect, useState } from 'react'
import styles from './css/Home.module.css'
import axios from 'axios';
import Card from './card'
import './style.css'


const Home = () => {

  const [result, setResult] = useState([])

  useEffect(() => {
    axios.get("restaurant/viewrestaurant")
      .then((response) => {
        console.log("from rest", response.data)
        setResult(response.data)
      })
      .catch((err) => {
        console.log("err from rest", err)
      })
  }, [])

  return (
    <>
      <div className='conatiner'>
        <div class="header">
          <h1> <b>Select Your Resturants </b></h1>
        </div>
        <div className='cards'>
          {result.map((item, index) => (
            <Card key={index} title={item.name}
              img={item.img}
            />
          ))}
          {/* <Card
            img='https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=510&q=80'
            title='Zam Zam'
            author='Palayam,Trivandrum'
            des="Taste of Spicy" />
          <Card
            img='https://images.unsplash.com/photo-1530554764233-e79e16c91d08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            title='Burger King'
            author='LuLu Mall,Trivandrum'
            des="Cheesy Burgers" />
          <Card
            img='https://images.unsplash.com/photo-1593329344473-6a9dfc15dc3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=582&q=80'
            title='Kerala Food Court'
            author='Kovalam,Trivandrum'
            des="Native Tastes of kerala" />
          <Card
            img='https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            title='Mangalam'
            author='EastFort,Trivandrum'
            des="Hot and Spicy foods" />
          <Card
            img='https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
            title='Smoothy Hut'
            author='MG Road,Trivandrum'
            des="Variety of Smoothy" />
          <Card
            img='https://images.unsplash.com/photo-1558326567-98ae2405596b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=459&q=80'
            title='Sweet Mall'
            author='Bakkery jn,Trivandrum'
            des="Taste and Joy" />
          <Card
            img='https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            title='Azad'
            author='kowdiyar,Trivandrum'
            des="Chinese foods" />
          <Card
            img='https://images.unsplash.com/photo-1432139509613-5c4255815697?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80'
            title='Al Hassan'
            author='Manacuad,Trivandrum'
            des="Tastes of triavandrum" />
          <Card
            img='https://images.unsplash.com/photo-1534939561126-855b8675edd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            title='Shappile Curry'
            author='Punjakkari,Trivandrum'
            des="Home made foods" />
          <Card
            img='https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            title='Chineese Hut'
            author='MOT,Trivandrum'
            des="Chineese Noodles" /> */}
        </div>
      </div>

    </>
  );
}

export default Home
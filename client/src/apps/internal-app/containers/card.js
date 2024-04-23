import React from "react";
import './style.css'
import { Link, useNavigate } from "react-router-dom";


function Card(props) {
  const navigate = useNavigate()

  function jump(){
    navigate(`/booking/?companyName=${props.title}`)
    // console.log("navigate clicker");
  }
    return (
        <div className="card" onClick={jump} >
        <img src={props.img}  />
        <div className="card-body">
          <h2>{props.title}</h2>
          <p>{props.des}</p>
          <h5>{props.author}</h5>
        </div>
      </div>
    );
  }

  export default Card
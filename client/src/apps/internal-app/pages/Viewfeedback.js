import { React, useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useSearchParams } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Viewfeedback() {
    const navigate = useNavigate()
    const [queryParameters] = useSearchParams()
    const companyName = queryParameters.get("companyName")
    console.log("viewfeed", companyName)
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`feedback/viewfeedback?RestaurantName=${encodeURIComponent(companyName)}`)
            .then((response) => {
                console.log(response.data.result1)
                setData(response.data.result1)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [companyName])

    const back = async () => {
        navigate('/home')
    }


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <Card style={{ width: '80%', padding: '20px', transform: 'none', margin: 'auto' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h1 style={{ color: 'red' }}>View Feedback</h1>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'flex-end' }}>
                        <Button variant='secondary' onClick={back}>Back</Button>
                    </div>
                    <div style={{ marginBottom: '2rem', maxHeight: 'calc(90vh - 120px)', scrollbarWidth: 'none', overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                <thead>
                                    <tr style={{ border: '1px solid #ddd' }}>
                                        <th style={{ color: "#454545", border: '1px solid #ddd', padding: '2px', textAlign: 'center', width: '20%' }}>Name</th>
                                        <th style={{ color: "#454545", border: '1px solid #ddd', padding: '2px', textAlign: 'center', width: '20%' }}>Email</th>
                                        <th style={{ color: "#454545", border: '1px solid #ddd', padding: '2px', textAlign: 'center', width: '10%' }}>Rating</th>
                                        <th style={{ color: "#454545", border: '1px solid #ddd', padding: '2px', textAlign: 'center', width: '20%' }}>Restaurant Name</th>
                                        <th style={{ color: "#454545", border: '1px solid #ddd', padding: '2px', textAlign: 'center', width: '30%' }}>Comment</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 'calc(90vh - 150px)', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index} style={{ border: '1px solid #ddd' }}>
                                            <td style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'center', width: '20%' }}>{item.Name}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'center', width: '20%' }}>{item.Email}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'center', width: '10%' }}>{item.Rating}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'center', width: '20%' }}>{item.RestaurantName}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '2px', textAlign: 'center', width: '30%' }}>{item.Message}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card >
            </div >

        </>
    )
}

export default Viewfeedback
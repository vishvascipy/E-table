import { React, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Toaster, toast } from 'react-hot-toast';

function MainAdmin() {  
    const [result, setResult] = useState([])
    const navigate = useNavigate()
    const addrestaurant = () => {
        navigate("/addrestaurant")
    }
    useEffect(() => {
        axios.get("restaurant/viewrestaurant")
            .then((response) => {
                console.log(response.data)
                setResult(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    const deleteRestaurant = (id) => {
        axios.delete(`restaurant/deleterestaurant/${id}`)
            .then((response) => {
                const updatedResult = result.filter(item => item._id !== id);
                setResult(updatedResult);
                console.log(response)
                toast.success("Deleted Successfully")
            })
            .catch((err) => {
                console.log(err)
                toast.error("Something Went Wrong")
            })
    }

    const logout = () => {
        navigate('/signin')
    }

    return (
        <>
            <Toaster position="bottom-right" />
            <div style={{ display: 'block', width: '100%', margin: '40px' }}>
                < div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <h3>Admin Page</h3>
                    <Button style={{ height: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginLeft: '60rem' }} variant='primary' onClick={addrestaurant}>Add Restaurant</Button>
                </div >

                <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '10rem', margin: '-5px' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"> <b>Restaurant</b></TableCell>
                                    <TableCell align="left"><b>Action</b></TableCell>
                                    <Button variant='primary' onClick={logout}>Log Out</Button>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    result.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">{item.name}</TableCell>
                                            <TableCell align="left"><Button variant='danger' onClick={() => deleteRestaurant(item._id)}>Remove</Button></TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div >
        </>
    )
}

export default MainAdmin
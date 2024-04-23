import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useAppDispatch } from 'hooks/hooks'
import { clearUserStates } from 'store/features/userSlice'
import { clearReservationStates } from 'store/features/reservationSlice'
import { useNavigate } from 'react-router-dom'

import './style.css'


const AdminPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [data, setData] = useState([]);
    // const [rows ,setRows] = useState()
    const companyName = JSON.parse(localStorage.getItem("admin"));
    console.log("companyname", companyName)
    useEffect(() => {
        axios.get(`api/v1/company/tables/?companyName=${companyName}`)
            .then((response) => {
                // check if tables are booked or not for time given
                console.log("admin", response.data)
                setData(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    // console.log(data);
    const Rdata = []

    const table = Object.keys(data)

    const reserve = table.map((x) => { return data[x] })


    const booking = reserve.map((x) => {
        const date = Object.keys(x.reservations)
        const bookingID = date.map((z) => {
            const id = Object.keys(x.reservations[z])
            // console.log(id);

            const tableData = id.map((y) => {
                Rdata.push(x.reservations[z][y])
                // Rdata.sort((a, b) => {
                //     return a.from - b.from
                // })
            })
        })
    })
    const sorted = []
    const rows = Rdata.map((x) => {
        sorted.push(x)
        sorted.sort((a, b) => {
            // console.log(new Date(a.from).toLocaleDateString().replace(/\//g, ''));
            const x = new Date(a.from)
            const y = new Date(b.from)
            const d1 = x.getDate();
            const m1 = x.getMonth() + 1;
            const y1 = x.getFullYear();
            const f1 = y1 + (m1 <= 9 ? '0' + m1 : m1) + (d1 <= 9 ? '0' + d1 : d1);

            const d2 = y.getDate();
            const m2 = y.getMonth() + 1;
            const y2 = y.getFullYear();
            const f2 = y2 + (m2 <= 9 ? '0' + m2 : m2) + (d2 <= 9 ? '0' + d2 : d2);
            console.log(f1, f2);
            return f2 - f1
        })
    })

    console.log(sorted);

    const handleLogOut = async () => {
        dispatch(clearReservationStates());
        dispatch(clearUserStates());
        localStorage.clear();
    }

    const menu = async () => {
        navigate('addMenu')
    }

    const feedback = async () => {
        navigate(`viewfeedback?companyName=${companyName}`)
    }

    //  setRows(Rdata) 
    // console.log(rows);
    let options = { hour: '2-digit', minute: '2-digit' };

    return (
        <div className='adminbody'>
            <div className='headerAdmin'>
                <h1>{companyName} <small style={{ fontSize: "20px" }}>Table Booking Dashboard </small> </h1>
                <Button variant="contained" onClick={menu}>Add Menu</Button>
                <Button variant="contained" onClick={feedback}>View Feedback</Button>
                <Button variant="contained" onClick={handleLogOut}>logout</Button>
            </div>
            <div className='table'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Date</b></TableCell>
                                <TableCell><b>From</b></TableCell>
                                <TableCell align="left"> <b>To</b></TableCell>
                                <TableCell align="left"><b>Customer Name</b></TableCell>
                                <TableCell align="left"><b>People Count</b></TableCell>
                                <TableCell align="left"><b>Table ID </b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                sorted.map((row) => (
                                    <TableRow
                                        key={row.timestamp
                                        }
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {new Date(row.from).toLocaleDateString('en-GB')}
                                        </TableCell>
                                        <TableCell component="th" scope="row" >
                                            {new Date(row.from).toLocaleTimeString('en-US', options)}
                                        </TableCell>
                                        <TableCell align="left">{new Date(row.to).toLocaleTimeString('en-US', options)}</TableCell>
                                        <TableCell align="left">{row.first_name} {row.last_name}</TableCell>
                                        <TableCell align="left">{row.peopleCount}</TableCell>
                                        <TableCell align="left">{row.tableId}</TableCell>

                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default AdminPage;


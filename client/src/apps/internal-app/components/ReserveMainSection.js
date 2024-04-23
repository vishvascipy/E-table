import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';
import styles from './css/ReserveMainSection.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { updateEndDate, updateFirstName, updateLastName, updatePeopleCount, updateStartDate } from 'store/features/reservationSlice';

const ReserveMainSection = (props) => {
    const [queryParameters] = useSearchParams()
    const companyName = queryParameters.get("companyName")

    const reservationStates = useAppSelector((state) => state.reservation)
    const dispatch = useAppDispatch();

    const [datePicked, setDatePicked] = useState(moment());
    const [startTime, setStartTime] = useState(undefined);
    const [endTime, setEndTime] = useState(undefined);
    const [startTimeOptions, setStartTimeOptions] = useState(undefined);
    const [endTimeOptions, setEndTimeOptions] = useState(undefined);
    const [customerFirstName, setCustomerFirstName] = useState(reservationStates.firstName);
    const [customerLastName, setCustomerLastName] = useState(reservationStates.lastName);
    const [peopleCount, setPeopleCount] = useState(reservationStates.peopleCount);
    const [startDate, setStartDate] = useState(reservationStates.startDate);
    const [endDate, setEndDate] = useState(reservationStates.endDate);

    const navigate = useNavigate();

    const clickMenu = () => {
        navigate(`/Menu/?companyName=${companyName}`)
    }

    const handleSelectChange = (e, select) => {
        select === "from" ?
            setStartTime(e)
            :
            setEndTime(e)
    }

    const handleDateChange = (date) => {
        setDatePicked(moment(date));
    }

    useEffect(() => {
        const setUpTimeInfo = () => {

            const daysOfWeekAsString = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

            var data = undefined;
            let startTimeOptions = [];
            let endTimeOptions = [];

            axios.get(`api/v1/company/operation/?companyName=${companyName}`)
                .then((response) => {
                    data = response.data;

                    Object.keys(data).map((d) => {
                        // console.log(d)
                        // console.log(daysOfWeekAsString[datePicked.day()])
                        if (d.toString() === daysOfWeekAsString[datePicked.day()]) {

                            let openTime = data[d]['start_time']
                            openTime = openTime.replace(/[^0-9,:]+/g, "");
                            // console.log(openTime,"opentime");
                            openTime = openTime.split(':');
                            let openHours = parseInt(openTime[0]);
                            let openMinutes = parseInt(openTime[1]);
                            // console.log(openHours,openMinutes);



                            let closeTime = data[d]['close_time'];
                            let nextDay = closeTime.includes('nd') ? true : false;
                            // console.log(closeTime.includes('nd'));
                            closeTime = closeTime.replace(/[^0-9,:]+/g, "");
                            closeTime = closeTime.split(':');
                            let closeHours = parseInt(closeTime[0]);
                            let closeMinutes = parseInt(closeTime[1]);
                            // console.log(closeHours,closeMinutes);
                            ///////////////////////////////////////////////////////////////////  
                            let openDate = moment(datePicked).hours(openHours).minutes(openMinutes).seconds(0).milliseconds(0);
                            // console.log(openDate,"openDate");

                            let closeDate = true ?    //nextDay ? // BUG 
                                moment(datePicked).add(1, 'd').hours(closeHours).minutes(closeMinutes).seconds(0).milliseconds(0) :
                                moment(datePicked).hours(closeHours).minutes(closeMinutes).seconds(0).milliseconds(0);
                            // console.log(closeDate,"closeDate1312");
                            let nowDate = moment();
                            // console.log(nowDate,"nowDate");
                            nowDate.minutes() <= 30 ?
                                nowDate.minutes(30).seconds(0).milliseconds(0) :
                                nowDate.add(1, 'h').minutes(0).seconds(0).milliseconds(0);

                            nowDate > openDate && (openDate = nowDate);

                            const oldOpenDateDay = openDate.day();
                            // console.log("open",openDate, "close",closeDate);
                            // console.log(openDate <= closeDate)
                            while (openDate <= closeDate) {
                                //   console.log("while")
                                let nextDay = "";
                                openDate.day() !== oldOpenDateDay && (nextDay = " (next day) ");
                                // console.log(oldOpenDateDay,"2222");
                                startTimeOptions.push({
                                    value: openDate.format('h:mm a') + nextDay,
                                    label: openDate.format('h:mm a') + nextDay,
                                    // isDisabled  : false
                                })
                                endTimeOptions.push({
                                    value: openDate.format('h:mm a') + nextDay,
                                    label: openDate.format('h:mm a') + nextDay,
                                    // isDisabled  : false
                                })

                                openDate.add(30, 'm');
                            }
                            // console.log(startTimeOptions);
                            // console.log(endTimeOptions);
                        }


                        return 0;
                    });

                    startTimeOptions[startTimeOptions.length - 1].isDisabled = true;
                    startTimeOptions[startTimeOptions.length - 2].isDisabled = true;
                    setStartTime(startTimeOptions[0]);
                    setEndTime(endTimeOptions[2]);
                    setStartTimeOptions(startTimeOptions);
                    setEndTimeOptions(endTimeOptions.slice(2));
                }).catch((err) => {
                    console.log(err);
                });

            return data;
        }

        setUpTimeInfo();
    }, [datePicked])

    useEffect(() => {

        const getDate = (t) => {

            let time = t.value
            let pm = time.includes("pm") ? true : false;
            let nextDay = time.includes("next day") ? true : false;
            time = time.replace(/[^0-9,:]+/g, "");
            time = time.split(':');
            let hour = pm ? parseInt(time[0]) + 12 : parseInt(time[0]);
            hour = hour === 24 ? 12 : hour;
            hour === 12 && !pm && (hour = 0);
            let minutes = time[1];
            let date = moment(datePicked).hours(hour).minutes(minutes).seconds(0).milliseconds(0);
            nextDay && date.add(1, 'd');

            return date;
        }

        if (startTime && endTime) {

            let sd = getDate(startTime);
            let ed = getDate(endTime);

            setStartDate(sd);
            setEndDate(ed);
        }

        if (endTimeOptions) {

            const filter = (option) => {
                option = getDate(option) > getDate(startTime).add(30, 'm')
                    ? option.isDisabled = false
                    : option.isDisabled = true
            }
            endTimeOptions.filter(filter);
        }

    }, [startTime, endTime, datePicked, endTimeOptions])

    useEffect(() => {
        if (endTimeOptions) {
            for (var i = 0; i < endTimeOptions.length; i++) {
                if (!endTimeOptions[i].isDisabled) {
                    setEndTime(endTimeOptions[i]);
                    break;
                }
            }
        }
    }, [startTime, endTimeOptions])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateFirstName(customerFirstName));
        dispatch(updateLastName(customerLastName));
        dispatch(updateStartDate(startDate.format()));
        dispatch(updateEndDate(endDate.format()));
        dispatch(updatePeopleCount(peopleCount));

        navigate(`/booking/tables/?companyName=${companyName}`);
    }

    return (
        <div onSubmit={submitHandler} className={styles.MainSection}>
            <div style={{ display: 'flex', justifyContent: 'end', marginLeft: '10px' }}>
                <Button title='Menu' style={{ maxWidth: '80px' }} onClick={clickMenu} />
            </div>
            <div className={styles.Title} style={{ display: "block", textAlign: "center" }}>
                <h1>{companyName} </h1>
                <p>RESERVATION INFORMATION</p>
            </div>
            <div className={styles.FormRow}>
                <div className={styles.Input}>
                    <p>PICK A DATE</p>
                    <DatePicker
                        selected={datePicked.toDate()}
                        onChange={handleDateChange}
                        minDate={moment().toDate()}
                    />
                </div>
                <div className={styles.Input}>
                    <p>FROM TIME</p>
                    <Select
                        options={startTimeOptions}
                        value={startTime}
                        onChange={(e) => handleSelectChange(e, "from")}
                    />
                </div>
                <div className={styles.Input} id={styles.Select}>
                    <p>TO TIME</p>
                    <Select required
                        options={endTimeOptions}
                        onChange={(e) => handleSelectChange(e, "to")}
                        value={endTime}
                        className={styles.Select}
                    />
                </div>
            </div>
            <div className={styles.FormRow}>
                <div className={styles.Input}>
                    <p>FIRST NAME</p>
                    <input required maxLength='20' minLength='2'
                        type="text"
                        value={customerFirstName}
                        onChange={(e) => setCustomerFirstName(e.target.value)}
                        placeholder="Enter First Name"
                    />
                </div>
                <div className={styles.Input}>
                    <p>LAST NAME</p>
                    <input required maxLength='30' minLength='2'
                        type="text"
                        value={customerLastName}
                        onChange={(e) => setCustomerLastName(e.target.value)}
                        placeholder="Enter Last Name"
                    />
                </div>
                <div className={styles.Input}>
                    <p>HOW MANY PEOPLE?</p>
                    <input

                        type="number"
                        value={peopleCount}
                        onChange={(e) => {
                            if (e.target.value > 8 || e.target.value < 1) {
                                e.target.value = 1;
                            }
                            setPeopleCount(e.target.value)
                        }}
                        placeholder="Enter Quantity of People"
                        min="1"
                        max="8"
                    />
                </div>
            </div>
            <div className={styles.Button}>
                <Button
                    title='SEE TABLES'
                    onClick={submitHandler}
                />
            </div>
        </div>
    )
}

export default ReserveMainSection;
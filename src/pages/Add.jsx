import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner'
import { addUser } from '../services/AllApi';
import { registerContext } from './Contextshare';
import { useNavigate } from 'react-router-dom';




function Add() {

    const { registerData, setRegisterData } = useContext(registerContext)

    const navigate = useNavigate()

    const [showspin, setshowSpin] = useState(true)


    // create state for hold normal inputs

    const [normalUserInput, setnormalUserInput] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        gender: "",
        location: ""
    })

    // create a state for hold status

    const [status, setStatus] = useState("")

    // create a state for holding uploading files

    const [profile, setprofile] = useState("")

    //   create a state

    const [preview, setPreview] = useState("")


    //   define normal input function

    const getandsetNormalInputs = (e) => {
        const { name, value } = e.target

        setnormalUserInput({ ...normalUserInput, [name]: value })
    }

    console.log(normalUserInput);
    console.log(status);
    console.log(profile);

    const handlefile = (e) => {
        console.log(e.target.files[0]);
        setprofile(e.target.files[0])
    }



    useEffect(() => {

        if (profile) {
            URL.createObjectURL(profile)
            setPreview(URL.createObjectURL(profile))
        }

        setTimeout(() => {
            setshowSpin(false)
        }, 2000);

    }, [profile])


    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'InActive', label: 'InActive' },

    ];



    // define handle submit function

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { fname, lname, email, mobile, gender, location } = normalUserInput

        if (!fname || !lname || !email || !mobile || !gender || !status || !profile || !location) {
            alert("Please fill the form completely")
        }
        else {
            // alert("Form filled completely")

            const data = new FormData()


            data.append("fname", fname)
            data.append("lname", lname)
            data.append("email", email)
            data.append("mobile", mobile)
            data.append("gender", gender)
            data.append("status", status)
            data.append("profile", profile)
            data.append("location", location)


            // header

            const headers = {
                "content-type": "multipart/form-data"
            }

            // api call

            const response = await addUser(data, headers)
            console.log(response);

            if (response.status = 200) {

                setnormalUserInput({
                    ...normalUserInput,

                    fname: "",
                    lname: "",
                    email: "",
                    mobile: "",
                    gender: "",
                    location: ""



                })

                setStatus("")
                setprofile("")
                setRegisterData(response.data)
                navigate('/')






            }


        }
    }

    return (
        <>

            {
                showspin ?
                    <LoadingSpinner /> :

                    <div className='container mt-3'>

                        <h1 className='text-center fw-bolder'>Add New Employee Details!!</h1>

                        <div className='mt-3 shadow border-rounded P-2'>

                            <div className='text-center'>
                                <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="no image" /></div>
                            <Form className='mt-3'>

                                <Row>

                                    {/* first name */}

                                    <FloatingLabel controlId="floatingInputfname" label="fname" className='mb-3 col-lg-6'>
                                        <Form.Control type="text" name='fname' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} placeholder="lname" />
                                    </FloatingLabel>

                                    {/* last name */}

                                    <FloatingLabel controlId="floatingInputlname" label="lname" className='mb-3 col-lg-6'>
                                        <Form.Control type="text" name='lname' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} placeholder="lname" />
                                    </FloatingLabel>


                                    {/* email */}

                                    <FloatingLabel controlId="floatingInputemail" label="email" className='mb-3 col-lg-6'>
                                        <Form.Control type="email" name='email' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} placeholder="email" />
                                    </FloatingLabel>


                                    {/* mobile */}

                                    <FloatingLabel controlId="floatingInputmobile" label="mobile" className='mb-3 col-lg-6'>
                                        <Form.Control type="text" name='mobile' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} placeholder="mobile" />
                                    </FloatingLabel>



                                    {/* gender */}

                                    <Form.Group className='mb-3 col-lg-6'>

                                        <Form.Label>Select Gender</Form.Label>
                                        {/* male */}
                                        <Form.Check type={"radio"} name='gender' value={"male"} label={"Male"} onChange={e => getandsetNormalInputs(e)} />

                                        {/* female */}
                                        <Form.Check type={"radio"} name='gender' value={"Female"} label={"Female"} onChange={e => getandsetNormalInputs(e)} />

                                    </Form.Group>

                                    {/* status */}

                                    <Form.Group className='mb-3 col-lg-6'>
                                        <Form.Label>Select Employee Status</Form.Label>

                                        <Select onChange={e => setStatus(e.value)} options={options} />

                                    </Form.Group>



                                    {/* upload file */}

                                    <Form.Group className='mb-3 col-lg-6'>
                                        <Form.Label>Choose a profile picture</Form.Label>
                                        <Form.Control type="file" name='profile' onChange={e => handlefile(e)} />



                                    </Form.Group>

                                    {/* location */}


                                    <FloatingLabel controlId="floatingInputlocation" label="location" className='mb-3 col-lg-6 mt-3'>
                                        <Form.Control type="text" name='location' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} placeholder="location" />
                                    </FloatingLabel>



                                    <Button onClick={e => handleSubmit(e)} type='submit' variant='info'>Submit</Button>




                                </Row>
                            </Form>

                        </div>

                    </div>

            }
        </>
    )
}

export default Add

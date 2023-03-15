import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Form = ({ editMode }) => {

    const [firstName, setFirstName] = useState({
        value: '',
        error: ''
    });
    const [lastName, setLastName] = useState({
        value: '',
        error: ''
    });
    const [email, setEmail] = useState({
        value: '',
        error: ''
    });
    const [password, setPassword] = useState({
        value: '',
        error: ''
    });
    const [status, setStatus] = useState({
        value: '',
        error: ''
    });


    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <>
            <Navbar></Navbar>
            <form className='' >
                <div className='container'>
                    <div className='card border-0'>
                        <div className='card-body '>
                            <div className='row justify-content-center'>
                                <div className='col-md-6 shadow p-4 text-start'>
                                    <h3 className='text-center'>Users Form</h3>

                                    <div class="row gx-3 mb-3">
                                        {/* <!-- Form Group (First name)--> */}
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputFirstName">First name</label>
                                            <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Valerie" />
                                        </div>
                                        {/* <!-- Form Group (Last name)--> */}
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputLastName">Last name</label>
                                            <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna" />
                                        </div>
                                    </div>
                                    {/* <!-- Form Group (Email)--> */}
                                    <div class="mb-3">
                                        <label class="small mb-1" for="inputEmailAddress">Email address</label>
                                        <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="name@example.com" />
                                    </div>
                                    {/* <!-- Form Group (Password))--> */}
                                    <div class="row gx-3 mb-3">
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="currentPassword">Password</label>
                                            <input class="form-control" id="currentPassword" type="password" placeholder="Enter current password" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="currentPassword"> Current Password</label>
                                            <input class="form-control" id="currentPassword" type="password" placeholder="Enter current password" />
                                        </div>
                                    </div>
                                    {/* <!-- Form Group (Status))--> */}
                                    <div class="row gx-3 mb-3">
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="StatusUser">Status User</label>
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Select Status User</option>
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="StatusUser">Role User</label>
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Select Role User</option>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                        </div>
                                    </div>

                                    <br />
                                    <div className='d-flex justify-content-center gap-5'>
                                        <Link to="/admin/users" className='btn btn-secondary'>Cancel</Link>
                                        <button type="submit" className="btn btn-primary px-4 text-center">{editMode ? 'Update' : 'Create'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Footer></Footer>
        </>
    )
}

export default Form

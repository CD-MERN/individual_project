import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../Navbar';
import Footer from '../Footer';

const Form = ({ editMode }) => {

    const [firstName, setFirstName] = useState({ value: '', error: '' });
    const [lastName, setLastName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
    const [status, setStatus] = useState("true")
    const [role, setRole] = useState("user");

    const { id } = useParams();
    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (editMode) {
            updateUser();
        } else {
            createUsers();
        }
    }

    const createUsers = () => {
        const data = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            status: status,
            role: role
        }
        axios.post('http://localhost:8000/api/create', data, { withCredentials: true })
            .then(() => {
                reset();
                navigate('/admin/users');
            })
            .catch((error) => {
                const errors = error.response.data.errors;
                setErrors(errors);
            })
    }

    const updateUser = async () => {
        const data = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            status: status,
            role: role
        }
        await axios.put(`http://localhost:8000/api/user/${id}`, data, { withCredentials: true })
            .then(() => {
                reset();
                navigate('/admin/users')
            })
            .catch((error) => {
                const errors = error.response.data.errors;
                setErrors(errors);
            })
    }

    const setErrors = (errors) => {

        if (errors.firstName) {
            setFirstName({ ...firstName, error: errors.firstName.message })
        } else {
            setFirstName({ ...firstName, error: '' })
        }

        if (errors.lastName) {
            setLastName({ ...lastName, error: errors.lastName.message })
        } else {
            setLastName({ ...lastName, error: '' })
        }

        if (errors.email) {
            setEmail({ ...email, error: errors.email.message })
        } else {
            setEmail({ ...email, error: '' })
        }

        if (errors.password) {
            setPassword({ ...password, error: errors.password.message })
        } else {
            setPassword({ ...password, error: '' })
        }

        if (errors.confirmPassword) {
            setConfirmPassword({ ...confirmPassword, error: errors.confirmPassword.message })
        } else {
            setConfirmPassword({ ...confirmPassword, error: '' })
        }

        if (errors.status) {
            setStatus({ ...status, error: errors.status.message })
        } else {
            setStatus({ ...status, error: '' })
        }

        if (errors.role) {
            setRole({ ...role, error: errors.role.message })
        } else {
            setRole({ ...role, error: '' })
        }
    }

    const reset = () => {
        setFirstName({ value: '', error: '' });
    }

    useEffect(() => {
        if (editMode && id) {
            reset();
            fetchData();
        }
    }, []);

    const fetchData =  () => {
        axios.get(`http://localhost:8000/api/user/${id}`, { withCredentials: true })
            .then((response) => {
                const data = response.data.user;
                console.log(data)
                reset();
                setFirstName({ ...firstName, value: data.firstName });
                setLastName({ ...lastName, value: data.lastName });
                setEmail({ ...email, value: data.email });
                setPassword({ ...password, value: data.password });
                setConfirmPassword({ ...confirmPassword, value: data.confirmPassword });
                setStatus({ ...status, value: data.status });
                setRole({ ...role, value: data.role });
            })
            .catch((error) => {
                //navigate('/error')
            });
    }

    return (
        <>
            <Navbar></Navbar>
            <form className='' onSubmit={onSubmitHandler}>
                <div className='container'>
                    <div className='card border-0'>
                        <div className='card-body '>
                            <div className='row justify-content-center'>
                                <div className='col-md-6 shadow p-4 text-start'>
                                    <h3 className='text-center'>Users Form</h3>

                                    <div className="row gx-3 mb-3">
                                        {/* <!-- Form Group (First name)--> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                            <input className={`form-control ${firstName.error.length ? 'border-danger' : ''}`} id="inputFirstName" type="text" placeholder="Enter your first name" value={firstName.value} onChange={(e) => setFirstName({ ...firstName, value: e.target.value })} />
                                            {firstName.error.length ?
                                                <small className='text-danger'>{firstName.error}</small> : ''
                                            }
                                        </div>
                                        {/* <!-- Form Group (Last name)--> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                            <input className={`form-control ${lastName.error.length ? 'border-danger' : ''}`} id="inputLastName" type="text" placeholder="Enter your last name" value={lastName.value} onChange={(e) => setLastName({ ...lastName, value: e.target.value })} />
                                            {lastName.error.length ?
                                                <small className='text-danger'>{lastName.error}</small> : ''
                                            }
                                        </div>
                                    </div>
                                    {/* <!-- Form Group (Email)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                        <input className={`form-control ${email.error ? 'border-danger' : ''}`} id="inputEmailAddress" type="email" placeholder="Enter your email address" value={email.value} onChange={(e) => setEmail({ ...email, value: e.target.value })} />
                                        {email.error ?
                                            <small className='text-danger'>{email.error}</small> : ''
                                        }
                                    </div>
                                    {/* <!-- Form Group (Password))--> */}
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="password">Password</label>
                                            <input className={`form-control ${password.error ? 'border-danger' : ''}`} id="password" type="password" placeholder="Enter Password" value={password.value} onChange={(e) => setPassword({ ...password, value: e.target.value })} />
                                            {password.error.length ?
                                                <small className='text-danger'>{password.error}</small> : ''
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="currentPassword"> Current Password</label>
                                            <input className={`form-control ${confirmPassword.error.length ? 'border-danger' : ''}`} id="currentPassword" type="password" placeholder="Enter current password" value={confirmPassword.value} onChange={(e) => setConfirmPassword({ ...confirmPassword, value: e.target.value })} />
                                            {confirmPassword.error.length ?
                                                <small className='text-danger'>{confirmPassword.error.length}</small> : ''
                                            }
                                        </div>
                                    </div>
                                    {/* <!-- Form Group (Status))--> */}
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="StatusUser">Status User</label>
                                            <select className="form-select" aria-label="Default select example" value={status} onChange={(e) => { setStatus(e.target.value) }} >
                                                {/* <option selected>Select Status User</option> */}
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="StatusUser">Role User</label>
                                            <select className="form-select" aria-label="Default select example" value={role} onChange={(e) => { setRole(e.target.value) }} >
                                                {/* <option selected>Select Role User</option> */}
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

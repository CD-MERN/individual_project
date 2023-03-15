import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../Navbar';
import Footer from '../Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const List = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers()
    }, []);

    const navigate = useNavigate()


    const fetchUsers = () => {
        axios.get('http://localhost:8000/api/users', { withCredentials: true })
            .then((response) => {
                setUsers(response.data.users)
            })
            .catch((error) => console.log("Error", error));
    }
    return (
        <>
            <Navbar></Navbar>
            <h3 className='text-center'>Users</h3>
            <div className='container'>
                <div className='card'>
                    <div className='card-body'>
                        <table className="table table-hover table-striped table-sm table-borderless">
                            <thead>
                                <tr className='text-center'>
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className="text-center">
                                        <th>{index + 1}</th>
                                        <td>{`${user.firstName} ${user.lastName}`}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <span className={`badge ${user.status ? 'bg-success' : 'bg-secondary'}`}>{`${user.status ? 'Active' : 'Inactive'}`}</span>
                                        </td>
                                        <td><span className='d-flex gap-3 justify-content-center'>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip>Edit User</Tooltip>}
                                            >
                                                <Link className='btn btn-warning text-white'
                                                    to={`/admin/user/${user._id}/edit`}
                                                ><FontAwesomeIcon icon={faEdit} /></Link>
                                            </OverlayTrigger>
                                        </span></td>
                                    </tr>

                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default List
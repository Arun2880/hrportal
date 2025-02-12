import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './comman.css';

const SheduleEvent = () => {


    const navigate = useNavigate();
    const handleoneappointment = () => {
        navigate('/oneappointment')
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <div class="card card-custom">
                        <div class="card-img-top">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">One-on-One</h5>
                            <p class="card-text">Let an invitee pick a time to meet with you.</p>
                            <button class="btn btn-custom" onClick={handleoneappointment}>Create</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card card-custom">
                        <div class="card-img-top">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Group</h5>
                            <p class="card-text">Let an invitee pick a time to meet with you.</p>
                            <button class="btn btn-custom">Create</button>
                        </div>
                    </div>
                </div>
                {/* <div class="col-md-3">
                    <div class="card card-custom">
                        <div class="card-img-top">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Group</h5>
                            <p class="card-text">Let an invitee pick a time to meet with you.</p>
                            <button class="btn btn-custom">Create</button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>

    );
};

export default SheduleEvent;

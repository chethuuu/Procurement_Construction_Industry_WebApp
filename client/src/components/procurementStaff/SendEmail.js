import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from "./Loader";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { OrderByID } from "../../Services/SupplierServices";

const SendEmail = (props) => {

    const { id } = useParams("");

    const [OrderID, setOrderID] = useState("");
    const [status, setstatus] = useState("");

    const handleOrderid = (e) => {
        setOrderID(e.target.value);
    };

    const handlestatus = (e) => {
        setstatus(e.target.value);
    };

    const GetTopicData = async () => {
        let data = await OrderByID(id);
        console.log("Update topics", data);
        setOrderID(data?.data?.OrderID);
        setstatus(data?.data?.status);
    };

    useEffect(() => {
        GetTopicData();
    }, []);

    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm(
            "service_24jbmdk",
            "template_mwvhicz",
            e.target,
            "l5NUKPpbvRhbN3ZLl"
        ).then(res => {
            Swal.fire("Congrats", "Successfully Send Email", "success"); {
            }
            console.log(res);
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <div>
                <div className="container shadow my-5 mx-auto w-50">
                    <div className="">
                    </div>
                    <div className="col p-5 mx-auto">
                        <h3 className=" fw-bolder mb-5"><center>Send Status</center></h3>
                        <form onSubmit={sendEmail}>
                            <div class="mb-3">
                                <label for="name" class="form-label">E-mail</label>
                                <input name="lead_no" value='chethanaprasadi2000@gmail.com' type="text" class="form-control" readOnly />
                            </div>
                            <div class="mb-3">
                                <label for="name" class="form-label">Order ID</label>
                                <input name="lead_no" value={OrderID} type="text" class="form-control" required />
                            </div>

                            <div class="mb-3">
                                <label for="interest" class="form-label">Order Status</label>
                                <input name="status_sup" value={status} type="text" class="form-control" id="interest" required />
                            </div>
                            <br />
                            <button type="submit" value="Send" class="btn btn-success w-100 rounded-pill"> Send E-mail </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SendEmail;
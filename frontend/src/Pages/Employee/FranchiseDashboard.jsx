import React, { useEffect, useState } from 'react';
import './franchise.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { FaArrowUp } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import rulebool from "../../images/Dream-rule-book.pdf";
import { TbTruckDelivery } from "react-icons/tb";

const FranchiseDashboard = () => {
    const token = sessionStorage.getItem('token');
    const decodedData = jwtDecode(token);
    const employeeId = decodedData.id;

    const [queryData, setQueryData] = useState(0);

    useEffect(() => {
        Getyourquery();
    }, []);

    const Getyourquery = async () => {
        try {
            const url = `http://hrportal.dreambytesolution.com/employee/getquery/${employeeId}`;
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            };

            const response = await axios.get(url, { headers: headers });
            console.log("Response of query:", response);
            if (response.data && response.data.data) {
                setQueryData(response.data.data.length);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const viewPDF = () => {
        window.open(rulebool, "_blank");
      };
    const cardData = [
        {
            title: "Total Query",
            value: queryData, 
            percentage: "+30%",
            description: "Since last month",
            icon: <MdProductionQuantityLimits />, 
            iconBg: "#3c96ef",
            percentageBg: "bg-light-green",
        },
         {
              title: "Rule Book",
              value: "",
              icon: <TbTruckDelivery />,
              iconBg: "#272729",
              move: viewPDF,
            },
    ];

    return (
        <>
            <PageTitle page={"Employee Dashboard"} />
            <div className="container" style={{ backgroundColor: "#D6E9FC" }}>
                <div className="row">
                    {cardData.map((card, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div
                                className="card position-relative"
                                style={{
                                    boxShadow:
                                        "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "10px",
                                    border: "none",
                                }}
                            >
                                <div
                                    className="icon-wrapper position-absolute"
                                    style={{
                                        backgroundColor: card.iconBg,
                                        width: "65px",
                                        height: "65px",
                                        borderRadius: "20%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        top: "-20px",
                                        right: "15px",
                                        fontSize: "35px",
                                        color: "white",
                                        boxShadow:
                                            "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
                                    }}
                                >
                                    {card.icon}
                                </div>
                                <div className="card-body">
                                    <Link to="#"  onClick={card.move} style={{ textDecoration: "none" }}>
                                        <h6 className="heading">{card.title}</h6>
                                        <h4 className="font-weight-bold title">
                                            {card.value}{" "}
                                            <span className="h6 text-success">
                                                <FaArrowUp />{" "}
                                            </span>
                                        </h4>
                                        <p className="break"></p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FranchiseDashboard;

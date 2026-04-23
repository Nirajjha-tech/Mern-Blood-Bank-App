import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/Api";
import { useSelector } from "react-redux";
import moment from "moment";

const Hospitals = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      // 🔥 SINGLE API
      const res = await API.get("/inventory/get-hospitals");

      if (res?.data?.success) {
        setData(res.data.hospitals|| []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) getData();
  }, [user]);

  return (
    <Layout>
      <div className="container mt-4">
        <table className="table">
<thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.hospitalName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
            </tr>
          ))}
        </tbody>

        </table>
      </div>
    </Layout>
  );
};

export default Hospitals;
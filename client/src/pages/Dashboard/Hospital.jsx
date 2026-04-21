import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/Api";
import moment from "moment";

const Hospital = () => {
  const [data, setData] = useState([]);

  const getHospitals = async () => {
    try {
      const res = await API.get("/inventory/get-hospitals");

      if (res?.data?.success) {
        setData(res.data.hospitals || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((record) => (
              <tr key={record._id}>
                <td>{record.hospital?.hospitalName || "No Name"}</td>
                <td>{record.hospital?.email || "No Email"}</td>
                <td>{record.hospital?.phone || "N/A"}</td>
                <td>{record.hospital?.address || "N/A"}</td>

                <td className="text-nowrap">
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No hospitals found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default Hospital;
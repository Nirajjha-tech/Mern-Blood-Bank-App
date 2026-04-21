import React, { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/Api";
import moment from "moment";

const Donar = () => {
  const [data, setData] = useState([]);

  const getDonars = async () => {
    try {
      const res = await API.get("/inventory/get-donars");

      if (res?.data?.success) {
        setData(res.data.donars || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data?.length > 0 ? (
            data.map((record) => (
              <tr key={record._id}>
                
                {/* Donar info from populated user */}
                <td>{record.donar?.name || "No Name"}</td>
                <td>{record.donar?.email || "No Email"}</td>
                <td>{record.donar?.phone || "N/A"}</td>

                {/* Donation date from inventory */}
                <td className="text-nowrap">
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No donars found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default Donar;
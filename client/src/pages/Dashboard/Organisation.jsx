import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/Api';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Organsiation = () => {
  const { user } = useSelector(state => state.auth)
  const [data, setData] = useState([]);

  const getData = async () => {
    try {

    
      if (user?.role === 'donor') {
        const res = await API.get("/inventory/get-organisations");
        if (res?.data?.success) {
          setData(res.data.organisations || []);
        }
      }

      else if (user?.role === 'hospital') {
  const res = await API.get("/inventory/get-organisations-for-hospital");
  if (res?.data?.success) {
    setData(res.data.organisations || []);
  }
}

      else if (user?.role === 'organisation') {
        const res = await API.get("/inventory/get-inventory?type=out");
        if (res?.data?.success) {
          setData(res.data.inventory|| []);
        }
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

          {/*  HEADER CHANGE BASED ON ROLE */}
          <thead>
            {user?.role === "organisation" ? (
              <tr>
                <th>Type</th>
                <th>Blood Group</th>
                <th>Quantity</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            ) : (
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Date</th>
              </tr>
            )}
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((record) => (
                <tr key={record._id}>

                  {/* 🔥 ORGANISATION VIEW (Inventory) */}
                  {user?.role === "organisation" ? (
                    <>
                      <td>
                        <b style={{
                          color: record?.inventoryType === "in" ? "green" : "red"
                        }}>
                          {record?.inventoryType?.toUpperCase() || "-"}
                        </b>
                      </td>

                      <td>{record?.bloodgroup || "-"}</td>
                      <td>{record?.quantity || "-"}</td>

                      <td>
                        {
                           record?.hospital?.email || "-"}
                      </td>

                      <td>
                        {record?.createdAt
                          ? moment(record.createdAt).format("DD/MM/YYYY hh:mm A")
                          : "-"}
                      </td>
                    </>
                  ) : (

                    <>
                      <td>{record?.name || "No Name"}</td>
                      <td>{record?.email || "No Email"}</td>
                      <td>{record?.phone || "N/A"}</td>
                      <td>{record?.address || "N/A"}</td>

                      <td>
                        {record?.createdAt
                          ? moment(record.createdAt).format("DD/MM/YYYY hh:mm A")
                          : "-"}
                      </td>
                    </>
                  )}

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </Layout>
  );
};

export default Organsiation;
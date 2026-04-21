import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/Api';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Organsiation= () => {
  const {user}=useSelector(state=>state.auth)
  const [data, setData] = useState([]);

  const getOrganisations = async () => {
    try {
      if(user?.role==='donor'){
      const res = await API.get("/inventory/get-organisations");

      if (res?.data?.success) {
        setData(res.data.organisations || []);
      }
    }
    if(user?.role==='hospital'){
      const res = await API.get("/inventory/get-organisations-for-hospital");

      if (res?.data?.success) {
        setData(res.data.organisations || []);
      }
    }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganisations();
  }, [user]);

  return (
    <Layout>
      <div className="container mt-4">
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
                <td>{record.name|| "No Name"}</td>
                <td>{record.email || "No Email"}</td>
                <td>{record.phone || "N/A"}</td>
                <td>{record.address || "N/A"}</td>

                <td className="text-nowrap">
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </Layout>
  );
};


export default Organsiation
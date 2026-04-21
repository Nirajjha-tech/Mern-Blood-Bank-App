import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/Api';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Consumer= () => {
  const {user}=useSelector(state=>state.auth);
  const [data, setData] = useState([]);

  const getConsumers = async () => {
    try {
      const res = await API.post("/inventory/get-inventory-hospital",{
        filters:{
            inventoryType:'out',
            hospital:user?._id,
        },
      });

      if (res?.data?.success) {
        setData(res.data.inventory|| []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConsumers();
  }, []);

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th>BloodGroup</th>        
            <th>Inventory Type</th>
            <th>Quantity</th>
            <th>Email</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data?.length > 0 ? (
            data.map((record) => (
              <tr key={record._id}>
                
            
                <td>{record.bloodgroup|| "No group"}</td>
                 <td>{record.inventoryType || "N/A"}</td>
                   <td>{record.quantity || "No Quantity"}</td>
                <td>{record.organisation?.email || "No Email"}</td>
               
              

                {/* Donation date from inventory */}
                <td className="text-nowrap">
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No consumers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
};



export default Consumer
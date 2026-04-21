import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useSelector } from 'react-redux';
import API from '../../services/Api';
import moment from 'moment';

const Donation= () => {
  const {user}=useSelector(state=>state.auth);
  const [data, setData] = useState([]);

  const getDonation = async () => {
    try {
      const res = await API.post("/inventory/get-inventory-donation",{
        filters:{
            inventoryType:'in',
            donar:user?._id,
        },
      });

      if (res?.data?.success) {
        setData(res.data.inventory|| []);
      }
      console.log("User:", user?._id);
console.log("Response:", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonation();
  }, []);

  return (
    
    <Layout>
        <div className="className mt-4">
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
                <td>{record.email || "No Email"}</td>
               
              

                {/* Donation date from inventory */}
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

export default Donation
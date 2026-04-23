import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/Api';
import moment from 'moment';

const OrganisationList = () => {
 
    const [data, setData] = useState([]);
  
    const getDonars = async () => {
      try {
        const res = await API.get("/admin/organisation-list");
  
        if (res?.data?.success) {
          setData(res.data.OrganisationData|| []);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getDonars();
    }, []);
  const handleDelete=async(id)=>{
  try {
    let answer=window.prompt('Are you sure want to delete this organisation',"sure");
    if(!answer) return;
    const {data}=await API.delete(`/admin/delete-organisation/${id}`);
    alert(data?.message);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
    return (
      <Layout>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Action</th>
              
            </tr>
          </thead>
  
          <tbody>
            {data?.length > 0 ? (
              data.map((record) => (
                <tr key={record._id}>
                  <td>{record.organisationName || "No Name"}</td>
                  <td>{record.email || "No Email"}</td>
                  <td>{record.phone || "N/A"}</td>
  
                  {/* Donation date from inventory */}
                  <td className="text-nowrap">
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                  <td><button className="btn btn-danger"onClick={()=>handleDelete(record._id)} >Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Organisation found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Layout>
    );
  };

export default OrganisationList
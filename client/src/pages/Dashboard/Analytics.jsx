import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/Api";

const Analytics = () => {
  const [data, setData] = useState([]);
  const colors=[
    "#A98B76",
    "#46739",
    "#FFEDCE",
    "#FFB090",
    "#454040",
    "#F3BE7A",
    "#FF70BF",
    "#2F2FE4",
  ]
  //Get Blood Group Data 
  const getBloodGroupData = async () => {
    try {
      const res = await API.get("/analytics/bloodGroups-data");
      if (res?.data?.success) {
        setData(res.data.bloodGroupData || []);
        console.log(res.data.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBloodGroupData();
  }, []);
  return (
    <Layout>
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record,i) => (
          <div className="card m-3 p-2" 
          key={i}
          style={{ width: "18rem",backgroundColor:`${colors[i]}` }}>
           
            <div className="card-body">
              <h5 className="card-title bg-light text-dark text-center">{record?.bloodGroup} </h5>
              <p className="card-text text-center  p-0">
               Total In:<b>{record.totalIn}</b>(ML)
              </p>
             <p className="card-text text-center">
               Total Out:<b>{record.totalOut}</b>(ML)
              </p>         
            </div>
            <div className="card-footer text-light bg-dark text-center">
                Total-Available:<b>{record?.availableBlood}</b>(ML)
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Analytics;

import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableUserData from "../Components/TableUserData";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [graphData, setGraphData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  //   console.log(data);

  const navigate = useNavigate();

  // fetching data from firebase...(the whole data not specific user data)
  // snapshot = querySnapshot = data
  const fetchUserData = () => {
    const resultRef = db.collection("Results");
    const { uid } = auth.currentUser;
    let tempData = [];
    let tempGraphData = [];
    resultRef
      .where("userId", "==", uid)
      .orderBy('timeStamp', 'desc')
      .get()
      .then((snapshot) => {
        // console.log(snapshot);
        snapshot.docs.forEach((doc) => {
          // remember: this is not the user specific data..
          tempData.push({ ...doc.data() });
          tempGraphData.push([
            doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
            doc.data().wpm,
          ]);
        });
        setData(tempData);
        setGraphData(tempGraphData.reverse());
        setDataLoading(false);
      });
  };

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    } else if (!loading && !user) {
      navigate("/");
    }
  }, [loading]);

  // Loader component from material UI..
  if (loading || dataLoading) {
    return <div className="loading-of-screen"><CircularProgress size={100}/></div>;
  }

  return (
    <div className="canvas">
      <UserInfo totalTests={data.length}/>
      <div className="graph-container">
        <Graph graphData={graphData} />
      </div>
      <div className="table-container">
        <TableUserData data={data} />
      </div>
    </div>
  );
};

export default UserPage;

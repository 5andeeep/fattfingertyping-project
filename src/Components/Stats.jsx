import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";

// Statistic of every user (wmp, accuracy, )
const Stats = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData,
}) => {

  // logic to remove redundent value for graph data.. if we get any
  // however we were getting clean data without redundency..but still just to try this logic..
  let timeSet = new Set();
  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  // pushing data inside fireStore of firebase ( for that we are using 'db' reference to enter in the database of every user's datastore)
  // for example:-
  // db is users => collection is singleUser => document is singleUser Data
  const pushDataToDb = () => {
    //if user didn't type single word it means that that is an invalid test, so
    // data should not be saved in that case, how can we know?
    // if accuracy === NaN it means user didn't type any word.
    if (isNaN(accuracy)) {
      toast.error("Invalid Test", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const resultRef = db.collection("Results");
      const { email, uid } = auth.currentUser; // user id of every user
      resultRef
        .add({
          wpm: wpm,
          accuracy: accuracy,
          timeStamp: new Date(),
          characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
          userId: uid,
          userEmail: email,
        })
        .then((res) => {
          toast.success("Data saved successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        })
        .catch((err) => {
          toast.error(errorMapping[err.code] || "Not able to save data!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    }
  };

  // calling pushDataToDb function along with it we are checking if user logged in then only data should be saved otherwise we can give one notification that login to save your data.
  useEffect(() => {
    if (auth.currentUser) {
      pushDataToDb();
    } else {
      toast.warning("Login to save your data", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, []);

  const handleRestartBtn = () => {
    window.location.reload();
  }

  return (
    <div className="stats-box">
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{isNaN(accuracy) ? 0 : accuracy}%</div>
        <div className="title">Characters</div>
        <div className="subtitle">
          {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
        </div>
        <div className="restart-btn" onClick={handleRestartBtn}>
          <ReplayCircleFilledIcon
            style={{ fontSize: "28px", cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="right-stats">
        {/* for graphs */}
        <Graph graphData={newGraph} />
      </div>
    </div>
  );
};

export default Stats;

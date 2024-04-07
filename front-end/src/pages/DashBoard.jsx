import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DashBoard.module.scss";

function DashBoard() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/dash-board")
      .then((res) => {
        if (res.data.status) {
          setAuth(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {auth && (
        <div className={styles.dashBoard__container}>
          <p>User dashBoard</p>
        </div>
      )}
    </>
  );
}
export default DashBoard;

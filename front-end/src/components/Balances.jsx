import UsdWallet from "./UsdWallet";
import GbpWallet from "./GbpWallet";
import EurWallet from "./EurWallet";
import InrWallet from "./InrWallet";

import AddUsd from "./AddUsd";
import AddGBP from "./AddGBP";
import AddINR from "./AddINR";
import AddEUR from "./AddEUR";

import SendUSD from "./SendUSD";
import SendGBP from "./SendGBP";
import SendEUR from "./SendEUR";
import SendINR from "./SendINR";

import styles from "./Balances.module.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Balances() {
  const [addUsd, setAddUsd] = useState(false);
  const [addGbp, setAddGbp] = useState(false);
  const [addEur, setAddEur] = useState(false);
  const [addInr, setAddInr] = useState(false);

  const [sendUsd, setSendUsd] = useState(false);
  const [sendGbp, setSendGbp] = useState(false);
  const [sendEur, setSendEur] = useState(false);
  const [sendInr, setSendInr] = useState(false);

  const [usd, setUsd] = useState();
  const [gbp, setGbp] = useState();
  const [eur, setEur] = useState();
  const [inr, setInr] = useState();

  function handleSendUsd(send) {
    setSendUsd(send);
  }

  function handleAddUsd(add) {
    setAddUsd(add);
  }

  function handleSendGbp(send) {
    setSendGbp(send);
  }

  function handleAddGbp(add) {
    setAddGbp(add);
  }

  function handleSendEur(send) {
    setSendEur(send);
  }

  function handleAddEur(add) {
    setAddEur(add);
  }

  function handleSendInr(send) {
    setSendInr(send);
  }

  function handleAddInr(add) {
    setAddInr(add);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/dash-board")
      .then((res) => {
        if (res.data.status) {
          setUsd(res.data.user.accountBalances.USD);
          setGbp(res.data.user.accountBalances.GBP);
          setInr(res.data.user.accountBalances.INR);
          setEur(res.data.user.accountBalances.EUR);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.balances__container}>
      {sendUsd && <SendUSD send={handleSendUsd} />}
      {addUsd && <AddUsd add={handleAddUsd} />}
      {sendGbp && <SendGBP send={handleSendGbp} />}
      {addGbp && <AddGBP add={handleAddGbp} />}
      {sendEur && <SendEUR send={handleSendEur} />}
      {addEur && <AddEUR add={handleAddEur} />}
      {sendInr && <SendINR send={handleSendInr} />}
      {addInr && <AddINR add={handleAddInr} />}

      {!addUsd &&
        !sendUsd &&
        !sendGbp &&
        !addGbp &&
        !sendEur &&
        !addEur &&
        !sendInr &&
        !addInr && (
          <>
            <UsdWallet send={handleSendUsd} add={handleAddUsd} amount={usd} />
            <GbpWallet send={handleSendGbp} add={handleAddGbp} amount={gbp} />
            <EurWallet send={handleSendEur} add={handleAddEur} amount={eur} />
            <InrWallet send={handleSendInr} add={handleAddInr} amount={inr} />
          </>
        )}
    </div>
  );
}

export default Balances;

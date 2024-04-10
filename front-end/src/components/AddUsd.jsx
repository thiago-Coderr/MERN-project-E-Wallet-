import styles from "./AddMoney.module.scss";
import UsRoundFlag from "./UsRoundFlag";
import IconClose from "./IconClose";
import Paypal from "./Paypal";
import ApplePay from "./ApplePay";
import Amazon from "./Amazon";
import ArrowLeft from "./ArrowLeft";
import React, { useState } from "react";

import SuccessIcon from "./SuccessIcon";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function AddUsd({ add }) {
  const [paypal, setPaypal] = useState(false);
  const [applepay, setApplepay] = useState(false);
  const [amazon, setAmazon] = useState(false);

  const [formStatus, setFormStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("*Wrong email format*")
      .required("*Email is required*"),
    amount: yup
      .number()
      .positive("*Amount should be positive number*")
      .required("*Amount is required*"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handlePaypal() {
    setPaypal(true);
  }

  function handleApplePay() {
    setApplepay(true);
  }

  function handleVisa() {
    setAmazon(true);
  }

  function handleAddUsd() {
    add(false);
  }

  function onSubmitPaypalUsd(data) {
    axios
      .post("http://localhost:8000/auth/addUsdPaypal", {
        email: data.email,
        amount: data.amount,
      })
      .then((res) => {
        if (res.data.status) {
          console.log(res.data);
        }

        setFormStatus(res.data.status);
        setMessage(res.data.message);
        setSuccess(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onSubmitApplePayUsd(data) {
    axios
      .post("http://localhost:8000/auth/addUsdApplePay", {
        email: data.email,
        amount: data.amount,
      })
      .then((res) => {
        if (res.data.status) {
          console.log(res.data);
        }

        setFormStatus(res.data.status);
        setMessage(res.data.message);
        setSuccess(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onSubmitAmazonUsd(data) {
    axios
      .post("http://localhost:8000/auth/addUsdAmazon", {
        email: data.email,
        amount: data.amount,
      })
      .then((res) => {
        if (res.data.status) {
          console.log(res.data);
        }

        setFormStatus(res.data.status);
        setMessage(res.data.message);
        setSuccess(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.add_container}>
      <div className={styles.add_container_icon}>
        <UsRoundFlag />
      </div>
      <div onClick={handleAddUsd} className={styles.add_container_iconClose}>
        <IconClose />
      </div>
      <div className={styles.add_container_content}>
        {!paypal && !applepay && !amazon && (
          <h2 className={styles.title}>Select method</h2>
        )}

        <div className={styles.payments}>
          {!paypal && !applepay && !amazon && (
            <>
              <div onClick={handlePaypal} className={styles.payments_method}>
                <Paypal />
              </div>
              <div onClick={handleApplePay} className={styles.payments_method}>
                <ApplePay />
              </div>
              <div onClick={handleVisa} className={styles.payments_method}>
                <Amazon />
              </div>
            </>
          )}

          {paypal && (
            <>
              {success ? (
                <div className={styles.add_container_content_add}>
                  <SuccessIcon />
                  <p>{message}</p>
                </div>
              ) : (
                <>
                  <div className={styles.payments_addNow}>
                    <Paypal />
                  </div>

                  <div
                    onClick={() => {
                      setPaypal(false);
                    }}
                    className={styles.payments_arrow}
                  >
                    <ArrowLeft />
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmitPaypalUsd)}
                    className={styles.form_container}
                  >
                    {!formStatus && <p className={styles.error}>{message}</p>}

                    <input
                      type="email"
                      placeholder="Your paypal email"
                      {...register("email")}
                      className={styles.form_container_input}
                    />
                    {errors.email && (
                      <p className={styles.error}>{errors.email.message}</p>
                    )}

                    <input
                      type="number"
                      placeholder="Set amount"
                      {...register("amount")}
                      className={styles.form_container_input}
                    />
                    <button className={styles.form_container_btn}>
                      Add amount
                    </button>
                  </form>
                </>
              )}
            </>
          )}

          {applepay && (
            <>
              {success ? (
                <div className={styles.add_container_content_add}>
                  <SuccessIcon />
                  <p>{message}</p>
                </div>
              ) : (
                <>
                  <div className={styles.payments_addNow}>
                    <ApplePay />
                  </div>
                  <div
                    onClick={() => {
                      setApplepay(false);
                    }}
                    className={styles.payments_arrow}
                  >
                    <ArrowLeft />
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmitApplePayUsd)}
                    className={styles.form_container}
                  >
                    {!formStatus && <p className={styles.error}>{message}</p>}

                    <input
                      type="email"
                      placeholder="Your Apple pay email"
                      {...register("email")}
                      className={styles.form_container_input}
                    />
                    {errors.email && (
                      <p className={styles.error}>{errors.email.message}</p>
                    )}

                    <input
                      type="number"
                      placeholder="Set amount"
                      {...register("amount")}
                      className={styles.form_container_input}
                    />
                    <button className={styles.form_container_btn}>
                      Add amount
                    </button>
                  </form>
                </>
              )}
            </>
          )}

          {amazon && (
            <>
              {success ? (
                <div className={styles.add_container_content_add}>
                  <SuccessIcon />
                  <p>{message}</p>
                </div>
              ) : (
                <>
                  <div className={styles.payments_addNow}>
                    <Amazon />
                  </div>
                  <div
                    onClick={() => {
                      setAmazon(false);
                    }}
                    className={styles.payments_arrow}
                  >
                    <ArrowLeft />
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmitAmazonUsd)}
                    className={styles.form_container}
                  >
                    <input
                      type="email"
                      placeholder="Your Amazon email"
                      {...register("email")}
                      className={styles.form_container_input}
                    />
                    {errors.email && (
                      <p className={styles.error}>{errors.email.message}</p>
                    )}

                    <input
                      type="number"
                      placeholder="Set amount"
                      {...register("amount")}
                      className={styles.form_container_input}
                    />

                    <button className={styles.form_container_btn}>
                      Add amount
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddUsd;

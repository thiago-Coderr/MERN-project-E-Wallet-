import styles from "./AddMoney.module.scss";
import EuRoundFlag from "./EuRoundFlag";
import IconClose from "./IconClose";
import Wise from "./Wise";
import GooglePay from "./GooglePay";
import Paypal from "./Paypal";
import ArrowLeft from "./ArrowLeft";
import React, { useState } from "react";

import SuccessIcon from "./SuccessIcon";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function AddEUR({ add }) {
  const [wise, setWise] = useState(false);
  const [googlepay, setGooglepay] = useState(false);
  const [paypal, setPaypal] = useState(false);

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

  function handleWise() {
    setWise(true);
  }

  function handleGooglepay() {
    setGooglepay(true);
  }

  function handleAddEur() {
    add(false);
  }

  function onSubmitWiseEur(data) {
    axios
      .post("http://localhost:8000/auth/addEurWise", {
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

  function onSubmitGpayEur(data) {
    axios
      .post("http://localhost:8000/auth/addEurGpay", {
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

  function onSubmitPaypalEur(data) {
    axios
      .post("http://localhost:8000/auth/addEurPaypal", {
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
        <EuRoundFlag />
      </div>
      <div onClick={handleAddEur} className={styles.add_container_iconClose}>
        <IconClose />
      </div>
      <div className={styles.add_container_content}>
        {!paypal && !wise && !googlepay && (
          <h2 className={styles.title}>Select method</h2>
        )}

        <div className={styles.payments}>
          {!paypal && !wise && !googlepay && (
            <>
              <div onClick={handleWise} className={styles.payments_method}>
                <Wise />
              </div>
              <div onClick={handleGooglepay} className={styles.payments_method}>
                <GooglePay />
              </div>
              <div onClick={handlePaypal} className={styles.payments_method}>
                <Paypal />
              </div>
            </>
          )}

          {wise && (
            <>
              {success ? (
                <div className={styles.add_container_content_add}>
                  <SuccessIcon />
                  <p>{message}</p>
                </div>
              ) : (
                <>
                  <div className={styles.payments_wise}>
                    <Wise />
                  </div>

                  <div
                    onClick={() => {
                      setWise(false);
                    }}
                    className={styles.payments_arrow}
                  >
                    <ArrowLeft />
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmitWiseEur)}
                    className={styles.form_container}
                  >
                    {!formStatus && <p className={styles.error}>{message}</p>}

                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Your Wise email"
                      className={styles.form_container_input}
                    />
                    {errors.email && (
                      <p className={styles.error}>{errors.email.message}</p>
                    )}

                    <input
                      type="number"
                      {...register("amount")}
                      placeholder="Set amount"
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

          {googlepay && (
            <>
              {success ? (
                <div className={styles.add_container_content_add}>
                  <SuccessIcon />
                  <p>{message}</p>
                </div>
              ) : (
                <>
                  <div className={styles.payments_addNow}>
                    <GooglePay />
                  </div>

                  <div
                    onClick={() => {
                      setGooglepay(false);
                    }}
                    className={styles.payments_arrow}
                  >
                    <ArrowLeft />
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmitGpayEur)}
                    className={styles.form_container}
                  >
                    {!formStatus && <p className={styles.error}>{message}</p>}

                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Your Gpay email"
                      className={styles.form_container_input}
                    />
                    {errors.email && (
                      <p className={styles.error}>{errors.email.message}</p>
                    )}

                    <input
                      type="number"
                      {...register("amount")}
                      placeholder="Set amount"
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
                    onSubmit={handleSubmit(onSubmitPaypalEur)}
                    className={styles.form_container}
                  >
                    {!formStatus && <p className={styles.error}>{message}</p>}

                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Your Paypal email"
                      className={styles.form_container_input}
                    />
                    {errors.email && (
                      <p className={styles.error}>{errors.email.message}</p>
                    )}

                    <input
                      type="number"
                      {...register("amount")}
                      placeholder="Set amount"
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

export default AddEUR;

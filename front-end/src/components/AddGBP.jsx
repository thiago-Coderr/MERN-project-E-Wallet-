import styles from "./AddMoney.module.scss";
import UkRoundFlag from "./UkRoundFlag";
import IconClose from "./IconClose";
import Payoneer from "./Payoneer";
import Revolut from "./Revolut";
import Amazon from "./Amazon";
import ArrowLeft from "./ArrowLeft";
import React, { useState } from "react";

import SuccessIcon from "./SuccessIcon";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function AddGBP({ add }) {
  const [revolut, setRevolut] = useState(false);
  const [payoneer, setPayoneer] = useState(false);
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

  function handleRevolut() {
    setRevolut(true);
  }

  function handlePayoneer() {
    setPayoneer(true);
  }

  function handleVisa() {
    setAmazon(true);
  }

  function handleAddGbp() {
    add(false);
  }

  function onSubmitPayoneerGbp(data) {
    axios
      .post("http://localhost:8000/auth/addGbpPayoneer", {
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

  function onSubmitRevolutGbp(data) {
    axios
      .post("http://localhost:8000/auth/addGbpRevolut", {
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

  function onSubmitAmazonGbp(data) {
    axios
      .post("http://localhost:8000/auth/addGbpAmazon", {
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
        <UkRoundFlag />
      </div>
      <div onClick={handleAddGbp} className={styles.add_container_iconClose}>
        <IconClose />
      </div>
      <div className={styles.add_container_content}>
        {!revolut && !payoneer && !amazon && (
          <h2 className={styles.title}>Select method</h2>
        )}

        <div className={styles.payments}>
          {!revolut && !payoneer && !amazon && (
            <>
              <div onClick={handlePayoneer} className={styles.payments_method}>
                <Payoneer />
              </div>
              <div onClick={handleRevolut} className={styles.payments_method}>
                <Revolut />
              </div>
              <div onClick={handleVisa} className={styles.payments_method}>
                <Amazon />
              </div>
            </>
          )}

          {payoneer && (
            <>
              {success ? (
                <div className={styles.add_container_content_add}>
                  <SuccessIcon />
                  <p>{message}</p>
                </div>
              ) : (
                <>
                  <div className={styles.payments_addNow}>
                    <Payoneer />
                  </div>

                  <div
                    onClick={() => {
                      setPayoneer(false);
                    }}
                    className={styles.payments_arrow}
                  >
                    <ArrowLeft />
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmitPayoneerGbp)}
                    className={styles.form_container}
                  >
                    {!formStatus && <p className={styles.error}>{message}</p>}

                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Your Payoneer email"
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

          {revolut && (
            <>
              {success ? (
                <div className={styles.add_container_content_add}>
                  <SuccessIcon />
                  <p>{message}</p>
                </div>
              ) : (
                <>
                  <div className={styles.payments_addNow}>
                    <Revolut />
                  </div>

                  <div
                    onClick={() => {
                      setRevolut(false);
                    }}
                    className={styles.payments_arrow}
                  >
                    <ArrowLeft />
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmitRevolutGbp)}
                    className={styles.form_container}
                  >
                    {!formStatus && <p className={styles.error}>{message}</p>}

                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Your Revolut email"
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
                    onSubmit={handleSubmit(onSubmitAmazonGbp)}
                    className={styles.form_container}
                  >
                    {!formStatus && <p className={styles.error}>{message}</p>}

                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Your Amazon email"
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

export default AddGBP;

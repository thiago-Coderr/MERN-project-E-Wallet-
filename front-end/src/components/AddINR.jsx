import styles from "./AddMoney.module.scss";
import InRoundFlag from "./InRoundFlag";
import IconClose from "./IconClose";
import Paytm from "./Paytm";
import Phonepe from "./Phonepe";
import ArrowLeft from "./ArrowLeft";
import { useState } from "react";

import SuccessIcon from "./SuccessIcon";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function AddINR({ add }) {
  const [paytm, setPaytm] = useState(false);
  const [phonepe, setPhone] = useState(false);

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

  function handlePaytm() {
    setPaytm(true);
  }

  function handlePhonepe() {
    setPhone(true);
  }

  function handleAddInr() {
    add(false);
  }

  function onSubmitPaytmInr(data) {
    axios
      .post("http://localhost:8000/auth/addInrPaytm", {
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

  function onSubmitPhonepeInr(data) {
    axios
      .post("http://localhost:8000/auth/addInrPhonepe", {
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
        <InRoundFlag />
      </div>
      <div onClick={handleAddInr} className={styles.add_container_iconClose}>
        <IconClose />
      </div>
      <div className={styles.add_container_content}>
        {!paytm && !phonepe && <h2 className={styles.title}>Select method</h2>}

        <div className={styles.payments}>
          {!paytm && !phonepe && (
            <>
              <div onClick={handlePaytm} className={styles.payments_method}>
                <Paytm />
              </div>
              <div onClick={handlePhonepe} className={styles.payments_method}>
                <Phonepe />
              </div>
            </>
          )}

          {paytm && (
            <>
              {success ? (
                <div className={styles.add_container_content_add}>
                  <SuccessIcon />
                  <p>{message}</p>
                </div>
              ) : (
                <>
                  <div className={styles.payments_addNow}>
                    <Paytm />
                  </div>

                  <div
                    onClick={() => {
                      setPaytm(false);
                    }}
                    className={styles.payments_arrow}
                  >
                    <ArrowLeft />
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmitPaytmInr)}
                    className={styles.form_container}
                  >
                    {!formStatus && <p className={styles.error}>{message}</p>}

                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Your UPI email"
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

          {phonepe && (
            <>
              {success ? (
                <div className={styles.add_container_content_add}>
                  <SuccessIcon />
                  <p>{message}</p>
                </div>
              ) : (
                <>
                  <div className={styles.payments_addNow}>
                    <Phonepe />
                  </div>

                  <div
                    onClick={() => {
                      setPhone(false);
                    }}
                    className={styles.payments_arrow}
                  >
                    <ArrowLeft />
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmitPhonepeInr)}
                    className={styles.form_container}
                  >
                    {!formStatus && <p className={styles.error}>{message}</p>}

                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Your UPI email"
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

export default AddINR;

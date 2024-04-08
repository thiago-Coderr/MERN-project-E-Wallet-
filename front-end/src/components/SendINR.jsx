import styles from "./SendMoney.module.scss";
import InRoundFlag from "./InRoundFlag";
import IconClose from "./IconClose";
import SuccessIcon from "./SuccessIcon";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function SendINR({ send }) {
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
      .required(),
  });

  const {
    transfer,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSendInr() {
    send(false);
  }

  function onSubmit(data) {
    axios
      .post("http://localhost:8000/auth/sendInr", {
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
    <div className={styles.send_container}>
      <div className={styles.send_container_icon}>
        <InRoundFlag />
      </div>
      <div onClick={handleSendInr} className={styles.send_container_iconClose}>
        <IconClose />
      </div>
      <div className={styles.send_container_content}>
        {success ? (
          <div className={styles.send_container_content_sent}>
            <SuccessIcon />
            <p>Amount successfully sent</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Send INR</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form_container}
            >
              {!formStatus && <p className={styles.error}>{message}</p>}

              <input
                type="email"
                placeholder="Receiver email"
                {...transfer("email")}
                className={styles.form_container_input}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}

              <input
                type="number"
                placeholder="Set amount"
                {...transfer("amount")}
                className={styles.form_container_input}
              />
              <button className={styles.form_container_btn}>Send</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default SendINR;

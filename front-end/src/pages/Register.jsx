import styles from "./Register.module.scss";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import * as yup from "yup";
import IconClose from "../components/IconClose";

function Register() {
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("*Username is required*"),
    email: yup
      .string()
      .email("*Wrong email format*")
      .required("*Email is required*"),
    password: yup.string().min(6).max(10).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "*Passwords don't match*")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8000/auth/signup", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.status) {
          alert("Account created successfully!");
          navigate("/login");
        }
        setFormStatus(res.data.status);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(data);
  };

  return (
    <div className={styles.register__container}>
      <div className={styles.nav__container}>
        <NavLink to="/" className={styles.nav__container__logo}>
          PayMe<span className={styles.nav__container__dot}>.</span>
        </NavLink>

        <NavLink to="/" className={styles.nav__container__logo__close}>
          <IconClose />
        </NavLink>
      </div>
      <div className={styles.header__text}>
        <h2 className={styles.header__text__main}>
          Welcome to money without borders
          <span className={styles.header__text__main__style}>.</span>
        </h2>
        <p className={styles.header__text__second}>
          Already signed up?{" "}
          <Link to="/login" className={styles.header__text__second__link}>
            Log in
          </Link>
        </p>
      </div>

      <div className={styles.signup__container}>
        <form
          className={styles.signup__container__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          {!formStatus && <p className={styles.error}>{message}</p>}
          <input
            className={styles.signup__container__form__input}
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}

          <input
            className={styles.signup__container__form__input}
            type="email"
            placeholder="Your email address"
            {...register("email")}
          />

          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <input
            className={styles.signup__container__form__input}
            type="password"
            placeholder="Create a password"
            {...register("password")}
          />

          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          <input
            className={styles.signup__container__form__input}
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}

          <button type="submit" className={styles.signup__container__form__btn}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

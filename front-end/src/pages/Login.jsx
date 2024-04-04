import styles from "./Login.module.scss";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IconClose from "../components/IconClose";

function Login() {
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState(false);

  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("*Wrong email format*")
      .required("*Email is required*"),
    password: yup.string().min(6).max(10).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  axios.defaults.withCredentials = true;

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8000/auth/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.status) {
          console.log(res.data);
          navigate("/dash-board");
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
    <div className={styles.login__container}>
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
          Welcome back
          <span className={styles.header__text__main__style}>!</span>
        </h2>
        <p className={styles.header__text__second}>
          New to PayMe?{" "}
          <Link to="/register" className={styles.header__text__second__link}>
            Register
          </Link>
        </p>
      </div>

      <div className={styles.login__container}>
        <form
          className={styles.login__container__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          {!formStatus && <p className={styles.error}>{message}</p>}
          <input
            className={styles.login__container__form__input}
            type="email"
            placeholder="Your email address"
            {...register("email")}
          />

          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <input
            className={styles.login__container__form__input}
            type="password"
            placeholder="Password"
            {...register("password")}
          />

          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          <button type="submit" className={styles.login__container__form__btn}>
            Login
          </button>
        </form>
        <Link
          to="/forgot-password"
          className={styles.login__container__password}
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

export default Login;

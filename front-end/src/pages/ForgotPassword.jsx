import styles from "./ForgotPassword.module.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("*Wrong email format*")
      .required("*Email is required*"),
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
      .post("http://localhost:8000/auth/forgot-password", {
        email: data.email,
      })
      .then((res) => {
        if (res.data.status) {
          alert("Chech you email dashboard for reset password link");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(data);
  };

  return (
    <div className={styles.forgot__container}>
      <div className={styles.nav__container}>
        <NavLink to="/" className={styles.nav__container__logo}>
          PayMe<span className={styles.nav__container__dot}>.</span>
        </NavLink>

        <NavLink to="/" className={styles.nav__container__logo__close}>
          <svg
            className="close__icon"
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="white" />
            <path
              d="M7 17L16.8995 7.10051"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 7.00001L16.8995 16.8995"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </NavLink>
      </div>

      <div className={styles.header__text}>
        <h2 className={styles.header__text__main}>
          Forgot password
          <span className={styles.header__text__main__style}>?</span>
        </h2>
      </div>

      <div className={styles.login__container}>
        <form
          className={styles.login__container__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className={styles.login__container__form__input}
            type="email"
            placeholder="Your email address"
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <button className={styles.login__container__form__btn}>Reset</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

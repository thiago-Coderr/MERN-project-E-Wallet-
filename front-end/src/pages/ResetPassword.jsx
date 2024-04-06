import styles from "./ResetPassword.module.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const schema = yup.object().shape({
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

  axios.defaults.withCredentials = true;

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:8000/auth/reset-password/${token}`, {
        password: data.password,
      })
      .then((res) => {
        if (res.data.status) {
          alert(res.data.message);
          navigate("/login");
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.reset__container}>
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
          Reset password
          <span className={styles.header__text__main__style}>.</span>
        </h2>
      </div>

      <div className={styles.login__container}>
        <form
          className={styles.login__container__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className={styles.login__container__form__input}
            type="password"
            placeholder="New password"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          <input
            className={styles.login__container__form__input}
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}

          <button type="submit" className={styles.login__container__form__btn}>
            Set new password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

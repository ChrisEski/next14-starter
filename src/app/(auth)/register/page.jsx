import { register } from "@/lib/actions";
import styles from "./register.module.css";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          action={register}
        >
          <input
            type="text"
            placeholder="username"
            name="username"
          />
          <input
            type="email"
            placeholder="email"
            name="email"
          />
          <input
            type="password"
            placeholder="password"
            name="password"
          />
          <input
            type="password"
            placeholder="password again"
            name="passwordRepeat"
          />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

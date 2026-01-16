import { type ReactNode } from "react";
import styles from "./AuthLayout.module.css";
import logo from "../../assets/img/logo.png"; 

interface Props {
  children: ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>{children}</div>

      <div className={styles.right}>
        <div className={styles.titleContainer}>
          <img src={logo} alt="MedVault Logo" className={styles.logo} />
          <h1>
            Witaj w <span>MedVault</span>
          </h1>
        </div>

        <p>
          Twoim  bezpiecznym systemie do deponowania i audytowania elektronicznej dokumentacji medycznej e-EDM 
        </p>
      </div>
    </div>
  );
};

import styles from "./index.module.scss";

export default function Spinner() {
  return (
    <div className={styles.spinner} role="status">
      <span></span>
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.scss";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const NotFound = ({ message }: { message: string }) => {
  return (
    <div className={styles.noItems}>
      <FontAwesomeIcon icon={faFaceFrown} />
      <span className={styles.mainText}>{message}</span>
      <Link href="/">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;

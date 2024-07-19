import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.scss";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export interface NotFoundProps {
  message: string;
}
/**
 * Card para mostrar un mensaje de error o 404
 *
 * @component
 * @param message - Mensaje de error
 */
const NotFound = ({ message }: NotFoundProps) => {
  return (
    <div className={styles.noItems}>
      <FontAwesomeIcon data-testid="face-icon" icon={faFaceFrown} />
      <span className={styles.mainText}>{message}</span>
      <Link role="link" href="/">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;

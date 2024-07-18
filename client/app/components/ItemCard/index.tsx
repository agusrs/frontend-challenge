import Image from "next/image";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CurrencyNumber from "../CurrencyNumber";

const ItemCard = ({ item }: { item: any }) => {
  return (
    <div className={styles.card}>
      <Link href={`/items/${item.id}`} className={styles.picture}>
        <Image
          src={item.picture}
          alt={item.title}
          width={180}
          height={180}
          priority
        />
      </Link>
      <div className={styles.priceContainer}>
        <Link href={`/items/${item.id}`} className={styles.price}>
          <CurrencyNumber
            currency={item.price.currency}
            number={item.price.amount}
            maxDecimals={item.price.decimals}
          />
        </Link>
        {item.free_shipping && (
          <span className={styles.shipping} title="Envío gratis">
            <FontAwesomeIcon icon={faTruck} />
          </span>
        )}
      </div>
      <Link href={`/items/${item.id}`} className={styles.title}>
        <span title={item.title}>{item.title}</span>
      </Link>
      <span className={styles.location}>{item.location}</span>
    </div>
  );
};

export default ItemCard;

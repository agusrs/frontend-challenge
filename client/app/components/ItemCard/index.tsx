import Image from "next/image";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CurrencyNumber from "../CurrencyNumber";
import { Item } from "@/app/types/types";
import noImage from "../../../public/noImage.svg";

/**
 * Componente que renderiza el elemento de la página de items.
 * Muestra valores por defecto cuando al elemento le faltan propiedades.
 *
 * @component
 * @param item
 */
const ItemCard = ({ item }: { item: Item }) => {
  return (
    <div className={styles.card}>
      <Link role="link" href={`/items/${item.id}`} className={styles.picture}>
        <Image
          src={item.picture ?? noImage}
          alt={item.title}
          width={180}
          height={180}
          priority
        />
      </Link>
      <div className={styles.priceContainer}>
        <Link role="link" href={`/items/${item.id}`} className={styles.price}>
          <CurrencyNumber
            currency={item.price.currency ?? "$"}
            number={item.price.amount}
            maxDecimals={item.price.decimals ?? 2}
          />
        </Link>
        {item.free_shipping && (
          <span className={styles.shipping} title="Envío gratis">
            <FontAwesomeIcon icon={faTruck} />
          </span>
        )}
      </div>
      <Link role="link" href={`/items/${item.id}`} className={styles.title}>
        <span title={item.title}>{item.title}</span>
      </Link>
      <span data-testid="location" className={styles.location}>
        {item.location ?? ""}
      </span>
    </div>
  );
};

export default ItemCard;

import Image from "next/image";
import styles from "./index.module.scss";
import translateCondition from "@/app/utils/translateCondition";
import CurrencyNumber from "../CurrencyNumber";
import Link from "next/link";
import { ItemDetail } from "@/app/types/types";
import noImage from "../../../public/noImage.svg";

export interface ItemDetailsProps {
  item: ItemDetail;
}
/**
 * Componente que renderiza el detalle de un item
 * Muestra valores por defecto cuando al elemento le faltan propiedades.
 *
 * @component
 * @param item
 */
const ItemDetails = ({ item }: ItemDetailsProps) => {
  return (
    <div className={styles.details}>
      <Image
        src={item.picture ?? noImage}
        alt={item.title}
        width={680}
        height={680}
        priority
        sizes="100vw"
      />
      <div className={styles.attributes}>
        <span className={styles.condition}>
          {translateCondition(item.condition)}
          {item.sold_quantity && ` - ${item.sold_quantity} vendidos`}
        </span>
        <div className={styles.mainAttributes}>
          <span className={styles.itemTitle}>{item.title}</span>
          <div className={styles.price}>
            <CurrencyNumber
              currency={item.price.currency ?? "$"}
              number={item.price.amount}
              maxDecimals={item.price.decimals ?? 2}
              showNoDecimals
            />
          </div>
          <Link href="/">Comprar</Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;

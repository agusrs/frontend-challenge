import styles from "./index.module.scss";

export interface ItemDescriptionProps {
  description: string;
}

const ItemDescription = ({ description }: ItemDescriptionProps) => {
  return (
    <div className={styles.description}>
      <span className={styles.descriptionTitle}>Descripción del producto</span>
      <p>{description}</p>
    </div>
  );
};

export default ItemDescription;

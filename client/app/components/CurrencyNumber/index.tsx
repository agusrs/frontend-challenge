import styles from "./index.module.scss";

export interface CurrencyNumberProps {
  currency: string;
  number: number;
  maxDecimals?: number;
  showNoDecimals?: boolean;
}

const CurrencyNumber = ({
  currency,
  number,
  maxDecimals = 0,
  showNoDecimals = false,
}: CurrencyNumberProps) => {
  const [integerPart, decimalPart] = number.toFixed(maxDecimals).split(".");

  return (
    <div className={styles.numberContainer}>
      <span className={styles.currency}>{currency}</span>
      {new Intl.NumberFormat("es-AR").format(Number(integerPart))}
      {(showNoDecimals || !Number.isInteger(number)) && (
        <span className={styles.decimals}>{decimalPart}</span>
      )}
    </div>
  );
};

export default CurrencyNumber;

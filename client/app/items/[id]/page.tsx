import Image from "next/image";
import styles from "./page.module.scss";
import translateCondition from "@/app/utils/translateCondition";
import CurrencyNumber from "@/app/components/CurrencyNumber";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { notFound } from "next/navigation";

async function getItem(id: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/items/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch data");
      return;
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch data");
    return;
  }
}

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await getItem(params.id);

  if (!item) {
    console.log("not found");
    notFound();
  }

  return (
    <>
      <Breadcrumbs categories={item.item.categories} disableLast={false} />
      <section className={styles.container}>
        <div className={styles.details}>
          <Image
            src={item.item.picture}
            alt={item.item.title}
            width={680}
            height={680}
            priority
            sizes="100vw"
          />
          <div className={styles.attributes}>
            <span className={styles.condition}>
              {translateCondition(item.item.condition)}
              {item.item.sold_quantity &&
                ` - ${item.item.sold_quantity} vendidos`}
            </span>
            <div className={styles.mainAttributes}>
              <span className={styles.itemTitle}>{item.item.title}</span>
              <div className={styles.price}>
                <CurrencyNumber
                  currency={item.item.price.currency}
                  number={item.item.price.amount}
                  maxDecimals={item.item.price.decimals}
                  showNoDecimals
                />
              </div>
              <Link href="/">Comprar</Link>
            </div>
          </div>
        </div>
        {item.item.description.length > 0 && (
          <div className={styles.description}>
            <span className={styles.descriptionTitle}>
              Descripción del producto
            </span>
            <p>{item.item.description}</p>
          </div>
        )}
      </section>
    </>
  );
}

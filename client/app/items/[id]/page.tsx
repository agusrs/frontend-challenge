import styles from "./page.module.scss";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { notFound } from "next/navigation";
import { GetItemDetailResponse } from "@/app/types/response";
import ItemDetails from "@/app/components/ItemDetails";
import ItemDescription from "@/app/components/ItemDescription";

export async function getItemDetail(
  id: string,
): Promise<GetItemDetailResponse | undefined> {
  try {
    const res = await fetch(`http://localhost:8000/api/items/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Error al buscar producto ${id}`);
      return;
    }

    return res.json();
  } catch (error) {
    console.error(`Error al buscar producto ${id}`);
    return;
  }
}

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await getItemDetail(params.id);

  if (!response) {
    return notFound();
  }

  return (
    <>
      <Breadcrumbs categories={response.item.categories} disableLast={false} />
      <section className={styles.container}>
        <ItemDetails item={response.item} />
        {response.item.description && response.item.description.length > 0 && (
          <ItemDescription description={response.item.description} />
        )}
      </section>
    </>
  );
}

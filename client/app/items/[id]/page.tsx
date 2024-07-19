import styles from "./page.module.scss";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { notFound } from "next/navigation";
import { GetItemDetailResponse } from "@/app/types/response";
import ItemDetails from "@/app/components/ItemDetails";
import ItemDescription from "@/app/components/ItemDescription";
import { getItemDetail } from "@/app/utils/getItemDetail";

/**
 * Página que obtiene y muestra el detalle de un item a través un id como parámetro. Si no logra obtenerlo redirige a una pantalla de error
 *
 * @component
 * @param params
 */
export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const response: GetItemDetailResponse | undefined = await getItemDetail(
    params.id,
  );

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

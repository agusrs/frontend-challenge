import { GetItemsResponse } from "@/app/types/response";
import Breadcrumbs from "../Breadcrumbs";
import ItemCard from "../ItemCard";
import NoItems from "../NotFound";
import Pagination from "../Pagination";
import styles from "./index.module.scss";

/**
 * Devuelve una lista de items dado un query string o el id de una categoria, y opcionalmente un número de página.
 * Si se pasa un query string y una categoria se tomará solo el query string para la búsqueda
 * @param searchParams
 */
export async function getItems(searchParams: {
  [key: string]: string | undefined;
}): Promise<GetItemsResponse | undefined> {
  try {
    const page = Number(searchParams["page"]) || 1;

    if (Object.keys(searchParams).length == 0) return;

    if (page > 250 || page < 1) return;

    let url = new URL(`${process.env.API_URL}/items`);

    if (!searchParams["search"]) {
      searchParams["category"] &&
        url.searchParams.append("category", searchParams["category"]);
    } else {
      url.searchParams.append("q", searchParams["search"]);
    }

    searchParams["page"] && url.searchParams.append("page", page.toString());

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("Error al buscar productos");
      return;
    }

    return res.json();
  } catch (error) {
    console.error("Error al buscar productos");
    return;
  }
}
/**
 * Componente que buscar y muestra la lista de items con sus categorias y su paginación. Muestra un mensaje cuando no se encuentran items
 * @component
 * @param searchParams
 */
export default async function Items({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const response = await getItems(searchParams);

  if (!response || response.items.length == 0)
    return (
      <NoItems message="No se encontraron resultados relacionados a esa búsqueda" />
    );

  return (
    <>
      <Breadcrumbs
        categories={response.categories}
        disableLast={searchParams["category"] !== undefined}
      />
      <section className={styles.container}>
        {response.items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </section>
      <Pagination totalPages={response.pagination.total} />
    </>
  );
}

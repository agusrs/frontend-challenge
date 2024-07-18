import Breadcrumbs from "../Breadcrumbs";
import ItemCard from "../ItemCard";
import NoItems from "../NotFound";
import Pagination from "../Pagination";
import styles from "./index.module.scss";

async function getItems(searchParams: { [key: string]: string | undefined }) {
  try {
    const page = Number(searchParams["page"]) || 1;

    if (Object.keys(searchParams).length == 0) return [];

    if (page > 250 || page < 1) return [];

    let url = new URL("http://localhost:8000/api/items");

    if (!searchParams["search"]) {
      searchParams["category"] &&
        url.searchParams.append("category", searchParams["category"]);
    } else {
      url.searchParams.append("q", searchParams["search"]);
    }

    searchParams["page"] && url.searchParams.append("page", page.toString());

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Error al buscar productos");
    }

    return res.json();
  } catch (error) {
    return new Error("Error al buscar productos");
  }
}

export default async function Items({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { items, categories, pagination } = await getItems(searchParams);

  if (!items || items.length == 0)
    return (
      <NoItems message="No se encontraron resultados relacionados a esa búsqueda" />
    );

  return (
    <>
      {items.length > 0 && (
        <Breadcrumbs
          categories={categories}
          disableLast={searchParams["category"] !== undefined}
        />
      )}
      <section className={styles.container}>
        {items.map((item: any) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </section>
      {items.length > 0 && <Pagination totalPages={pagination.total} />}
    </>
  );
}

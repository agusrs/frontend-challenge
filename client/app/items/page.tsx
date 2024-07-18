import { Suspense } from "react";
import Items from "../components/Items";
import Spinner from "../components/Spinner";

export default function ItemsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <Suspense
      key={`${searchParams["category"]} ${searchParams["search"]} ${searchParams["page"]}`}
      fallback={<Spinner />}
    >
      <Items searchParams={searchParams} />
    </Suspense>
  );
}

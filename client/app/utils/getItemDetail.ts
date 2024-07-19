import { GetItemDetailResponse } from "../types/response";

/**
 * Devuelve el detalle de un item dado un id.
 *
 * @param id
 */
export async function getItemDetail(
  id: string,
): Promise<GetItemDetailResponse | undefined> {
  try {
    const res = await fetch(`${process.env.API_URL}/items/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Error al buscar producto ${id}`);
      return;
    }

    const data = res.json();
    return data;
  } catch (error) {
    console.error(`Error al buscar producto ${id}`);
    return;
  }
}

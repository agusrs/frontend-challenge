/**
 * Devuelve un array con las páginas basado en la página actual y el total.
 *
 * @param   currentPage La página actual del paginado.
 * @param   totalPages El total de páginas.
 * @returns Array con los números de página y strings que representan puntos suspensivos.
 * ```js
 * [1, ..., 6, 7, 8, ..., 10]
 * ```
 */
export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 6 || currentPage <= 5) {
    return Array.from({ length: 6 }, (_, i) => i + 1);
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

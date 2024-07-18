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

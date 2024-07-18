"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import styles from "./index.module.scss";
import { generatePagination } from "@/app/utils/generatePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PaginationItem = ({
  page,
  href,
  isSelected,
}: {
  page: number;
  href: string;
  isSelected: boolean;
}) => {
  return (
    <Link
      className={`${styles.pageItem} ${isSelected ? styles.selected : ""}`}
      href={href}
    >
      {page}
    </Link>
  );
};

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <nav className={styles.nav}>
      {currentPage > 1 && (
        <Link
          className={`${styles.pageItem} ${styles.button}`}
          href={createPageURL(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
      )}
      {allPages.map((page) => {
        return typeof page == "number" ? (
          <PaginationItem
            key={page}
            page={page}
            href={createPageURL(page)}
            isSelected={currentPage == page}
          />
        ) : (
          page
        );
      })}
      {currentPage < totalPages && (
        <Link
          className={`${styles.pageItem} ${styles.button}`}
          href={createPageURL(currentPage + 1)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      )}
    </nav>
  );
};

export default Pagination;

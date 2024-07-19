import { Fragment } from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Category } from "@/app/types/types";

export interface BreadcrumbsProps {
  categories: Category[];
  disableLast?: boolean;
}

/**
 * Componente breadcrumbs para navegar entre categorias
 *
 * @component
 * @param categories - Array de categorias
 * @param disableLast - Deshabilitar navegación en la última categoria
 */
const Breadcrumbs = ({ categories, disableLast = true }: BreadcrumbsProps) => {
  return (
    <section className={styles.breadcrumbs}>
      {categories.map((category, i, arr) => (
        <Fragment key={category.id}>
          <Link
            href={`/items?category=${category.id}`}
            className={`${styles.category} ${disableLast && arr.length - 1 == i ? styles.disableLast : ""}`}
            aria-disabled={disableLast && arr.length - 1 == i}
            tabIndex={disableLast && arr.length - 1 == i ? -1 : undefined}
          >
            {category.name}
          </Link>
          {arr.length - 1 !== i && (
            <FontAwesomeIcon
              icon={faChevronRight}
              data-testid="icon-chevron-right"
            />
          )}
        </Fragment>
      ))}
    </section>
  );
};

export default Breadcrumbs;

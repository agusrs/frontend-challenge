"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

/**
 * Barra de búsqueda. Al buscar navega a /items con el valor del input como searchParam.
 * El input toma como valor inicial el query string de los search params si es que existe
 *
 * @component
 */
const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchValue = searchParams.get("search") ?? "";
    setSearch(searchValue);
  }, [searchParams]);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length == 0) return inputRef.current && inputRef.current.focus();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;
    router.push(`/items?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <form data-testid="form" onSubmit={onSearch} className={styles.form}>
      <input
        ref={inputRef}
        value={search}
        type="text"
        maxLength={120}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Nunca dejes de buscar"
        name="search"
      />
      <button title="Buscar" type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

export default SearchBar;

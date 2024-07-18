import Image from "next/image";
import logo from "../../../public/logo-meli.png";
import SearchBar from "../SearchBar";
import styles from "./index.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link role="link" href="/">
          <Image priority alt="logo" src={logo} className={styles.logo} />
        </Link>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;

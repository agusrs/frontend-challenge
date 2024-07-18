import styles from "./layout.module.scss";

export default function ItemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={styles.main}>{children}</main>;
}

import Link from "next/link";
import ActiveLink from "./ActiveLink";
import { AcademicCapIcon } from "@heroicons/react/outline";

export default function NavBar() {
  const styles = {
    navLink: "cursor-pointer hover:text-blue-400 ml-4",
    activeLink: "text-blue-400",
  };
  return (
    <nav className="flex justify-items-center items-center px-2 py-4 border-b-2 border-blue-500">
      <Link href="/">
        <span className="flex justify-items-center items-center cursor-pointer">
          <AcademicCapIcon className="w-8 h-8" />
          <p className="font-bold">MehInjection</p>
        </span>
      </Link>
      <ActiveLink activeClassName={styles.activeLink} href="/">
        <a className={styles.navLink}>Home</a>
      </ActiveLink>
      <ActiveLink activeClassName={styles.activeLink} href="/profile">
        <a className={styles.navLink}>Profile</a>
      </ActiveLink>
    </nav>
  );
}

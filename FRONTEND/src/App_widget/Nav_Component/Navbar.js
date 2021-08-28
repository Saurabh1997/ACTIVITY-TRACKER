import React, { useEffect, useState } from "react";
import styles from "./Nav.css";

export default function Navbar({ options }) {
  const nav_menu = options.map((menu) => {
    return <li key={menu}>{menu}</li>;
  });

  return (
    <div>
      <ul className={styles.nav}>{nav_menu}</ul>
    </div>
  );
}

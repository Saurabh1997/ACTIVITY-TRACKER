import React, { useEffect, useState } from "react";
import styles from "./Nav.css";
import { Link } from "react-router-dom";

export default function Navbar({ options }) {
  const nav_menu = options.map((menu) => {
    return (
      <li key={menu?.displayName}>
        <Link to={`${menu?.path}`} class={`no-underline`}>
          {menu?.displayName}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <ul className={styles.nav} class={`no-underline`}>
        {nav_menu}
      </ul>
    </div>
  );
}

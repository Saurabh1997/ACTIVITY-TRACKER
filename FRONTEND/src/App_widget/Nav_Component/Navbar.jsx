import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ options }) {
  const nav_menu = options.map((menu) => {
    return (
      <li key={menu?.displayName} className={``}>
        <Link to={`${menu?.path}`}>{menu?.displayName}</Link>
      </li>
    );
  });

  return (
    <div>
      <nav
        className={
          "p-2 m-0 list-none overflow-hidden flex justify-between bg-slate-300"
        }
      >
        {nav_menu}
      </nav>
    </div>
  );
}

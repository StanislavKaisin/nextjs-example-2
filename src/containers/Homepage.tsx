import Link from "next/link";
import React from "react";

const Homepage = () => {
  return (
    <div>
      <h1>Hello</h1>
      <Link href="/people">
        <a>People page</a>
      </Link>
      <br />
      <Link href="/vehicles">
        <a>Vehicles page</a>
      </Link>
    </div>
  );
};
export default Homepage;

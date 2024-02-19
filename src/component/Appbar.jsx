import React from "react";
import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <div className="flex justify-end max-w-7xl px-8 pt-4">
      <Link className="text-white font-semibold hover:text-gray-400" to={"/"}>
        Home
      </Link>
      <Link
        className="text-white font-semibold hover:text-gray-400 ml-4"
        to={"/tickets"}
      >
        My Tickets
      </Link>
    </div>
  );
};

export default Appbar;

import React from "react";

function Header( { brew } ) {
  return (
    <div className="bg-pri text-cuar w-full top-0 flex absolute  text-2xl border-b-4 border-b-ter m-4 p-4">
        Brew it ☕️  <span className="font-extrabold text-2xl text-cuar">{brew}</span>
    </div>
  );
}

export default Header;

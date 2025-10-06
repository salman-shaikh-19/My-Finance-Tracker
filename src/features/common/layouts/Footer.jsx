import React from "react";
import { BiCopyright } from "react-icons/bi";


const Footer = () => {
  return (
 <footer className="hidden lg:flex w-full items-center justify-center bg-base-300 text-base-content p-4 ">
      <aside>
        <p className="text-center text-sm flex items-center gap-1">
           <BiCopyright /> {new Date().getFullYear()} - All rights reserved by
          Finance Tracker Ltd
        </p>
        <p className="text-center text-sm">
          Developed by{" "}
          <a
            href="/test"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Md. Rakibul Islam
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default React.memo(Footer);

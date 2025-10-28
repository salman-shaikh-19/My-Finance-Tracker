import React, { useEffect, useState } from "react";

import { MdGTranslate, MdTranslate } from "react-icons/md";
import { toast } from "react-toastify";

function TranslatePage() {
  const [lang] = useState(() => localStorage.getItem("appLang") || "en");
  let timeToReload = 0;
  useEffect(() => {
    // apply saved language to <html> on load
    document.documentElement.lang = lang;
  }, [lang]);

  const handleClick = () => {
    const newLang = lang === "en" ? "fr" : "en";

    // save language to persist between reload
    localStorage.setItem("appLang", newLang);
    document.documentElement.lang = newLang;

    // console.log(`ang change to: ${newLang}. reloading page...`);
    if (newLang === "fr") {
      timeToReload = 3000;
      toast(
        <span className="flex items-center gap-2">
          <MdGTranslate size={100} className="text-blue-500 text-lg" />
          <span>Language switching...! If the popup doesn’t appear, click the translate icon in your browser’s address bar.</span>
        </span>);
    }
    // reload page to let browser detect the new lang and possibly show translate popup
    setTimeout(() => {
      window.location.reload();
    }, timeToReload);
  };

  return (
    
    <button
      onClick={handleClick}
      className="btn btn-sm btn-outline btn-secondary w-full flex items-center gap-2"

    >
      <MdGTranslate className="text-xl" />
      {lang === "en" ? "Translate App" : "Reset to English"}
    </button>
  
  );
}

export default React.memo(TranslatePage);

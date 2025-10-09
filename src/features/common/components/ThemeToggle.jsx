// import { useSelector, useDispatch } from "react-redux";
// import { setTheme } from "../commonSlice"
// import React from "react";

// const themes = [
//   "light", "dark", "cupcake", "synthwave", "dracula", "forest",
//   "night", "coffee", "winter", "nord", "caramel", "abyss", "sunset",
//   "halloween", "garden", "valentine",
//   "lofi", "emerald", "corporate", "fantasy",
//   "blackforest", "lemonade", "cmyk", "autumn", "dim", "caramellatte"
// ];

// const ThemeToggle = () => {
//   const dispatch = useDispatch();
//   const theme = useSelector((state) => state.common.theme);

// //   useEffect(() => {
// //     document.documentElement.setAttribute("data-theme", theme);
// //   }, [theme]);

//   const handleChange = (e) => {
//     dispatch(setTheme(e.target.value));
//   };

//   return (
//     <div className="">
//       {/* <label className="label">
//         <span className="label-text">Select Theme</span>
//       </label> */}
//       <select
//       title="Set Theme"
//         className="select select-bordered select-sm w-full max-w-xs"
//         value={theme}
//         onChange={handleChange}
//       >
//         {themes.map((t) => (
//           <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default React.memo(ThemeToggle);
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../commonSlice";
import React, { useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaThemeco } from "react-icons/fa6";

const lightThemes = [
  "light", "cupcake", "garden", "lemonade", "corporate", "fantasy",
  "valentine", "emerald", "caramel", "winter","caramellatte", "lofi", "blackforest", "cmyk", "autumn"
];

const darkThemes = [
  "dark", "synthwave", "dracula", "forest", "night", "coffee", "nord",
  "abyss", "sunset", "halloween", "dim", 
];

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.common.theme);

  // Apply selected theme to the HTML tag (DaisyUI compatibility)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleChange = (e) => {
    dispatch(setTheme(e.target.value));
  };

  return (
    <div className="flex flex-col items-start gap-1">
    

      <select
        title="Set Theme"
        className="select select-bordered select-sm w-full max-w-xs"
        value={theme}
        onChange={handleChange}
      >

        <optgroup
          label={`  Light Themes`}
          className="font-semibold text-base-content"
        >
          {/* <option disabled className="bg-base-200 text-primary font-medium">
            <MdLightMode /> Light Themes
          </option> */}
          {lightThemes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </optgroup>

  
        <optgroup
          label="Dark Themes"
          className="font-semibold text-base-content"
        >
          {/* <option disabled className="bg-base-200 text-secondary font-medium">
            <MdDarkMode /> Dark Themes
          </option> */}
          {darkThemes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </optgroup>
      </select>


  
    </div>
  );
};

export default React.memo(ThemeToggle);

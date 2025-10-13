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
  "valentine", "emerald", "caramel", "winter","caramellatte", "lofi", "blackforest", "cmyk", "autumn", "nord"
];

const darkThemes = [
  "dark", "synthwave", "dracula", "forest", "night", "coffee",
  "abyss", "sunset", "halloween", "dim", 
];


// theme colour for  better ui/ux
const themeColors = {
  light: "bg-base-200",
  cupcake: "bg-pink-200",
  garden: "bg-green-300",
  lemonade: "bg-yellow-200",
  corporate: "bg-gray-200",
  fantasy: "bg-purple-200",
  valentine: "bg-pink-300",
  emerald: "bg-green-400",
  caramel: "bg-yellow-300",
  winter: "bg-blue-200",
  caramellatte: "bg-yellow-400",
  lofi: "bg-purple-300",
  blackforest: "bg-gray-800",
  cmyk: "bg-cyan-400",
  autumn: "bg-orange-400",
  nord: "bg-blue-300",
  dark: "bg-gray-900",
  synthwave: "bg-purple-800",
  dracula: "bg-purple-900",
  forest: "bg-green-900",
  night: "bg-gray-800",
  coffee: "bg-yellow-900",
  abyss: "bg-gray-700",
  sunset: "bg-orange-600",
  halloween: "bg-orange-700",
  dim: "bg-gray-600",
};
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
              <span className={`w-4 h-4 rounded-full ${themeColors[t]}`}></span>
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
              <span className={`w-4 h-4 rounded-full ${themeColors[t]}`}></span>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </optgroup>
      </select>


  
    </div>
  );
};

export default React.memo(ThemeToggle);

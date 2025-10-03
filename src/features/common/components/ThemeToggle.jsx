import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../commonSlice"
import React from "react";

const themes = [
  "light", "dark", "cupcake", "synthwave", "dracula", "forest",
  "night", "coffee", "winter", "nord", "caramel", "abyss", "sunset",
  "halloween", "garden", "retro", "cyberpunk", "valentine", "black", "aqua",
  "lofi", "pastel", "bumblebee", "emerald", "corporate", "fantasy", "wireframe",
  "blackforest", "lemonade", "cmyk", "autumn", "business", "acid", "dim", "caramellatte"
];

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.common.theme);

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

  const handleChange = (e) => {
    dispatch(setTheme(e.target.value));
  };

  return (
    <div className="">
      {/* <label className="label">
        <span className="label-text">Select Theme</span>
      </label> */}
      <select
      title="Set Theme"
        className="select select-bordered select-sm w-full max-w-xs"
        value={theme}
        onChange={handleChange}
      >
        {themes.map((t) => (
          <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(ThemeToggle);

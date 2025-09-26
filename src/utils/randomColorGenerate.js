const randomColor=()=>{
  // console.log("called randomColor");
  
     // HSL is easier for controlling brightness and saturation
    const hue = Math.floor(Math.random() * 360); // all colors
    const saturation = Math.floor(Math.random() * 50) + 50; // 50%–100% (avoid grey)
    const lightness = Math.floor(Math.random() * 40) + 30; // 30%–70% (avoid black/white extremes)
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default randomColor
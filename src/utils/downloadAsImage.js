import html2canvas from "html2canvas-pro";


export const downloadAsImage = ({ currentChartFor, divId = "chart-container" }) => {
  const div = document.getElementById(divId);
  try {
    html2canvas(div, {
  logging: false,  // <- disables these console logs
}).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${currentChartFor}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  } catch (err) {
    console.warn("html2canvas error:", err);
  }
};

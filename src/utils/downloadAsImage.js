import html2canvas from "html2canvas-pro";

export const downloadAsImage = ({
  currentChartFor,
  divId = "chart-container",
}) => {
  const div = document.getElementById(divId);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  try {
    html2canvas(div, {
      logging: false, // <- disbles console logs
    }).then((canvas) => {
      const link = document.createElement("a"); //create <a> element 
      link.download = `${currentChartFor}-${formattedDate}.png`; //set name for download file
      link.href = canvas.toDataURL(); //convert to base64 like to download
      link.click(); //trigger click
    });
  } catch (err) {
    console.warn("html 2 canvas error:", err);
  }
};

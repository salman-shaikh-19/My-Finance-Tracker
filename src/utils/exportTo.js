import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'
import Papa from 'papaparse'
// export const exportToExcel=(rows,fileName="excel-data")=>
// {
//     const worksheet=XLSX.utils.json_to_sheet(rows);//create sheet
//     const workbook=XLSX.utils.book_new();//create empty excel file
//     XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
//     XLSX.writeFile(workbook,`${fileName}.xlsx`);
// }




// export const exportToCsv=(rows,fileName="csv-data")=>
// {
//     const csv=Papa.unparse(rows);
//     const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
//     saveAs(blob,`${fileName}.csv`);

// }




const formatExportData = (rows, excludeKeys = []) => {
  return rows.map(row => {
    const formattedRow = {};
    Object.keys(row).forEach(key => {
      if (!excludeKeys.includes(key)) {
        //  remove _(undescore) & capitalize words
        const formattedKey = key
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // replace empty/null/undefined with 'N/A'
        formattedRow[formattedKey] = row[key] !== undefined && row[key] !== null && row[key] !== ''
          ? row[key]
          : 'N/A';
      }
    });
    return formattedRow;
  });
};


export const exportToExcel = (rows, fileName = "excel-data", excludeKeys = []) => {
   if (!rows || !rows.length) return null;
  const filteredRows = formatExportData(rows, excludeKeys);

  const worksheet = XLSX.utils.json_to_sheet(filteredRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};


export const exportToCsv = (rows, fileName = "csv-data", excludeKeys = []) => {
    if (!rows || !rows.length) return null;
  const filteredRows = formatExportData(rows, excludeKeys);

  const csv = Papa.unparse(filteredRows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${fileName}.csv`);
};

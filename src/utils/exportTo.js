import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'
import Papa from 'papaparse'
export const exportToExcel=(rows,fileName="excel-data")=>
{
    const worksheet=XLSX.utils.json_to_sheet(rows);//create sheet
    const workbook=XLSX.utils.book_new();//create empty excel file
    XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
    XLSX.writeFile(workbook,`${fileName}.xlsx`);
}

export const exportToCsv=(rows,fileName="csv-data")=>
{
    const csv=Papa.unparse(rows);
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
    saveAs(blob,`${fileName}.csv`);

}

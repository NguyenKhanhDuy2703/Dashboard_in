import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportToExcel = ({displayData}) => {
  const ws = XLSX.utils.json_to_sheet(displayData); // Dữ liệu payroll
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Payroll Report");

  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(data, "Payroll_Report.xlsx");
};
export default exportToExcel;
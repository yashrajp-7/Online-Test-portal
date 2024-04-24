// import React from 'react';
// import { useState,useEffect } from 'react';
// import Navbar from "../Admin/Navbar";
// import { useNavigate } from 'react-router-dom';
// import './Result.css';
// import * as XLSX from 'xlsx';
// import axios from "axios";
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { FilterMatchMode} from 'primereact/api';
// import "./Style.css"
// import "primereact/resources/primereact.min.css"
// import 'primeicons/primeicons.css';
// import { Paginator } from 'primereact/paginator';
// export const Result = () => {
//   const [tableData, setTableData] = useState([]);
//   const [data,setdata]=useState({});
//   const [filters, setFilters] = useState({
//     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//     Name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//     Rollno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//     College_Name: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
//     EmailID: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
//     Gender: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
//     Highest_Degree_and_Specialization: {value:null , matchMode: FilterMatchMode.CONTAINS},
//     Phone_Number: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
//     SFID: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
//     Stream: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
//     Branch: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
//     Score: {value:null , matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO},
//     TabSwitchCount: {value:null , matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO},
//     Test_Taken: {value:null , matchMode: FilterMatchMode.CONTAINS},
// });
// const [first, setFirst] = useState(0);
// const [rows, setRows] = useState(10);
// const [globalFilterValue, setGlobalFilterValue] = useState('');
//   useEffect(()=>{
//     if(localStorage.getItem("loginemail")===null)
//     {
//       window.location.href="/adminlogin"
//     }
//   })



//   useEffect(async() => {
//     let res = [];
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/submit/result/');
//             console.log(response.data.message);
//             res=response.data.message
//             setTableData(res)
//             setdata(res);
//             console.log(data.Name)
    
            
//           } catch (error) {
//             console.error('Error getting question::', error);
//           }
//       },[]
//     );

//     const all=tableData.length;
//     const handleurl = (url) => {
  
//       window.open(url,'_blank');
      
//     };
//     const handledownload=()=>{
//       const worksheet=XLSX.utils.json_to_sheet(tableData);
//       const workbook=XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook,worksheet,'sheet1');
//       XLSX.writeFile(workbook,"result.xlsx");
//     };

//     const renderButton = (rowData) => {
//       return (
//         <Button onClick={() => handleurl(rowData.Resume_Link)}>Resume Link</Button>
//       );
//     };
//     const onGlobalFilterChange = (e) => {
//       const value = e.target.value;
//       let _filters = { ...filters };

//       _filters['global'].value = value;

//       setFilters(_filters);
//       setGlobalFilterValue(value);
//   };

//     const renderHeader = () => {
//       return (
//           <div className="flex justify-content-end">
//               <span className="p-input-icon-left">
//                   <i className="pi pi-search" />
//                   <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
//               </span>
//           </div>
//       );
//   };
  

//   const onPageChange = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//   };

//   const headers = renderHeader();
    
//   return (
//     <div className='mainResult' style={{height:'100%',backgroundColor:'#F5F5F5'}}>
//         <Navbar /> 
//         <h1>Result of Students</h1>
//         <button className={"downloadresult"} onClick={handledownload}>Export to xlsx</button>
     
//       <DataTable  value={tableData}  removableSort first={first} paginator rows={rows}  rowsPerPageOptions={[10,20,50,100]} onPageChange={onPageChange} showGridlines filters={filters} header={headers} >
//       <Column field="Name" header="Name" sortable />
//       <Column field="College_Name" header="College"  sortable></Column>
//       <Column field="Rollno" header="Roll No" sortable ></Column>
//       <Column field="EmailID" header="Email" ></Column>
//       <Column field="Gender" header="Gender" ></Column>
//       <Column field="Highest_Degree_and_Specialization" header="Specialization"></Column>
//       <Column field="Phone_Number" header="Phone No." ></Column>
//       <Column field="SFID" header="SF ID" ></Column>
//       <Column field="Stream" header="Degree" ></Column>
//       <Column field="Branch" header="Branch" ></Column>
//       <Column field="Score" header="Score" sortable ></Column>
//       <Column field="TabSwitchCount" header="TabSwitchCount" sortable ></Column>
//       <Column field="Test_Taken" header="Test Taken" />
//       <Column body={renderButton} header="Resume" />
      
//       </DataTable>
      
//     </div>
//   )
// }

// export default Result;

import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from "../Admin/Navbar";
import { useNavigate } from 'react-router-dom';
import './Result.css';
import * as XLSX from 'xlsx';
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode} from 'primereact/api';
import "./Style.css"
import "primereact/resources/primereact.min.css"
import 'primeicons/primeicons.css';
import Rmenu from './Rmenu'; 

export const Result = () => {
  const [tableData, setTableData] = useState([]);
  const [data,setdata]=useState({});
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Rollno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    College_Name: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
    EmailID: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
    Gender: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
    Highest_Degree_and_Specialization: {value:null , matchMode: FilterMatchMode.CONTAINS},
    Phone_Number: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
    SFID: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
    Stream: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
    Branch: {value:null , matchMode: FilterMatchMode.STARTS_WITH},
    Score: {value:null , matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO},
    TabSwitchCount: {value:null , matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO},
    Test_Taken: {value:null , matchMode: FilterMatchMode.CONTAINS},
});
const [globalFilterValue, setGlobalFilterValue] = useState('');
  useEffect(()=>{
    if(localStorage.getItem("loginemail")===null)
    {
      window.location.href="/adminlogin"
    }
  })
  useEffect(async() => {
    let res = [];
        try {
            const response = await axios.get('https://arun2024.pythonanywhere.com/submit/result/');
            console.log(response.data.message);
            res=response.data.message
            setTableData(res)
            setdata(res);
            console.log(data.Name)
    
            
          } catch (error) {
            console.error('Error getting question::', error);
          }
      },[]
    );
    const handleurl = (url) => {
  
      window.open(url,'_blank');
      
    };
    const handledownload=()=>{
      const worksheet=XLSX.utils.json_to_sheet(tableData);
      const workbook=XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook,worksheet,'sheet1');
      XLSX.writeFile(workbook,"result.xlsx");
    };

    const renderButton = (rowData) => {
      return (
        <Button onClick={() => handleurl(rowData.Resume_Link)}>Resume Link</Button>
      );
    };
    const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };

      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
  };

    const renderHeader = () => {
      return (
          <div className="flex justify-content-end">
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
              </span>
          </div>
      );
  };

  const headers = renderHeader();
    
  return (
    <div className='mainResult' style={{backgroundColor:'#F5F5F5'}}>
       <Navbar />  
    <div className='menuR'>
    <Rmenu />
    </div>
    <div className='content'>
      <h1 className='h1class'>Result of Students</h1>
      <button className="downloadresult" onClick={handledownload}>Export to xlsx</button>
      <div className='table-container'>
        <DataTable value={tableData} removableSort showGridlines paginator rows={10} rowsPerPageOptions={[10,20,50,100]} filters={filters} header={headers}>
        <Column field="Name" header="Name" sortable />
       <Column field="College_Name" header="College"  sortable></Column>

       <Column field="Rollno" header="Roll No" sortable ></Column>
       <Column field="EmailID" header="Email" ></Column>
       <Column field="Gender" header="Gender" ></Column>
       <Column field="Highest_Degree_and_Specialization" header="Specialization"></Column>
       <Column field="Phone_Number" header="Phone No." ></Column>
       <Column field="SFID" header="SF ID" ></Column>
       <Column field="Stream" header="Degree" ></Column>
       <Column field="Branch" header="Branch" ></Column>
       <Column field="Score" header="Score" sortable ></Column>
       <Column field="TabSwitchCount" header="TabSwitchCount" sortable ></Column>
       <Column field="Test_Taken" header="Test Taken" />
       <Column body={renderButton} header="Resume" />
        </DataTable>
      </div>
    </div>
  </div>
  
  )
}
export default Result;
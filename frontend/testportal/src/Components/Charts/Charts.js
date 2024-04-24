// src/components/Dashboard.js

import React from 'react';
import './Charts.css'; // Import your CSS file
import { Chart } from 'primereact/chart';
import { useState,useEffect } from 'react';
import Navbar from "../Admin/Navbar";
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import Cmenu from './Cmenu';

const Charts = () => {
    const [tableData, setTableData] = useState([]);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const passMark=2;
    const [degree,setDegree]=useState("B.Tech")
    const [streamBranches, setStreamBranches] = useState([]);
    const [passCounts, setPassCounts] = useState([]);
    const [failCounts, setFailCounts] = useState([]);

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
        
              } catch (error) {
                console.error('Error getting question::', error);
              }
          },[]
        );
    const totalData=tableData.length;
    console.log(degree)
    useEffect(() => {
        if (degree && tableData.length > 0) {
          const streamData = tableData.filter(student => student.Stream === degree);
          const passFailCounts = calculatePassFailCounts(streamData, passMark);
          const branches = Object.keys(passFailCounts[degree]);
    
          setStreamBranches(branches);
          setPassCounts(branches.map(branch => passFailCounts[degree][branch].passCount));
          setFailCounts(branches.map(branch => passFailCounts[degree][branch].failCount));
        }
      }, [degree, tableData]);

    function changeBranchName(branch){
        const arr=branch.split(" ")
        let val=branch;
          if(arr.length===1){
            val=val.substr(0,2)
          }else{
            let val1=""
            for(let i=0;i<arr.length;i++){
                val1+=arr[i][0]
            }
            val=val1;
          }
        return val;
    }
    
    const calculatePassFailCounts = (data, passMark) => {
        const result = {};
      
        data.forEach(student => {
          const stream = student.Stream;
          const branch=changeBranchName(student.Branch)
          const score = student.Score;
          if (!result[stream]) {
            result[stream] = {};
          }
          if (!result[stream][branch]) {
            result[stream][branch] = { passCount: 0, failCount: 0 };
          }
          if (score >= passMark) {
            result[stream][branch].passCount++;
          } else {
            result[stream][branch].failCount++;
          }
        });
      
        return result;
      };
      const dataForPassFailCountBasedOnDegreeAndBranch = {
        labels: streamBranches,
        datasets: [
          {
            label: 'Pass',
            data: passCounts,
            backgroundColor: [
                '#90BE6D',
            ],
            borderColor: [
                '#90BE6D',
            ],
            borderWidth: 1,
          },{
            label: 'Fail',
            data: failCounts,
            backgroundColor: [
                '#F94144'
            ],
            borderColor: [
                '#F94144',
            ],
            borderWidth: 1,
          }
        ],
      };
    

    const calculateEfficiencyValue = (data, passMark) => {
        const efficiencyDict = {};
        let MostEfficientCollege=""
        let maxxPercentage=0;
        let TotalPassCount=0;
        data.forEach(student => {
          const collegeName = student.College_Name;
          const score = student.Score;
      
          if (!efficiencyDict[collegeName]) {
            efficiencyDict[collegeName] = { totalStudents: 0, abovePassStudents: 0 };
          }
      
          efficiencyDict[collegeName].totalStudents++;
      
          if (score > passMark) {
            efficiencyDict[collegeName].abovePassStudents++;
          }
        });
      
        const finalResult = {};
        Object.keys(efficiencyDict).forEach(collegeName => {
          const { totalStudents, abovePassStudents } = efficiencyDict[collegeName];
          const efficiencyPercentage = (abovePassStudents / totalStudents) * 100;
          TotalPassCount+=abovePassStudents;
          if (efficiencyPercentage > maxxPercentage) {
            MostEfficientCollege=collegeName;
            maxxPercentage=efficiencyPercentage;
          }  
          finalResult[collegeName] = efficiencyPercentage.toFixed(2);
        });
        return (
            {
                labels:Object.keys(finalResult),
                data: Object.values(finalResult),
                efficientCollege:MostEfficientCollege,
                passCount:TotalPassCount,
            }
        )
      };

      const dataEfficiencyPerCollege = {
        labels: calculateEfficiencyValue(tableData,passMark).labels,
        datasets: [
          {
            label: 'Efficiency Rate(%)',
            data: calculateEfficiencyValue(tableData,passMark).data,
            backgroundColor: [
              '#F8961E', '#B86E9F','#2D9CDB','#F9C74F','#F3722C','#90BE6D'
            ],
            borderColor: [
              '#F8961E', '#B86E9F','#2D9CDB','#F9C74F','#F3722C','#90BE6D'
            ],
            borderWidth: 1,
          },
        ],
      };

    const getStudentCountByCollegeDict = (tableData,data_value) => {
        const CountDict = {};
        const val=data_value;
        tableData.forEach(student => {
          const data_name = student[data_value];
          if (data_name in CountDict) {
            CountDict[data_name]++;
          } 
          else {
            CountDict[data_name] = 1;
          }
        });
        return (
            {
                labels:Object.keys(CountDict),
                data: Object.values(CountDict),
            }
        )
      };


    const dataforStudentsPerCollege = {
        labels: getStudentCountByCollegeDict(tableData,'College_Name').labels,
        datasets: [
          {
            label: 'No of Applications',
            data: getStudentCountByCollegeDict(tableData,'College_Name').data,
            backgroundColor: [
                '#F8961E', '#B86E9F','#2D9CDB','#F9C74F','#F3722C','#90BE6D'
            ],
            borderColor: [
                '#F8961E', '#B86E9F','#2D9CDB','#F9C74F','#F3722C','#90BE6D'
            ],
            borderWidth: 1,
          },
        ],
        
      };

      const dataforDepartmentWiseApplications = {
        labels: getStudentCountByCollegeDict(tableData,'Stream').labels,
        datasets: [
          {
            label: 'No of Applications',
            data: getStudentCountByCollegeDict(tableData,'Stream').data,
            backgroundColor: [
              '#F8961E', '#B86E9F','#2D9CDB','#F9C74F','#F3722C','#90BE6D'
            ],
            borderColor: [
                '#F8961E', '#B86E9F','#2D9CDB','#F9C74F','#F3722C','#90BE6D'
            ],
            borderWidth: 1,
          },
        ],
      };

    const dataforGenderRatio={
        labels: getStudentCountByCollegeDict(tableData,'Gender').labels,
        datasets: [
          {
            label: 'No of Applications',
            data: getStudentCountByCollegeDict(tableData,'Gender').data,
            backgroundColor: [
                '#B86E9F', '#90BE6D','#F8961E'
            ],
            borderColor: [
                '#B86E9F', '#90BE6D','#F8961E'
            ],
            borderWidth: 1,
          },
        ],
    }

    const dataforStreamWiseApplication={
        labels: getStudentCountByCollegeDict(tableData,'Stream').labels,
        datasets: [
          {
            label: 'No of Applications',
            data: getStudentCountByCollegeDict(tableData,'Stream').data,
            backgroundColor: [
                '#90BE6D'
            ],
            borderColor: [
                '#90BE6D'
            ],
            borderWidth: 1,
          },
        ],
        
    } 

    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color:'#494F55',
                    display: true,
                    drawBorder: true
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: '#494F55',
                    display: true,
                    drawBorder: true
                }
            }
        }
    };

    function getDate(){
        
        let today = new Date();
        console.log(today);
        
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        
        let yyyy = today.getFullYear();
        
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = dd + '/' + mm + '/' + yyyy;
        return today;
    }
    const [visible, setVisible] = useState(false);
    
  return (
    <div className="outerchart" style={{height:"100%",width:"100%"}}>
       <Navbar/> 
       <Cmenu/>
    <div className="dashboard-container" style={{height:"100%",width:"100%"}}>
 
        <div className="all-chart-container">
      <div className="candidate_count">
        <h2>Total Candidates Applied - {totalData}</h2>
        <p>Total applications received as - {getDate()}</p>
      </div>
      <div className="chart-container">
        
        <div className="chart">
           <h3>Applications per college-{totalData}</h3>
           <p>Total applications received as - {getDate()}</p>
           <hr/>
           <Chart  type="pie" data={dataforStudentsPerCollege} />
        </div>
        <div className="chart">
        <h3>Department-wise Applications-{totalData}</h3>
        <p>Total applications received as - {getDate()}</p>
        <hr/>
            <Chart type="pie" data={dataforDepartmentWiseApplications}  /> 
        </div>
        <div className="chart">
        <h3>Skill Test Stats</h3>
        <Dropdown value={degree} onChange={(e) => setDegree(e.value)} options={
        getStudentCountByCollegeDict(tableData,'Stream').labels
    }  placeholder={degree} className="w-full md:w-14rem" />
           <hr/>
        <Chart style={{height:"300px",width:"270px"}} type="bar" data={dataForPassFailCountBasedOnDegreeAndBranch} options={options} />
        </div>
        <div className="chart">
           <h3>Most Efficient College -{calculateEfficiencyValue(tableData,passMark).efficientCollege}</h3>
           <p>{calculateEfficiencyValue(tableData,passMark).passCount} Applications passed the skill test</p>
           <hr/>
        <Chart type="pie" data={dataEfficiencyPerCollege}  />
        </div>
        <div className="chart">
        <h3>Gender Ratio</h3>
        <p>Total applications received as - {getDate()}</p>
        <hr/>
        <Chart type="pie" data={dataforGenderRatio} />
        </div>
        <div className="chart">
        <h3>Education Criteria</h3>
        <p>This chart shows no of Applications</p>
        <hr/>
        <Chart style={{height:"300px",width:"270px"}} type="bar" data={dataforStreamWiseApplication} options={options} />
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Charts;
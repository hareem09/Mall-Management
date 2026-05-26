import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import Chart from "../../components/BarChartComponent";
import {AttendanceChart,TaskChart} from '../../components/LineChart'
import TwoLevelPieChart from '../../components/PieChartComponent'
function Dasboard() {
  
  const [totalShop,setTotalShop]=useState()
  const [totalBrand,setTotalBrand]=useState()
  const [totalEmp,setTotalEmp]=useState()
  const totalEmployees = useSelector(
  (state) => state.employees.empDetails.length
);

const totalBrands = useSelector(
  (state) => state.brands.brandDetails.length
 
);

const totalShops = useSelector(
  (state) => state.shops.shopDetails.length
);

const totalAttendance = useSelector(
  (state) => state.attendance.attendanceDetails.length
);
useEffect(() => {
  setTotalBrand(totalBrands);
  
}, [totalBrands]);

 useEffect(() => {
  setTotalShop(totalShops);
  console.log(totalShops);
}, [totalShops]);

useEffect(() => {
  setTotalEmp(totalEmployees);
  
}, [totalEmployees]);

 const attendance = useSelector(
    (state) => state.attendance.attendanceDetails
  ) || [];

  const present = attendance.filter((a) => a.status === "Present").length;
  const absent = attendance.filter((a) => a.status === "Absent").length;

  const chartData = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  return (
    <>
    <main >
     <section className=" flex  justify-around gap-5 mt-9">
            <section className="w-40 p-4 rounded-2xl shadow-2xl shadow-cyan-600 bg-linear-to-b from-cyan-600 to-sky-300"><h2> Total Brands:</h2>
         <p>{totalBrand}</p>
         </section>
         <section className="w-40 p-4 rounded-2xl shadow-2xl shadow-cyan-600 bg-linear-to-b from-cyan-600 to-sky-300">
            <h2>Total Shops:</h2>
          <p>{totalShop}</p>
          </section>
            <section className="w-40 p-4  rounded-2xl shadow-2xl shadow-cyan-600 bg-linear-to-b from-cyan-600 to-sky-300">
            <h2>Total Employees:</h2>
          <p>{totalEmp}</p>
          </section>
         </section>
         <section className="w-full h-full flex m-4 shadow-2xl shadow-gray-600">
        <Chart 
        totalBrands={totalBrand}
         totalShops={totalShop}
        totalEmployees={totalEmp}
        />
       <TwoLevelPieChart
  totalBrands={totalBrands}
  totalEmployees={totalEmployees}
/>
      </section>
      <section className="h-full m-4 shadow-2xl shadow-gray-600 border-t-4 border-t-green-200 rounded-2xl p-4">
 <h2>Attendance Chart</h2>
  <AttendanceChart />
  <h2>Task Chart</h2>
  <TaskChart />
</section>
         </main>
    </>
  )
}

export default Dasboard
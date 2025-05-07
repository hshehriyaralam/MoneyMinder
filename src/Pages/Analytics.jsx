import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import MontlyBarChart from '../Components/AnaylyticsComponents/BarChart';
import ExpensePieChart from '../Components/AnaylyticsComponents/ExpensePieChart';
import SavingLinBar from '@/Components/AnaylyticsComponents/SavingLinBar';
import ExportButton from '@/Components/UIverse/ExportButton';

const Analytics = () => {
  // Export Function for PDF
  const exportToPDF = () => {
    const chartElement = document.getElementById('analytics-page');
  
    html2canvas(chartElement, {
      backgroundColor: '#ffffff',  
      useCORS: true,
      ignoreElements: (element) => {
        return element.tagName === 'BUTTON'; 
      }
    }).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
      pdf.save('charts.pdf');
    }).catch((error) => {
      console.error('Error capturing PDF:', error);
    });
  };
  

  return (
    <div className="w-full min-h-screen p-4 flex flex-col gap-y-3 mb-40 md:mb-0">
      <div id="analytics-page">
  <MontlyBarChart />
  <div className="max-w-4xl h-min-screen p-5 mx-auto ">
    <ExpensePieChart />
  </div>
  <div className="w-full p-2 border-1  shadow-xl rounded-lg border-black mt-2">
    <SavingLinBar />
  </div>
 
 
</div>
      <div  className='max-w-7xl flex md:justify-end justify-center items-center mx-4  cursor-pointer'>
      <ExportButton  onClick={exportToPDF} />
      </div>
    </div>
  );
};

export default Analytics;

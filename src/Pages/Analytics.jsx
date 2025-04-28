import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import MontlyBarChart from '../Components/AnaylyticsComponents/BarChart';
import ExpensePieChart from '../Components/AnaylyticsComponents/ExpensePieChart';
import SavingLinBar from '@/Components/AnaylyticsComponents/SavingLinBar';

const Analytics = () => {
  // Export Function for PDF
  const exportToPDF = () => {
    const chartElement = document.getElementById('analytics-page');
  
    html2canvas(chartElement, {
      backgroundColor: '#ffffff',  // Force white background
      useCORS: true,               // Cross-origin images support
      ignoreElements: (element) => {
        // Ignore problematic elements if needed
        return element.tagName === 'BUTTON'; // ignore buttons if needed
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
    <div className="w-full min-h-screen p-4 flex flex-col gap-y-3">
      {/* Analytics Page Content */}
      <div id="analytics-page">
  <MontlyBarChart />
  <div className="w-full p-5 mx-auto">
    <ExpensePieChart />
  </div>
  <div className="w-full p-2 border-1 rounded-lg border-black">
    <SavingLinBar />
  </div>
</div>

      {/* Export Button */}
      <button
        onClick={exportToPDF}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default Analytics;

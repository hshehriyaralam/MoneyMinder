import React, { useEffect ,lazy,Suspense} from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import MontlyBarChart from '../Components/AnaylyticsComponents/BarChart';
import  useTransactionStore  from '@/store/transactions.js';

const ExpensePieChart = lazy(() => import('../Components/AnaylyticsComponents/ExpensePieChart.jsx'));
const SavingLinBar = lazy(() => import('../Components/AnaylyticsComponents/SavingLinBar.jsx'));
const DownloadButton = lazy(() => import('../Components/UIverse//DownloadButton.jsx'));


const Analytics = () => {
  const transactions = useTransactionStore((state ) => state.transactions)
  const fetchTransactions = useTransactionStore((state ) => state.fetchTransactions)
  // Export Function for PDF
  const exportToPDF = () => {
  const chartElement = document.getElementById('analytics-page');

  html2canvas(chartElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    ignoreElements: (element) => element.tagName === 'BUTTON',
  }).then((canvas) => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();  
    const pageHeight = pdf.internal.pageSize.getHeight(); 

    const padding = 30;

    const printableWidth = pageWidth - 2 * padding;
    const printableHeight = pageHeight - 2 * padding;

    const imgWidth = printableWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const imgData = canvas.toDataURL('image/png');

    if (imgHeight <= printableHeight) {
      pdf.addImage(imgData, 'PNG', padding, padding, imgWidth, imgHeight);
    } else {
      let position = padding;
      let heightLeft = imgHeight;

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'PNG', padding, position, imgWidth, imgHeight);
        heightLeft -= printableHeight;
        if (heightLeft > 0) {
          pdf.addPage();
          position = padding - (imgHeight - heightLeft);
        }
      }
    }

    pdf.save('analytics.pdf');
  }).catch((error) => {
    console.error('PDF generation error:', error);
  });
};

useEffect(() => {
  fetchTransactions();
}, []);


  return (
    <div className="w-full min-h-screen p-6 flex flex-col gap-y-3">
      <div id="analytics-page">
  <MontlyBarChart  transactions={transactions} />
  <div className="max-w-4xl h-min-screen p-5 mx-auto ">
    <Suspense fallback={<div>Loading Chart...</div>}>
    <ExpensePieChart   transactions={transactions}/>
    </Suspense> 
  </div>
  <div className="w-full p-2 border-1  shadow-xl rounded-lg border-black mt-2">
       <Suspense fallback={<div>Loading Chart...</div>}>
    <SavingLinBar transactions={transactions} />
    </Suspense> 
  </div>
</div>
      <div  className='max-w-7xl flex md:justify-end justify-center items-center md:mx-12 mt-2 cursor-pointer mb-15 md:mb-0'>
           <Suspense fallback={<div>Loading Chart...</div>}>
         <DownloadButton  onClick={exportToPDF} />
    </Suspense>

      </div>
    </div>
  );
};

export default Analytics;

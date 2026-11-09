import { lazy, Suspense, useEffect } from "react";
import { Download } from "lucide-react";
import useAppStore from "@/store/store.js";
import { useAlert } from "@/Context/AlertContext";
import { ChartSkeleton } from "../ui/primitives";

const YearBars = lazy(() =>
  import("../ui/AnalyticsCharts").then((module) => ({ default: module.YearBars })),
);
const ExpensePie = lazy(() =>
  import("../ui/AnalyticsCharts").then((module) => ({ default: module.ExpensePie })),
);
const SavingsLine = lazy(() =>
  import("../ui/AnalyticsCharts").then((module) => ({ default: module.SavingsLine })),
);

const Analytics = () => {
  const transactions = useAppStore((state) => state.transactions);
  const fetchTransactions = useAppStore((state) => state.fetchTransactions);
  const fetchError = useAppStore((state) => state.fetchError);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const exportToPDF = async () => {
    const element = document.getElementById("analytics-page");
    if (!element) {
      showAlert("error", "Analytics are not ready to export.");
      return;
    }

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#EFEEE9",
        ignoreElements: (node) => node.tagName === "BUTTON",
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const padding = 16;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const printableWidth = pageWidth - padding * 2;
      const printableHeight = pageHeight - padding * 2;
      const imageHeight = (canvas.height * printableWidth) / canvas.width;
      const image = canvas.toDataURL("image/png");

      for (let offset = 0; offset < imageHeight; offset += printableHeight) {
        if (offset > 0) pdf.addPage();
        pdf.addImage(image, "PNG", padding, padding - offset, printableWidth, imageHeight);
      }

      pdf.save("money-minder-analytics.pdf");
    } catch (error) {
      console.error("Analytics export failed:", error);
      showAlert("error", "Could not export analytics. Please try again.");
    }
  };

  return (
    <div className="analytics-page">
      {fetchError && <p className="data-error" role="alert">{fetchError}</p>}
      <div id="analytics-page" className="bento">
        <Suspense fallback={<ChartSkeleton />}>
          <YearBars transactions={transactions} />
          <ExpensePie transactions={transactions} />
          <SavingsLine transactions={transactions} />
        </Suspense>
      </div>
      <div className="analytics-actions">
        <button type="button" className="pill" onClick={exportToPDF}>
          Export PDF <Download size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Analytics;

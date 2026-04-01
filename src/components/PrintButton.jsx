import { useReactToPrint } from "react-to-print";

export default function PrintButton({ targetRef, onAfterPrint }) {
  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: " ", // blank title avoids about:srcdoc label in print header
    pageStyle: `
      @page { size: A5; margin: 4mm; }
      @media print {
        html, body {
          margin: 0 !important;
          padding: 0 !important;
        }

        .receipt-print-root * {
          font-size: 88% !important;
          line-height: 1.15 !important;
        }
      }
    `,
    onAfterPrint,
  });

  return (
    <button
      onClick={handlePrint}
      className="w-full max-w-2xl mx-auto block bg-brand text-white py-3 px-4 rounded text-base font-medium cursor-pointer touch-manipulation active:bg-pink-700">
      Print / Save as PDF
    </button>
  );
}

import React, { useState } from 'react';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import { jsPDF } from 'jspdf';

const ReportExport = ({ reportName = "Quarterly Analysis" }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [done, setDone] = useState(false);

  const generatePDF = () => {
    setIsExporting(true);
    
    // Simulate some logic
    setTimeout(() => {
      const doc = new jsPDF();
      
      // Add content to the PDF
      doc.setFontSize(22);
      doc.text("Sentiq Neural Intelligence Report", 20, 20);
      
      doc.setFontSize(14);
      doc.text(`Report: ${reportName}`, 20, 35);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 45);
      
      doc.setLineWidth(0.5);
      doc.line(20, 50, 190, 50);
      
      doc.setFontSize(12);
      doc.text("Executive Summary:", 20, 65);
      doc.text("Detected anomaly in European retail channel sentiment (Shift: -14%).", 20, 75);
      doc.text("Market share velocity remains steady at +4.2% MoM.", 20, 85);
      
      doc.save(`Sentiq_Report_${reportName.replace(/\s+/g, '_')}.pdf`);
      
      setIsExporting(false);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    }, 1500);
  };

  return (
    <div className="glass p-8 rounded-[32px] border-lime-neon/20 border-2">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 rounded-2xl lime-gradient flex items-center justify-center shadow-lg">
          <FileText className="text-charcoal" size={24} />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold">{reportName}</h3>
          <p className="mono-label">PDF / Vector Format / 2.4MB</p>
        </div>
        <button 
          onClick={generatePDF}
          disabled={isExporting}
          className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-3 ${
            done ? 'bg-green-500 text-white' : 'bg-charcoal text-white hover:bg-black'
          }`}
        >
          {isExporting ? (
             <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Compiling...
             </>
          ) : done ? (
             <>
                <CheckCircle2 size={18} />
                Exported
             </>
          ) : (
             <>
                <Download size={18} />
                Export Report
             </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReportExport;

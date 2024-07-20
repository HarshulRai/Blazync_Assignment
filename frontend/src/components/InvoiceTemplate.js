import React from 'react';
import { jsPDF } from 'jspdf';

const InvoiceTemplate = ({ student }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(`Invoice for ${student.name}`, 10, 10);
        doc.text(`Roll Number: ${student.rollNumber}`, 10, 20);
        doc.text(`Fees: ${student.fees}`, 10, 30);
        doc.text(`Payment Status: ${student.paymentStatus}`, 10, 40);
        doc.save(`Invoice_${student.rollNumber}.pdf`);
    };

    return (
        <button onClick={generatePDF}>Download Invoice</button>
    );
};

export default InvoiceTemplate;

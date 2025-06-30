import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportToPdf(data, startDate, endDate, searchTerm = '', taxFilter = 'all', minAmount = '', maxAmount = '', filename = 'purchase_history.pdf') {
    if (!data || data.length === 0) {
        alert('No data to export.');
        return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Purchase History Report', 14, 15);

    // Format date range
    const formatDate = (d) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const start = startDate instanceof Date ? formatDate(startDate) : 'Start Date';
    const end = endDate instanceof Date ? formatDate(endDate) : 'End Date';

    // Add filter info
    doc.setFontSize(10);
    doc.text(`From ${start} to ${end}`, 14, 25);
    doc.text(`Search: ${searchTerm || 'None'}    Tax Deductible: ${taxFilter}`, 14, 32);
    doc.text(`Amount Range: ${minAmount || 'Any'} - ${maxAmount || 'Any'}`, 14, 39);

    const headers = [['Date', 'Merchant', 'Amount', 'Category', 'Tax Deductible']];
    const rows = data.map(item => [
        item.date,
        item.merchant,
        `$${item.amount.toFixed(2)}`,
        item.category,
        item.taxDeductible ? 'Yes' : 'No'
    ]);

    doc.autoTable({
        head: headers,
        body: rows,
        startY: 45,
        styles: { fontSize: 10 }
    });

    doc.save(filename);
}
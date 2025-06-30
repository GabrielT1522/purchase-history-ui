// utils/exportCSV.js
export function exportToCsv(data, filename = 'purchase_history.csv') {
    if (!data || data.length === 0) {
        alert('No data to export.');
        return;
    }

    // Extract headers from keys of first item
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];

    // Add data rows
    data.forEach((row) => {
        const values = headers.map((field) => {
            let val = row[field];
            if (typeof val === 'string') {
                val = `"${val.replace(/"/g, '""')}"`;
            }
            return val;
        });
        csvRows.push(values.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    Alert.alert('Exported', 'Your CSV was generated.');
}

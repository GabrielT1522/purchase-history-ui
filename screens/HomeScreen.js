// screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View, Text, Button, StyleSheet, TextInput, ScrollView, TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import mockData from '../mock_data/mock_purchases.json';
import PurchaseList from '../components/PurchaseList';
import { exportToCsv } from '../utils/exportCsv';
import { exportToPdf } from '../utils/exportPdf';

export default function HomeScreen() {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [taxFilter, setTaxFilter] = useState('all');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const filteredData = mockData.filter((item) => {
    const itemDate = new Date(item.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const inRange = itemDate >= start && itemDate <= end;

    const searchMatch =
      searchTerm === '' ||
      item.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTax =
      taxFilter === 'all' ||
      (taxFilter === 'yes' && item.taxDeductible) ||
      (taxFilter === 'no' && !item.taxDeductible);

    const matchesMin = minAmount === '' || item.amount >= parseFloat(minAmount);
    const matchesMax = maxAmount === '' || item.amount <= parseFloat(maxAmount);

    return inRange && searchMatch && matchesTax && matchesMin && matchesMax;
  });

  const handleCsvExport = () => {
    exportToCsv(filteredData);
  };

  const handlePdfExport = () => {
    exportToPdf(
      filteredData,
      new Date(startDate),
      new Date(endDate),
      searchTerm,
      taxFilter,
      minAmount,
      maxAmount
    );
  };

  const resetFilters = () => {
    setStartDate('2024-01-01');
    setEndDate('2024-12-31');
    setSearchTerm('');
    setTaxFilter('all');
    setMinAmount('');
    setMaxAmount('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Purchase History Report</Text>

      <View style={styles.filterBox}>
        <View style={styles.inputGroup}>
          <Text>Start Date:</Text>
          <TextInput
            style={styles.input}
            value={startDate}
            onChangeText={setStartDate}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text>End Date:</Text>
          <TextInput
            style={styles.input}
            value={endDate}
            onChangeText={setEndDate}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <Text style={styles.label}>Search Merchant or Category:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Amazon, Travel"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <Text style={styles.label}>Tax Deductible:</Text>
        <Picker
          selectedValue={taxFilter}
          onValueChange={(val) => setTaxFilter(val)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>

        <Text style={styles.label}>Amount Range:</Text>
        <View style={styles.amountRow}>
          <TextInput
            style={styles.amountInput}
            placeholder="Min"
            keyboardType="numeric"
            value={minAmount}
            onChangeText={setMinAmount}
          />
          <TextInput
            style={styles.amountInput}
            placeholder="Max"
            keyboardType="numeric"
            value={maxAmount}
            onChangeText={setMaxAmount}
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={resetFilters} style={{ backgroundColor: '#bfbfbf', padding: 10, borderRadius: 6 }}>
            <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Clear All Filters</Text>
          </TouchableOpacity>
        </View>
      </View>

      {filteredData.length === 0 ? (
        <Text style={{ marginTop: 20, textAlign: 'center' }}>
          No purchases found.
        </Text>
      ) : (
        <PurchaseList data={filteredData} />
      )}

      <View style={styles.buttonGroup}>
        <Button title="Export to CSV" onPress={handleCsvExport} />
      </View>
      <View style={styles.buttonGroup}>
        <Button title="Export to PDF" onPress={handlePdfExport} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  filterBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  inputGroup: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginTop: 5,
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
  },
  picker: {
    marginTop: 5,
    marginBottom: 10,
  },
  amountRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  amountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
  },
  buttonGroup: {
    marginVertical: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
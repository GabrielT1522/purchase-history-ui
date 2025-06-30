// components/PurchaseList.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PurchaseList({ data }) {
  return (
    <View style={styles.wrapper}>
      {/* Sticky Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.header]}>Transaction ID</Text>
        <Text style={[styles.cell, styles.header]}>Date</Text>
        <Text style={[styles.cell, styles.header]}>Merchant</Text>
        <Text style={[styles.cell, styles.header]}>Amount</Text>
        <Text style={[styles.cell, styles.header]}>Category</Text>
        <Text style={[styles.cell, styles.header]}>Tax-Deductible</Text>
      </View>

      {/* Scrollable rows */}
      <ScrollView style={styles.body}>
        {data.map((item, index) => (
          <View key={index} style={styles.dataRow}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{item.merchant}</Text>
            <Text style={styles.cell}>${item.amount.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.category}</Text>
            <Text style={[styles.cell, item.taxDeductible && styles.deductible]}>
              {item.taxDeductible ? 'Yes' : 'No'}
            </Text>

          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 500,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#1976d2',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  body: {
    flex: 1,
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  header: {
    fontWeight: 'bold',
    color: 'white',
  },
  deductible: {
    color: 'green',
    fontWeight: 'bold',
  }
});

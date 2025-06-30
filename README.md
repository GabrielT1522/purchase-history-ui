# Purchase History Viewer – MIS 5350 Final Project

## Overview

This project is a mobile-friendly React Native application (built using Expo) that allows a customer to view and export their purchase history for a specific date range. It is based on the following user story:

> As a customer, I want to be able to retrieve a history of my past purchases with the company for a certain time frame using either a web-based or a mobile interface so that I can identify tax-deductible transactions and document them for tax authorities.

## Key Features

- Date range input to filter purchases
- Search/filter by merchant, category, tax-deductible status, and amount range
- Scrollable purchase list showing date, merchant, amount, category, and tax-deductible status
- CSV and PDF export options
- Graceful handling of "no results found"
- Clear all filters option

## Tech Stack

- React Native with Expo
- JavaScript
- jsPDF and jspdf-autotable for PDF generation
- react-native components and styling

## User Flow

1. Open the app and see a clean UI preloaded with a date range from January 1, 2024 to today's date.
2. Input a new date range or search term, and apply filters for tax-deductibility and amount.
3. Scroll through the filtered list of purchases.
4. Export the data to CSV or PDF for documentation or tax purposes.

## Mock Data

- Includes 35 realistic purchases across 6+ months 
- Saved as a JSON file "mock_purchases.json" for easy data processing

## Demo

A 2–3 minute screen recording demonstrates the full user experience and features.

## Project Structure

```
purchase-history-ui/
├── components/
│   └── PurchaseList.js
├── screens/
│   └── HomeScreen.js
├── utils/
│   ├── exportCsv.js
│   └── exportPdf.js
├── mock_data/
│   └── mock_purchases.json
├── App.js
└── README.md
```

## How to Run

1. Install Expo CLI: `npm install -g expo-cli`
2. Clone the repo: `git clone https://github.com/GabrielT1522/purchase-history-ui.git`
3. Navigate to the folder: `cd purchase-history-ui`
4. Install dependencies: `npm install`
5. Start the project: `npm start` (and follow Expo instructions to view on web or emulator)

## Submission Package

- Final source code
- README file
- Walkthrough screen recording
- Project rationale PDF
- Packaged in: MIS5350_FinalProject_Torres_Gabriel.zip

## Author

Gabriel Torres  
Summer 2025, MIS 5350 – Texas A&M International University
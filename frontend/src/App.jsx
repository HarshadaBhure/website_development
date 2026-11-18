import { useState, useMemo } from 'react';
import UploadPage from './pages/UploadPage';
import ReconciliationDashboard from './pages/ReconciliationDashboard';
import { generateTestData } from './data/generateTestData';

export default function App() {
  const [appData, setAppData] = useState(null); // null = show upload page

  const sampleData = useMemo(() => generateTestData(), []);

  const handleDataLoaded = ({ transactions, settlements, source }) => {
    setAppData({ transactions, settlements, source });
  };

  const handleUseSampleData = () => {
    setAppData({ ...sampleData, source: 'sample' });
  };

  const handleReset = () => {
    setAppData(null);
  };

  if (!appData) {
    return (
      <UploadPage
        onDataLoaded={handleDataLoaded}
        onUseSampleData={handleUseSampleData}
      />
    );
  }

  return (
    <ReconciliationDashboard
      transactions={appData.transactions}
      settlements={appData.settlements}
      source={appData.source}
      onReset={handleReset}
    />
  );
}

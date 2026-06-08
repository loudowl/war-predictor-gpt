import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('/api/reports')
      .then(response => setReports(response.data))
      .catch(error => console.error('Error fetching reports:', error));
  }, []);

  return (
    <div>
      <h1>Reports</h1>
      <ul>
        {reports.map(report => (
          <li key={report.id}>{report.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReportPage;

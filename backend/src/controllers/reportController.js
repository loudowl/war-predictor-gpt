const getReports = (req, res) => {
  // Fetch reports from database (mock data for now)
  const reports = [
    {
      id: '1',
      title: 'Military Activity in Region X',
      category: 'Conflict',
      location: { type: 'Point', coordinates: [30.5, 50.5] },
      timestamp: new Date().toISOString(),
      content: 'Details about the activity...',
    },
  ];
  res.json(reports);
};

const createReport = (req, res) => {
  // Logic to create a new report
  const newReport = req.body;
  // Assume saving to database
  res.status(201).json({ id: '2', status: 'Created' });
};

module.exports = { getReports, createReport };

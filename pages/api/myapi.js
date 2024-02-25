import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Get the file path of data.json in the public folder
  const filePath = path.join(process.cwd(), 'pages/api', 'tree.json');

  // Function to check authentication
  const authenticate = () => {
    const apiToken = process.env.API_TOKEN; // Get the API token from the environment variable
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and has the correct token
    if (!authHeader || authHeader !== `Bearer ${apiToken}`) {
      return false;
    }

    return true;
  };

  // Check authentication before proceeding
  if (!authenticate()) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // Read the file contents
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      res.status(500).json({ error: 'Error reading data' });
      return;
    }

    // Parse the JSON data
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (err) {
      console.error('Error parsing JSON data:', err);
      res.status(500).json({ error: 'Error parsing data' });
    }
  });
}

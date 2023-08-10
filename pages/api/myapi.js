import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Get the file path of data.json in the public folder
  const filePath = path.join(process.cwd(), 'public', 'tree.json');

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
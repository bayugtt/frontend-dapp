// api/sheetsApi.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

type SheetForm = {
  wallet1: string;
  twitter: string;
  retweet: string;
  burn: string;
  ipValue: string;
  data1: string;
  referralValue: string;
};

const API_KEY = "hsdjbeliwu&$sfknfsa2rp29734ry2"; // Retrieve the API key from environment variable

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the API key is provided in the request headers
  const apiKey = req.headers.authorization;

  if (apiKey !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const body = req.body as SheetForm;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({
      auth,
      version: 'v4',
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: '13zBOMbf_RGV-5TqYLrHtI2Sp9wV20-YZnL5RQxBw_RY',
      range: 'A1:G1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            body.wallet1,
            body.data1,
            body.twitter,
            body.retweet,
            body.burn,
            body.ipValue,
            body.referralValue,
          ],
        ],
      },
    });

    return res.status(201).json({
      data: response.data,
    });
  } catch (error: any) {
    console.error('Error:', error);

    // Adjust the status code and response message
    return res.status(500).json({ message: error.message });
  }
}

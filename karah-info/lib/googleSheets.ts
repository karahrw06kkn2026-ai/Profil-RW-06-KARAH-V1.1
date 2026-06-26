export interface UMKM {
  id: string;
  nama_umkm: string;
  pemilik: string;
  rt: string;
  alamat: string;
  deskripsi: string;
  whatsapp: string;
  maps: string;
  foto: string;
  kategori?: string;
}

export async function getUMKMData(): Promise<UMKM[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_API_KEY;
  
  if (!sheetId || !apiKey) {
    console.error("ENV VARS MISSING - sheetId:", !!sheetId, "apiKey:", !!apiKey);
    const dummyData = await import("@/data/umkm-dummy.json");
    return dummyData.default as UMKM[];
  }

  try {
    const sheetName = encodeURIComponent("Form Responses 1");
    const range = `${sheetName}!A2:K200`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    console.log("Fetching URL:", url);

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Google Sheets error body:", errorBody);
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const data = await response.json();
    const rows: string[][] = data.values || [];

    return rows
      .filter((row) => row.length >= 8)
      .map((row, index) => ({
        id: row[0] || String(index + 1),
        nama_umkm: row[2] || "",
        rt: row[3] || "",
        pemilik: row[4] || "",
        whatsapp: row[5] || "",
        alamat: row[6] || "",
        deskripsi: row[7] || "",
        maps: row[8] || "",
        foto: row[9] || "",
        kategori: row[10] || "Umum",
      }));

  } catch (error) {
    console.error("Failed to fetch from Google Sheets:", error);
    const dummyData = await import("@/data/umkm-dummy.json");
    return dummyData.default as UMKM[];
  }
}

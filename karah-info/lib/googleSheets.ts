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

  // Fallback to dummy data if env vars not set
  if (!sheetId || !apiKey) {
    const dummyData = await import("@/data/umkm-dummy.json");
    return dummyData.default as UMKM[];
  }

  try {
    const range = "Sheet1!A2:J200";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // ISR: revalidate every 1 hour
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const data = await response.json();
    const rows: string[][] = data.values || [];

    return rows
      .filter((row) => row.length >= 8)
      .map((row, index) => ({
        id: row[0] || String(index + 1),
        nama_umkm: row[1] || "",
        pemilik: row[2] || "",
        rt: row[3] || "",
        alamat: row[4] || "",
        deskripsi: row[5] || "",
        whatsapp: row[6] || "",
        maps: row[7] || "",
        foto: row[8] || "",
        kategori: row[9] || "Umum",
      }));
  } catch (error) {
    console.error("Failed to fetch from Google Sheets, using dummy data:", error);
    const dummyData = await import("@/data/umkm-dummy.json");
    return dummyData.default as UMKM[];
  }
}

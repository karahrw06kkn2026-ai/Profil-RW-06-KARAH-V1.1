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
    const sheetName = encodeURIComponent("Form Responses 1");
    const range = `${sheetName}!A2:K200`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const data = await response.json();
    const rows: string[][] = data.values || [];

    return rows
      .filter((row) => row.length >= 8)
      .map((row, index) => ({
        id: row[0] || String(index + 1),        // A = id
        // row[1] = Timestamp (skip)
        nama_umkm: row[2] || "",                // C = nama_usaha
        rt: row[3] || "",                       // D = rt
        pemilik: row[4] || "",                  // E = pemilik
        whatsapp: row[5] || "",                 // F = nomor_whatsapp
        alamat: row[6] || "",                   // G = alamat
        deskripsi: row[7] || "",                // H = deskripsi
        maps: row[8] || "",                     // I = maps_url
        foto: row[9] || "",                     // J = foto UMKM
        kategori: row[10] || "Umum",            // K = kategori
      }));

  } catch (error) {
    console.error("Failed to fetch from Google Sheets, using dummy data:", error);
    const dummyData = await import("@/data/umkm-dummy.json");
    return dummyData.default as UMKM[];
  }
}
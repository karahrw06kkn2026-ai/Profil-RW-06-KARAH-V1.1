export function getDirectDriveUrl(url: string): string {
  if (!url) return "";

  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  const match2 = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (match2) {
    return `https://drive.google.com/uc?export=view&id=${match2[1]}`;
  }

  return url;
}
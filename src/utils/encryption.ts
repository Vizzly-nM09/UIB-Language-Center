import CryptoJS from "crypto-js";

// Kunci rahasia untuk enkripsi dan dekripsi
const SECRET_KEY =
  process.env.ENCRYPTION_SECRET_KEY || "UIB_Jayalah_Selamanya_*&#";

/**
 * Mengenkripsi data.
 * @param data - Data yang akan dienkripsi
 * @returns String terenkripsi
 */
export function encrypt(data: string | number): string {
  // return CryptoJS.AES.encrypt(data.toString(), SECRET_KEY).toString();
  const encrypted = CryptoJS.AES.encrypt(
    data.toString(),
    SECRET_KEY
  ).toString();
  return encrypted.replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "");
}

/**
 * Mendekripsi data terenkripsi.
 * @param encryptedData - Data yang telah dienkripsi
 * @returns String asli yang telah didekripsi
 */
export function decrypt(encryptedData: string): string {
  // const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  // return bytes.toString(CryptoJS.enc.Utf8);
  const base64Data = encryptedData.replace(/_/g, "/").replace(/-/g, "+");
  const decrypted = CryptoJS.AES.decrypt(base64Data, SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

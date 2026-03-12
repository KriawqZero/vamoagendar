import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

const s3Client = new S3Client({
  endpoint: process.env.AWS_ENDPOINT_URL,
  region: process.env.AWS_DEFAULT_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // Required for MinIO and S3-compatible services
});

const BUCKET = process.env.AWS_S3_BUCKET_NAME!;

/**
 * Upload a logo file to MinIO
 * @param userId - User ID for organizing files
 * @param file - File buffer
 * @param contentType - MIME type (e.g., image/png)
 * @returns The object key (path) in the bucket
 */
export async function uploadLogo(
  userId: string,
  file: Buffer,
  contentType: string
): Promise<string> {
  const timestamp = Date.now();
  const randomId = nanoid(8);
  const ext = contentType.split("/")[1] || "png";
  const key = `logos/${userId}/${timestamp}-${randomId}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await s3Client.send(command);
  return key;
}

/**
 * Delete a logo file from MinIO
 * @param key - The object key (path) in the bucket
 */
export async function deleteLogo(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Get the public URL for a logo
 * @param key - The object key (path) in the bucket
 * @returns The public URL
 */
export function getLogoUrl(key: string): string {
  // If using AWS S3, construct the standard S3 URL
  if (!process.env.AWS_ENDPOINT_URL) {
    const region = process.env.AWS_DEFAULT_REGION || "us-east-1";
    return `https://${BUCKET}.s3.${region}.amazonaws.com/${key}`;
  }
  
  // For MinIO or other S3-compatible services, use the endpoint URL
  return `${process.env.AWS_ENDPOINT_URL}/${BUCKET}/${key}`;
}

/**
 * Extract the key from a full MinIO URL
 * @param url - Full MinIO URL
 * @returns The object key or null if invalid
 */
export function extractKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    // Remove empty string and bucket name
    const key = pathParts.slice(2).join("/");
    return key || null;
  } catch {
    return null;
  }
}

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function saveFile(
  file: File,
  directory: string
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create unique filename
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name.replace(/\s/g, '-')}`;
  
  // Ensure upload directory exists
  const uploadDir = join(process.cwd(), 'public', directory);
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const path = join(uploadDir, filename);
  await writeFile(path, buffer);

  return `/${directory}/${filename}`;
}

export function validateFile(
  file: File,
  allowedTypes: string[],
  maxSize: number
): { valid: boolean; error?: string } {
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${maxSize / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}


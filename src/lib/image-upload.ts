export async function imagePayload(file: File) {
  const data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return { data, name: file.name, type: file.type as 'image/jpeg' | 'image/png' | 'image/webp' };
}
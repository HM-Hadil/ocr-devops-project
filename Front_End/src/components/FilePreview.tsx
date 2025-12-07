import { FileText } from 'lucide-react';

interface FilePreviewProps {
  file: File;
  previewUrl: string | null;
  darkMode: boolean;
}

export default function FilePreview({ file, previewUrl, darkMode }: FilePreviewProps) {
  if (file.type.startsWith('image/') && previewUrl) {
    return (
      <div className="flex-shrink-0">
        <img
          src={previewUrl}
          alt="Preview"
          className="w-20 h-20 object-cover rounded-lg shadow-md"
        />
      </div>
    );
  }

  return (
    <div className={`flex-shrink-0 w-20 h-20 rounded-lg flex items-center justify-center ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
      <FileText size={32} className={darkMode ? 'text-red-400' : 'text-red-500'} />
    </div>
  );
}

import { Upload, Loader2 } from 'lucide-react';

interface UploadButtonProps {
  status: 'idle' | 'uploading' | 'success' | 'error';
  onUpload: () => void;
  darkMode: boolean;
}

export default function UploadButton({ status, onUpload, darkMode }: UploadButtonProps) {
  const isDisabled = status === 'uploading' || status === 'success';

  return (
    <button
      onClick={onUpload}
      disabled={isDisabled}
      className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
        isDisabled
          ? darkMode
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : darkMode
          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
          : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
      }`}
    >
      {status === 'uploading' ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Uploading...
        </>
      ) : (
        <>
          <Upload size={20} />
          Upload File
        </>
      )}
    </button>
  );
}

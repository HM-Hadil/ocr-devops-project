import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface UploadFeedbackProps {
  status: 'idle' | 'uploading' | 'success' | 'error';
  darkMode: boolean;
  onRetry: () => void;
}

export default function UploadFeedback({ status, darkMode, onRetry }: UploadFeedbackProps) {
  if (status === 'idle') return null;

  if (status === 'uploading') {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-lg ${darkMode ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
        <Loader2 size={20} className={`animate-spin ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
        <p className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          Uploading your file...
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-lg ${darkMode ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <CheckCircle size={20} className={darkMode ? 'text-green-400' : 'text-green-500'} />
        <p className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
          File uploaded successfully!
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/30 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className={`flex-shrink-0 mt-0.5 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
          <div className="flex-1">
            <p className={`text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
              Upload failed. Please try again.
            </p>
            <button
              onClick={onRetry}
              className={`text-sm mt-2 underline ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

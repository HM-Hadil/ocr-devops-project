import { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import FilePreview from './FilePreview';
import UploadButton from './UploadButton';
import UploadFeedback from './UploadFeedback';

interface FileUploadProps {
  darkMode: boolean;
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function FileUpload({ darkMode }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];

  const handleFileSelect = (file: File) => {
    if (!acceptedTypes.includes(file.type)) {
      setUploadStatus('error');
      return;
    }

    setSelectedFile(file);
    setUploadStatus('idle');

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus('uploading');

    await new Promise(resolve => setTimeout(resolve, 2000));

    const success = Math.random() > 0.1;
    setUploadStatus(success ? 'success' : 'error');

    if (success) {
      setTimeout(() => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setUploadStatus('idle');
      }, 3000);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRetry = () => {
    setUploadStatus('idle');
  };

  return (
    <div className={`rounded-xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="p-8">
        {!selectedFile ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all ${
              dragActive
                ? darkMode
                  ? 'border-blue-400 bg-blue-900/20'
                  : 'border-blue-500 bg-blue-50'
                : darkMode
                ? 'border-gray-600 hover:border-gray-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              onChange={handleChange}
            />

            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Upload size={48} className={darkMode ? 'text-blue-400' : 'text-blue-500'} />
              </div>

              <div>
                <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Drag & drop your file here
                </p>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  or
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  } shadow-lg`}
                >
                  Browse Files
                </button>
              </div>

              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Supported formats: JPG, PNG, GIF, WEBP, PDF (Max 10MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`flex items-start justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <FilePreview
                  file={selectedFile}
                  previewUrl={previewUrl}
                  darkMode={darkMode}
                />

                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {selectedFile.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {selectedFile.type}
                  </p>
                </div>
              </div>

              {uploadStatus !== 'uploading' && (
                <button
                  onClick={handleRemove}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? 'hover:bg-gray-600 text-gray-400 hover:text-gray-200'
                      : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label="Remove file"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <UploadFeedback
              status={uploadStatus}
              darkMode={darkMode}
              onRetry={handleRetry}
            />

            <UploadButton
              status={uploadStatus}
              onUpload={handleUpload}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';
import { useFile } from '@/contexts/file-context';
import Modal from './modal';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const { getFiles } = useFile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.style.backgroundColor = '#f0f0f0';
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.style.backgroundColor = '#ffffff';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      event.currentTarget.style.backgroundColor = '#ffffff';
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setModalMessage('Please select a file to upload.');
      setIsModalOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setModalMessage(`File uploaded successfully. Total debts uploaded: ${response.data.rows}.`);
      
      await getFiles(1, 5);
    } catch (error) {
      console.error('Error during file upload:', error);
      setModalMessage('File upload failed.');
    } finally {
      setIsModalOpen(true);
    }
  };

  const fileSizeInMB = file ? (file.size / 1024 / 1024).toFixed(2) : '0';

  return (
    <div
      className="flex flex-col items-center gap-6"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label htmlFor="file" className="block text-center bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-800">
        Choose File
        <input id="file" type="file" accept=".csv" onChange={handleFileChange} className="sr-only" />
      </label>
      <div className="text-sm text-gray-500">Click above to choose a file or drag it here.</div>

      {file && (
        <div className="mt-4 p-4 w-full max-w-md text-center rounded-lg shadow-lg bg-white">
          <div><strong>Name:</strong> {file.name}</div>
          <div><strong>Size:</strong> {fileSizeInMB} MB</div>
          <button
            onClick={handleUpload}
            className="mt-4 px-6 py-3 rounded-lg font-semibold text-lg bg-blue-700 text-white hover:bg-blue-800"
          >
            Upload File
          </button>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="File Upload Status">
        <div className="text-center">
          {modalMessage}
        </div>
      </Modal>
    </div>
  );
};

export { FileUploader };

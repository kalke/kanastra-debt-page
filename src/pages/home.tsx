import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  FileUploader,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { useFile } from '@/contexts/file-context';
import { UploadStatus } from '@/contexts/file-context';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

const formatDate = (dateString: string) => {
  const timeZone = 'America/Sao_Paulo';
  const utcDate = zonedTimeToUtc(dateString, 'UTC');
  const zonedDate = utcToZonedTime(utcDate, timeZone);
  return format(zonedDate, 'dd/MM/yyyy HH:mm', { timeZone });
};

const Home = () => {
  const { files, pagination, nextPage, prevPage } = useFile();

  const handleProcessDebts = async (fileId: number) => {
    const response = await axios.get(`http://localhost:8000/process/debts?file_id=${fileId}`);
    alert('Total sent emails: ' + response.data.total_sent_emails);
  };

  return (
    <div className="p-5">
      <FileUploader />
      <div className="mt-8 overflow-hidden rounded-lg shadow-lg">
        <Table>
          <TableCaption className="bg-gray-200 text-lg font-semibold p-4">Received Files</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-left p-4">ID</TableHead>
              <TableHead className="text-left p-4">File Name</TableHead>
              <TableHead className="text-left p-4">Sent Date</TableHead>
              <TableHead className="text-left p-4">Row Count</TableHead>
              <TableHead className="text-left p-4">Time to Upload</TableHead>
              <TableHead className="text-left p-4">Upload Status</TableHead>
              <TableHead className="text-left p-4">Process Debts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index} className="border-b">
                <TableCell className="p-4">{file.id}</TableCell>
                <TableCell className="p-4">{file.file_name}</TableCell>
                <TableCell className="p-4">{formatDate(file.created_at)}</TableCell>
                <TableCell className="p-4">{file.row_count}</TableCell>
                <TableCell className="p-4">{file.time_to_process ? `${file.time_to_process} seconds` : 'N/A'}</TableCell>
                <TableCell className="p-4">
                  {file.upload_status === UploadStatus.UPLOADING && (
                    <div className="tooltip inline-block" data-tip="Loading">
                      <svg className="animate-spin h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="ml-2 text-gray-500">Uploading</span>
                    </div>
                  )}
                  {file.upload_status === UploadStatus.SUCCESS && (
                    <div className="tooltip inline-block" data-tip="Success">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-green-500">Success</span>
                    </div>
                  )}
                  {file.upload_status === UploadStatus.FAILED && (
                    <div className="tooltip inline-block" data-tip="Error">
                      <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="ml-2 text-red-500">Failed</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="p-4">
                  {file.upload_status === UploadStatus.SUCCESS && (
                    <button onClick={() => handleProcessDebts(file.id)} className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Process
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-between items-center p-4 bg-gray-200 rounded-lg shadow-lg">
        <span className="text-sm text-gray-600">
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <div>
          <button onClick={prevPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Previous
          </button>
          <button onClick={nextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

import axios from "axios";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

enum UploadStatus {
  UPLOADING = 'UPLOADING',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS'
}

type File = {
  id: number;
  file_name: string;
  created_at: string;
  row_count: number;
  upload_status: UploadStatus;
  time_to_process: number;
}

type Pagination = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

type FileContextType = {
  files: File[];
  pagination: Pagination;
  getFiles: (page: number, pageSize: number) => Promise<void>;
  nextPage: () => void;
  prevPage: () => void;
};

const FileContext = createContext<FileContextType | undefined>(undefined);

interface FileProviderProps {
  children: ReactNode;
}

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, totalPages: 1, pageSize: 5 });

  const getFiles = async (page: number, pageSize: number) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/files/list?page=${page}&items_per_page=${pageSize}`);
      setFiles(data.data);
      setPagination({ currentPage: page, totalPages: data.total_pages, pageSize: pageSize });
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    getFiles(pagination.currentPage, pagination.pageSize);

    const interval = setInterval(() => {
      getFiles(pagination.currentPage, pagination.pageSize);
    }, 3000);

    return () => clearInterval(interval);
  }, [pagination.currentPage, pagination.pageSize]);

  const nextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination({...pagination, currentPage: pagination.currentPage + 1});
    }
  };

  const prevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination({...pagination, currentPage: pagination.currentPage - 1});
    }
  };

  return (
    <FileContext.Provider value={{ files, pagination, getFiles, nextPage, prevPage }}>
      {children}
    </FileContext.Provider>
  );
};


export const useFile = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
};

export { UploadStatus };
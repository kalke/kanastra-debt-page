import axios from "axios";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type File = {
  id:number
  file_name:string
  created_at:string
  row_count:number
  time_to_process:number
}

type FileContextType = {
  files: File[];
  getFiles: () => Promise<void>;
};

const FileContext = createContext<FileContextType | undefined>(undefined);

interface FileProviderProps {
  children: ReactNode;
}

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [files, setFiles] = useState<[]>([]);

  const getFiles = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/files/list");
      setFiles(data.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <FileContext.Provider value={{ files, getFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFile deve ser usado dentro de um FileProvider");
  }
  return context;
};

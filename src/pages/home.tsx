import {
  FileUploader,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { useFile } from "@/contexts/file-context";
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

const formatDate = (dateString: string) => {
  const timeZone = 'America/Sao_Paulo';
  const utcDate = zonedTimeToUtc(dateString, 'UTC');
  const zonedDate = utcToZonedTime(utcDate, timeZone);
  return format(zonedDate, 'dd/MM/yyyy HH:mm', { timeZone });
};

const Home = () => {
  const { files } = useFile();

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
              <TableHead className="text-left p-4">Time to Process</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files?.map((file, index) => (
              <TableRow key={index} className="border-b">
                <TableCell className="p-4">{file.id}</TableCell>
                <TableCell className="p-4">{file.file_name}</TableCell>
                <TableCell className="p-4">{formatDate(file.created_at)}</TableCell>
                <TableCell className="p-4">{file.row_count}</TableCell>
                <TableCell className="p-4">{file.time_to_process} seconds</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;

import { IconButton } from "@mui/material";
import axios from "axios";
import { useState } from "react";
//import DownloadIcon from '@mui/icons-material/Download';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import apiClient from "../../apiClient";
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';


const DownloadFile = ({fileName}:{fileName:string}) => {

    const [progress, setProgress] = useState(0);
    const currentUser = useSelector((state:RootState)=>state.user.currentUser);
    
    const hanleDownload = async () => {
        
        try {
      
        //   שלב 1: קבלת Presigned URL מהשרת
          const response = await apiClient.get('file/download-url', {
            params: {
              userId: currentUser.id,
              fileName},
            // params: { fileName: fileName},
          });
    
          const presignedUrl = response.data.url;
       

          // שלב 2: העלאת הקובץ ישירות ל-S3
        const downloadResponse = await axios.get(presignedUrl,{
            responseType: 'blob',
            onUploadProgress: (progressEvent) => {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / (progressEvent.total || 1)
                );
                setProgress(percent);
              },
        });
    
          // יצירת URL זמני מה-blob
          const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

        } catch (error) {
          console.error('Error downloading file:', error);
        }
        }

    return(<>
    <div style={{margin: 0}}>
          <IconButton size="small" onClick={hanleDownload}>
            {/* <DownloadIcon /> */}
            <SaveAltRoundedIcon/>
          </IconButton>

        {progress > 0 && <div>progress: {progress}%</div>}
    </div>
    </>)
};
export default DownloadFile
import React, { ChangeEvent, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { FileType } from "../../types/FileType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addFile } from "../../store/filesSlice";
import apiClient from "../../apiClient";


// function UploadFile() {

//     const [file, setFile] = useState<File | null>(null);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = event.target.files?.[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//         }
//     };

    // const handleDrop = (event: React.DragEvent) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     const droppedFile = event.dataTransfer.files?.[0];
    //     if (droppedFile) {
    //         setFile(droppedFile);
    //     }
    // };

    // const handleDragOver = (event: React.DragEvent) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    // };
    
//     return (
//         <Box
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             sx={{
//                 border: '2px dashed #ccc',
//                 padding: '20px',
//                 width: '300px',
//                 textAlign: 'center',
//                 '&:hover': {
//                     borderColor: '#007bff',
//                 },
//             }}
//         >
//             <Typography variant="body1" gutterBottom>
//                 גרור את הקובץ לכאן או לחץ כדי לבחור קובץ
//             </Typography>
//             <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
//             <label htmlFor="file-upload">
//                 <Button variant="contained" component="span">
//                     בחר קובץ
//                 </Button>
//             </label>
//             {file && <Typography variant="body2" color="textSecondary">נבחר קובץ: {file.name}</Typography>}
//         </Box>
//     );
//   }
  
//   export default UploadFile;

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state:RootState)=>state.user.currentUser);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
          setFile(event.target.files[0]);
      }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
        setFile(droppedFile);
    }
};

const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
};

  const handleUpload = async () => {

      if (!file) {
          setMessage('Please select a file to upload');
          return;
      }
      console.log('fffffff');

      try {
          // Get pre-signed URL from the server
          const response = await apiClient.get('file/presigned-url', {
              params:{
                userId: currentUser.id,
                fileName: file.name,
              contentType: file.type,}
              //   userName: 'your-username' // Replace with the actual username
          }
          );
          console.log(response);

          const url = response.data.url;
console.log(url);

          // Upload the file to S3 using the pre-signed URL
          const uploadResponse = await axios.put(url, file, {
              headers: {
                  'Content-Type': file.type
              }
          });

          if (uploadResponse.status === 200) {
              setMessage('File uploaded successfully');
          } else {
              setMessage('Failed to upload file');
          }
          //add file to db
          console.log(currentUser);
          
          const newFile:Partial<FileType>={
            createdBy: currentUser.id,
            name: file.name,
            type: file.type,
            size: file.size,
            path: url
          }
          const res = await dispatch(addFile(newFile));
          console.log("Added file");
          
      } catch (error) {
          console.error('Error uploading file:', error);
          setMessage('Error uploading file');
      }
  };

  return (
      <div>
        <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="90vh" // שינוי הגובה כדי להגביה את הקומפוננטה
      marginTop="20px" // הוספת רווח עליון
    >
                 <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
                border: '2px dashed #ccc',
                // padding: '20px',
                // width: '300px',
                padding: '40px', // הגדלת ה-padding
                width: '400px', // אפשר להגדיל גם את הרוחב
                textAlign: 'center',
                '&:hover': {
                    borderColor: '#007bff',
                },
            }}
        >
            <Typography variant="body1" gutterBottom>
                Drag the file here or click to select a file
            </Typography>
            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
            <label htmlFor="file-upload">
                <Button variant="contained" component="span" sx={{ marginTop: 4 }}>
                    select file
                </Button>
            </label>
            {file && <Typography variant="body2" color="textSecondary"> {file.name}</Typography>}
        </Box>
          {/* <h2>Upload Image to AWS S3</h2>
          <input type="file" onChange={handleFileChange} /> */}
            <Button onClick={handleUpload} sx={{ marginTop: 1 }}>upload</Button>
          <p>{message}</p>
          </Box>
      </div>
  );
};

export default UploadFile
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";


function UploadFile() {
    // const [file, setFile] = useState<File | null>(null);

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFile = event.target.files?.[0];
    //     if (selectedFile) {
    //         setFile(selectedFile);
    //     }
    // };

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

    // return (
    //     <div
    //         onDrop={handleDrop}
    //         onDragOver={handleDragOver}
    //         style={{ border: '2px dashed #ccc', padding: '20px', width: '300px', textAlign: 'center' }}
    //     >
    //         <p>גרור את הקובץ לכאן או לחץ כדי לבחור קובץ</p>
    //         <input type="file" onChange={handleFileChange}  />
            
    //         {file && <p>נבחר קובץ: {file.name}</p>}
    //     </div>
    // );
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
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

    return (
        <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
                border: '2px dashed #ccc',
                padding: '20px',
                width: '300px',
                textAlign: 'center',
                '&:hover': {
                    borderColor: '#007bff',
                },
            }}
        >
            <Typography variant="body1" gutterBottom>
                גרור את הקובץ לכאן או לחץ כדי לבחור קובץ
            </Typography>
            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
            <label htmlFor="file-upload">
                <Button variant="contained" component="span">
                    בחר קובץ
                </Button>
            </label>
            {file && <Typography variant="body2" color="textSecondary">נבחר קובץ: {file.name}</Typography>}
        </Box>
    );
  }
  
  export default UploadFile;
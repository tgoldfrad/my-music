
// import React, { useState } from 'react';
// import { Card, CardContent, CardActions, IconButton, Typography, Box } from '@mui/material';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import DownloadFile from './DownloadFile';
// import DeleteFile from './DeleteFile';


// const FileCard = ({id, fileName}:{id:number, fileName:string}) => {
//   const [hover, setHover] = useState(false);

//   return (
//     <Card 
//       onMouseEnter={() => setHover(true)} 
//       onMouseLeave={() => setHover(false)} 
//       variant="outlined" 
//       sx={{ 
//         maxWidth: 300, 
//         borderRadius: 2,
//         position: 'relative', 
//         display: 'flex',
//         alignItems: 'center',
//         padding: '10px',
//         backgroundColor: hover ? 'rgba(0, 0, 0, 0.04)' : 'white',
//         transition: 'background-color 0.3s',
//         boxShadow: hover ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'
//       }}
//     >
//       <InsertDriveFileIcon sx={{ fontSize: 40, marginRight: '10px' }} />
//       <Box sx={{ flexGrow: 1 }}>
//         <Typography variant="body1" component="div" noWrap>
//           {fileName}
//         </Typography>
//       </Box>
//       {hover && (
//         <CardActions sx={{ position: 'absolute', right: 10, display: 'flex', flexDirection: 'row' }}>
//           <DownloadFile fileName={fileName}/>
//           <DeleteFile id={id}/>

//         </CardActions>
//       )}
//     </Card>
//   );
// };

// export default FileCard

import React, { useState } from 'react';
import { Card, CardActions, Typography, Box } from '@mui/material';
import DownloadFile from './DownloadFile';
import DeleteFile from './DeleteFile';

const FileCard = ({ id, fileName }: { id: number; fileName: string }) => {
  const [hover, setHover] = useState(false);
  const fileNameArr = fileName.split('.');
  const type = fileNameArr[fileNameArr.length - 1];
  const imageSrc = type === 'pdf'
    // ? "https://cdn-icons-png.flaticon.com/128/136/136522.png"
    ? "../../src/assets/‏‏pdf.PNG"

    : "../../src/assets/for‏‏mp3.PNG";

  // : "https://cdn-icons-png.flaticon.com/128/9496/9496646.png"
  const isHebrew = /^[\u0590-\u05FF]+$/.test(fileName); // בדיקה אם הטקסט בעברית
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        maxWidth: 100,
        borderRadius: 2,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // paddingRight: '10px',
        marginRight: '10px',
        backgroundColor: hover ? 'rgba(0, 0, 0, 0.04)' : 'white',
        transition: 'background-color 0.3s',
        boxShadow: hover ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <img
        src={imageSrc}
        alt="File Icon"
        style={{ width: '100%', height: 'auto', borderRadius: '2px 2px 0 0' }}
      />
      {/* <Typography variant="body1" component="div" noWrap sx={{ padding: '10px' }}>
        {fileName}
      </Typography> */}
      <Typography
        variant="body1"
        component="div"
        onClick={toggleText} 
        sx={{
          padding: '10px',
          overflow: isExpanded ? 'visible' : 'hidden',
          textOverflow: isExpanded ? 'clip' : 'ellipsis',
          whiteSpace: isExpanded ? 'normal' : 'nowrap',
          cursor: 'pointer',
          display: 'block', // לוודא שהטקסט מתנהג כמו בלוק
          maxWidth: '100%', // הגדר את רוחב המקסימום
          direction: isHebrew ? 'ltr' : 'rtl' // הגדרת כיוון הטקסט בהתאם לשפה
        }}
      >
        {fileName}
      </Typography>
      {hover && (
        <Box sx={{ position: 'absolute', top: 3, right: 10, display: 'flex', gap: '0' }}>
          <CardActions sx={{ display: 'flex', flexDirection: 'row', padding: 0, margin: 0 }}>
            <DeleteFile id={id} />
            <DownloadFile fileName={fileName} />
          </CardActions>
        </Box>
      )}
    </Box>
  );
};

export default FileCard;
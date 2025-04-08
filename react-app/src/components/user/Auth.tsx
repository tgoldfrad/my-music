// import { FormEvent, useContext, useRef, useState } from "react"
// import { Button,    Grid2 as Grid,    Modal,Box, TextField} from "@mui/material";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
 import Update from "./Update";
 import SignIn from "./SignIn";
 import SignUp from "./SignUp";



// export const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };
// const Auth = () => {
//     // const dispatch = useDispatch<AppDispatch>();
//     // const currentUser = useSelector((state: RootState) => state.user.currentUser);

//     const [openSignIn, setOpenSignIn] = useState(false);
//     const [openSignUp, setOpenSignUp] = useState(false);
//     const [userUpdated, setUserUpdated] = useState(false);

//     const handleSignInSuccess = () => {
//         setUserUpdated(true);
//         setOpenSignIn(false);
//     };

//     const handleSignUpSuccess = () => {
//         setUserUpdated(true);
//         setOpenSignUp(false);
//     };

//     return (
//         <>
//             <Grid container>
//                 <Grid size={4}>
//                     {<div>
//                         <Button color="primary" variant="contained" onClick={() => setOpenSignIn(true)} 
//                             sx={{ backgroundColor: '#ce9575', '&:hover': { backgroundColor: '#b68b65' }, marginRight: '8px' }}>
//                             Sign in </Button>
//                         <Button 
//                             color="primary" variant="contained" onClick={() => setOpenSignUp(true)} 
//                             sx={{ backgroundColor: '#ce9575', '&:hover': { backgroundColor: '#b68b65' } }}>
//                             Sign up </Button>
//                     </div>
                 
//                     }
//                 </Grid>
//             </Grid>
//             {/* {userUpdated ? (
//                 <Update />
//             ) : (
//                 <div>
//                     <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} onSuccess={handleSignInSuccess} />
//                     <SignUp open={openSignUp} onClose={() => setOpenSignUp(false)} onSuccess={handleSignUpSuccess} />
//                 </div>
//             )} */}
//             {userUpdated ? (
//     <Update />
// ) : (
//     <div>
//         <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} onSuccess={() => {
//             setUserUpdated(true);
//             setOpenSignIn(false);
//         }} />
//         <SignUp open={openSignUp} onClose={() => setOpenSignUp(false)} onSuccess={() => {
//             setUserUpdated(true);
//             setOpenSignUp(false);
//         }} />
//     </div>
// )}
//             <Box
//                 sx={{
//                     display: 'flex',                   
//                     justifyContent: 'center',
//                     fontWeight: 'bold',
//                 }}>
//                 <h1>my music</h1>
//             </Box>

//         </>)
// }
// export default Auth

import React, { useState } from 'react';
import { Modal, Box, Button, Grid2 as Grid, Typography } from '@mui/material';
import { modalStyle } from '../../styles/ModalStyle';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";


//https://img.freepik.com/free-photo/flat-lay-audio-cassette-with-musical-notes_23-2148282065.jpg?uid=R194409080&ga=GA1.1.1604458740.1743596294&semt=ais_hybrid
//https://img.freepik.com/free-vector/music-notes-background_23-2151339663.jpg?uid=R194409080&ga=GA1.1.1604458740.1743596294&semt=ais_hybrid
const Auth = () => {
    const [open, setOpen] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const currentUser = useSelector((state:RootState)=>state.user.currentUser);
    // const backgroundStyle = Object.keys(currentUser).length === 0?{
    //     height: "calc(100vh - 18px)",
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat",
    //     backgroundImage: "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url(https://img.freepik.com/free-vector/music-notes-background_23-2151339663.jpg?uid=R194409080&ga=GA1.1.1604458740.1743596294&semt=ais_hybrid)"
    //   }:{};

    const handleSuccess = () => {
        setOpen(false);
    };
    // const toggleForm = () => setIsSignIn(!isSignIn);

    return (<>
         {/* <div style={backgroundStyle}> */}
            {/* <Grid container> */}
                 {/* <Grid size={4} padding={2}> */}
                     {Object.keys(currentUser).length === 0?
                      <div>
                         <Button onClick={() => {setOpen(true);setIsSignIn(true)}} 
                             sx={{color:'#023370','&:hover': {color:'white', backgroundColor: '#023370' }, marginRight: '8px',mb:2 }}>
                             Sign in </Button>
                         <Button 
                              onClick={() => {setOpen(true);setIsSignIn(false)}} 
                             sx={{color:'#023370','&:hover': {color:'white', backgroundColor: '#023370' },mb:2 }}>
                             Sign up </Button>
                     </div>:
                     <Update />
                 
                     }
                 {/* </Grid> */}
             {/* </Grid> */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="auth-modal-title"
                aria-describedby="auth-modal-description"
            >
                <Box sx={{ modalStyle }}>
                    {isSignIn ? (
                        <div>
                            {/* <h2 id="auth-modal-title">Sign In</h2> */}
                            <SignIn onSuccess={handleSuccess}/>
                            {/* <p>Don't have an account? <Button onClick={toggleForm}>Sign Up</Button></p> */}
                        </div>
                    ) : (
                        <div>
                            {/* <h2 id="auth-modal-title">Sign Up</h2> */}
                            <SignUp onSuccess={handleSuccess}/>
                            {/* <p>Already have an account? <Button onClick={toggleForm}>Sign In</Button></p> */}
                        </div>
                    )}
                </Box>
            </Modal>
         {/* </div> */}
        </> );
};



export default Auth;
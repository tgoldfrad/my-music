import { FormEvent, useContext, useRef, useState } from "react"
import { Button,    Grid2 as Grid,    Modal,Box, TextField} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Update from "./Update";



export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Auth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    const [isLogin, setIsLogin] = useState(false)
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState('')
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const url = 'http://localhost:3000/api/user';
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setOpen(false);
        setIsLogin(true);
        const userData = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        }
        try {
            const res = await axios.post(
                url + status, userData
            )
            dispatch({
                type: 'CREATE',
                data:
                {
                    id: status == "/login" ? res.data.user.id : res.data.userId,
                    firstName: status == "/login" ? res.data.user.firstName : '',
                    lastName: status == "/login" ? res.data.user.lastName : '',
                    password: userData.password,
                    email: userData.email
                }
            })
        } catch (e) {
            console.log(e);
            if (e.status === 422) {
                setIsLogin(false);
                alert('user is already login, please press login');
            }
            else if (e.status === 401) {
                setIsLogin(false);
                alert('user not found, please press register');
            }
        }
    }

    return (
        <>
            <Grid container>
                <Grid size={4}>
                    {!isLogin ? <div>
                        <Button color="primary" variant="contained" onClick={() => { setOpen(!open); setStatus('/login'); }} 
                            sx={{ backgroundColor: '#ce9575', '&:hover': { backgroundColor: '#b68b65' }, marginRight: '8px' }}>
                            Sign in </Button>
                        <Button 
                            color="primary" 
                            variant="contained" 
                            onClick={() => { setOpen(!open); setStatus('/register'); }} 
                            sx={{ backgroundColor: '#ce9575', '&:hover': { backgroundColor: '#b68b65' } }}> Sign up </Button>
                    </div> : <Update />}
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: 'flex',                   
                    justifyContent: 'center',
                    fontWeight: 'bold',
                }}>
                <h1>my music</h1>
            </Box>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <TextField type="password" label='password' inputRef={passwordRef} />
                        <TextField type="text" label='email' inputRef={emailRef} />
                        <Button type="submit" color="primary" variant="contained" sx={{ backgroundColor: '#ce9575', '&:hover': { backgroundColor: '#b68b65' }}}>Login</Button>
                    </form>
                </Box>
            </Modal>
        </>)
}
export default Auth
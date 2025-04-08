import { Box, Button, CircularProgress, IconButton, InputAdornment, Modal, TextField } from "@mui/material"
import { FormEvent, useRef, useState } from "react"
import { inputStyle, modalStyle } from "../../styles/ModalStyle"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login } from "../../store/usersSlice";
import { setUser } from "../../store/userSlice";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Errors from "./Errors";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";

const schema = object({
    email: string().email().required(),
    password: string().required().min(6).max(10),
}).required()

const SignIn = ({ onSuccess }:{ onSuccess:() => void }) => {
    const loading = useSelector((state:RootState)=>state.users.loading);

    const dispatch = useDispatch<AppDispatch>();

    //const [open, setOpen] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    
    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
    } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = async (data:any) => {
        //setOpen(false);
            const res = await dispatch(login(data));
            if(res.meta.requestStatus === 'fulfilled') {
                onSuccess();
                dispatch(setUser(res.payload.userDto));
                sessionStorage.setItem('token', res.payload.token);
            }else{
                onSuccess();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.payload.response.data || 'login failed',
                    confirmButtonText: 'Ok',
                })
            }

            


            // console.log(e);
            // if (e.status === 409) {
            //     alert('user is already login, please press login');
            // }
            // else if (e.status === 401) {
            //     alert('Invalid password');
            // }
            // else if (e.status === 404) {
            //     alert('user not found');
            // }

    }
    return(
        <>
            
    {/* <Modal open={open} onClose={onClose}> */}
            <Box sx={modalStyle}>
            <form onSubmit={handleSubmit(onSubmit)}>
                   
                    <TextField label='email' type="email" style={inputStyle} {...register("email")} slotProps={{ input: 
                    { endAdornment: (<InputAdornment position="end"><Email/></InputAdornment>
                            ),},
                        }} />
                    {errors.email && <Errors message={errors.email.message || " "} />}

                    <TextField label='Password' type={showPassword ? 'text' : 'password'} style={inputStyle} {...register("password")}
                    slotProps={{ input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton 
                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                            ),},
                        }}
                    />
                    {errors.password && <Errors message={errors.password.message || " "} />}
                    <div>
                        <Button type="submit" >Sign In</Button>
                    </div>
                    <div style={{display:'flex', justifyContent:"center", marginTop: 4, marginBottom: 4}}>
                    {loading && <CircularProgress />}
                    </div> 
                </form>
            </Box>
        {/* </Modal> */}

        </>
    )
}
export default SignIn
import { useState } from "react"
import { Avatar, Box, Button, CircularProgress, IconButton, InputAdornment, Modal, TextField } from "@mui/material"
import { object, string } from "yup"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { updateUser } from "../../store/usersSlice"
import { clearUser, setUser } from "../../store/userSlice"
import { Email, Person, Visibility, VisibilityOff } from "@mui/icons-material"
import Errors from "./Errors"
import { inputStyle, modalStyle } from "../../styles/ModalStyle"
import Swal from "sweetalert2"
import { useNavigate } from "react-router"

const schema = object({
    name: string().required().min(3),
    email: string().email().required(),
    password: string().required().min(6).max(10),
}).required()
const Update = () => {

    const [openUpdate, setOpenUpdate] = useState(false)
    const loading = useSelector((state:RootState)=>state.users.loading);
    const currentUser = useSelector((state:RootState)=>state.user.currentUser);
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const logOut = ()=>{
        dispatch(clearUser());
        sessionStorage.removeItem('token');
        navigate('/');
    }

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
        
        const res= await dispatch(updateUser({userId:currentUser?.id||-1, user:data}));
        if(res.meta.requestStatus === 'fulfilled') {
            dispatch(setUser(res.payload.userDto));
            sessionStorage.setItem('token', res.payload.token);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.payload.response.data || 'updated failed',
                confirmButtonText: 'Ok',
            })
        }
        setOpenUpdate(false);
   }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "#023370" }}>{currentUser.name?.charAt(0)}</Avatar>
                <span style={{ marginLeft: "10px", fontSize: "20px",color:'#023370'}}>{currentUser.name?currentUser.name:""}</span>
            </div>
            <div>
            <Button onClick={() =>  setOpenUpdate(true) } sx={{color:'#023370','&:hover': {color:'white', backgroundColor: '#023370' },mb:0.5 }}>Update</Button>
            <Button onClick={logOut} sx={{color:'#023370','&:hover': {color:'white', backgroundColor: '#023370' },mb:0.5 }}>Log Out</Button>
            </div>

            <Modal open={openUpdate} onClose={() => setOpenUpdate(false)}>
 
            <Box sx={modalStyle}>
                
            <form onSubmit={handleSubmit(onSubmit)}>
                   
                    <TextField label='name' defaultValue={currentUser.name} style={inputStyle} {...register("name")} slotProps={{ input: 
                    { endAdornment: (<InputAdornment position="end"><Person/></InputAdornment>
                            ),},
                        }} />
                    {errors.name && <Errors message={errors.name.message || " "} />}
                    
                    <TextField label='email' defaultValue={currentUser.email} type="text" style={inputStyle} {...register("email")} slotProps={{ input: 
                    { endAdornment: (<InputAdornment position="end"><Email/></InputAdornment>
                            ),},
                        }} />
                    {errors.email && <Errors message={errors.email.message || " "} />}

                    <TextField label='Password' defaultValue={currentUser.password} type={showPassword ? 'text' : 'password'} style={inputStyle}
                     {...register("password")}
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
                    <Button type="submit" >Update</Button>
                    </div>
                    <div style={{display:'flex', justifyContent:"center", marginTop: 4, marginBottom: 4}}>
                    {loading && <CircularProgress />}
                    </div> 
                </form>
            </Box>
        </Modal>
        </>)
}
export default Update
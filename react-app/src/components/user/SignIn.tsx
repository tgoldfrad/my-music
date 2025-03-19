import { Box, Button, Modal, TextField } from "@mui/material"
import { FormEvent, useRef, useState } from "react"
import { modalStyle } from "../../styles/ModalStyle"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { login } from "../../store/usersSlice";
import { setUser } from "../../store/userSlice";
import { object } from "yup";

const schema = object({
    title: string().required().min(3).max(80),
    description: string(),
    ingredients: array().of(string().required().min(5)).required(),
    instructions: string().required(),
}).required()

const SignIn = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [open, setOpen] = useState(false)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
    } = useForm({ resolver: yupResolver(schema) })

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setOpen(false);
        // setIsLogin(true);
        const userData = {
            email: emailRef.current?.value||'',
            password: passwordRef.current?.value||''
        }
        try {
            const res = await dispatch(login(userData));
            dispatch(setUser(res));
            // dispatch({
            //     type: 'CREATE',
            //     data:
            //     {
            //         id: status == "/login" ? res.data.user.id : res.data.userId,
            //         firstName: status == "/login" ? res.data.user.firstName : '',
            //         lastName: status == "/login" ? res.data.user.lastName : '',
            //         password: userData.password,
            //         email: userData.email
            //     }
            // })
        } catch (e) {
            console.log(e);
            if (e.status === 409) {
                // setIsLogin(false);
                alert('user is already login, please press login');
            }
            else if (e.status === 401) {
                // setIsLogin(false);
                alert('Invalid password');
            }
            else if (e.status === 404) {
                // setIsLogin(false);
                alert('user not found');
            }
        }
    }
    return(
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={modalStyle}>
                    <form onSubmit={handleSubmit}>
                        <TextField type="password" label='password' inputRef={passwordRef} />
                        <TextField type="text" label='email' inputRef={emailRef} />
                        <Button type="submit" color="primary" variant="contained" sx={{ backgroundColor: '#ce9575', '&:hover': { backgroundColor: '#b68b65' }}}>Login</Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
export default SignIn
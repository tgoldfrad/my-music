
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { object, string } from "yup"
import { AppDispatch } from "../../store/store"
import { modalStyle } from "../../styles/ModalStyle"
import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup, TextField } from "@mui/material"
import Errors from "./Errors"

const schema = object({
    name: string().required().min(3).max(80),
    email: string().email().required(),
    password: string().required().min(6).max(10),
    role: string().required(
        
    ),
}).required()
const SignUp = () => {
    //const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
    } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = async (data:any) => {
        dispatch(addRecipe({...data,autherId: currentUser.id}));
        setOpen(false);
        //navigate(-1);
   }
    
    return(<>
    <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={modalStyle}>
            <form onSubmit={handleSubmit(onSubmit)}>
                   
                    <TextField label='name' {...register("name")} />
                    {errors.name && <Errors message={errors.name.message || " "} />}
                    
                    <TextField label='email' type="text" {...register("email")} />
                    {errors.email && <Errors message={errors.email.message || " "} />}

                    <TextField label='password' type="text" {...register("password")} />
                    {errors.password && <Errors message={errors.password.message || " "} />}

                    <RadioGroup {...register("role")}>
                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                    </RadioGroup>
                    {errors.role && <Errors message={errors.role.message || " "} />}

                    <Button type="submit" >add recipe</Button>
                </form>
            </Box>
        </Modal>

        </>)
}
export default SignUp
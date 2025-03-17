import { FormEvent, useContext, useRef, useState } from "react"
import { style } from "./Auth"
import { Avatar, Box, Button, Modal, TextField } from "@mui/material"
import axios from "axios"
import { UserContext } from "./Start"

const Update = () => {

    const [state, dispatch] = useContext(UserContext)
    const [openUpdate, setOpenUpdate] = useState(false)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setOpenUpdate(false);

        const userData = {
            firstName: firstNameRef.current?.value,
            lastName: lastNameRef.current?.value,
            email: emailRef.current?.value,
            address: addressRef.current?.value,
            phone: phoneRef.current?.value,

        }
        try {
            await axios.put(
                `http://localhost:3000/api/user`,
                userData,
                { headers: { 'user-id': state.id } }
            )

            dispatch({
                type: 'UPDATE',
                data: userData
            })

        } catch (e) {
            console.log(e);
            if (e.status === 401 || e.status === 404) {
                alert('user not found, please press register')
            }
        }

    }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "#ce9575" }}>{state.firstName?.charAt(0)}</Avatar>
                <span style={{ marginLeft: "10px", fontSize: "20px" }}>{state.firstName} {state.lastName?state.lastName:"hello guest"}</span>
            </div>
            <Button onClick={() => { setOpenUpdate(!openUpdate) }} style={{color:"black" }}>update</Button>

            <Modal open={openUpdate} onClose={() => setOpenUpdate(false)}>
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <TextField label='firstName' inputRef={firstNameRef} defaultValue={state.firstName} />
                        <TextField label='lastName' inputRef={lastNameRef} defaultValue={state.lastName} />
                        <TextField label='phone' inputRef={phoneRef} />
                        <TextField label='address' inputRef={addressRef} />
                        <TextField label='email' inputRef={emailRef} defaultValue={state.email} />
                        <Button type="submit" >save</Button>
                    </form>
                </Box>
            </Modal>

        </>
    )

}
export default Update
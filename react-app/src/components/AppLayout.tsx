import { Outlet } from "react-router"
import Menu from "./Menu"
import Auth from "./user/Auth"

const AppLayout = ()=>{
    return (<>
    {/* <Auth/> */}
    <Menu/>
    <Outlet/>
    </>)
}
export default AppLayout
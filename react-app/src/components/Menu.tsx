import { AppBar, Box} from "@mui/material"
import { Link } from "react-router"
import Auth from "./user/Auth"
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Menu = ()=>{
    const currentUser = useSelector((state:RootState)=>state.user.currentUser);
    const backgroundStyle = Object.keys(currentUser).length === 0?{
        height: "calc(100vh - 18px)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url(https://img.freepik.com/free-vector/music-notes-background_23-2151339663.jpg?uid=R194409080&ga=GA1.1.1604458740.1743596294&semt=ais_hybrid)"
      }:{};
    const styleLink = {
        textDecoration: 'none',
        color: '#023370',
        fontSize: '16px',
        '&:hover': { 
            backgroundColor: '#ce9575'
        }        
    }
    return (<>

           <div style={backgroundStyle}>


<AppBar position="fixed" sx={{ backgroundColor: '#fc8295', paddingTop: 2 }}> 
<Box sx={{ display: 'flex', justifyContent: 'space-between',alignItems:'center' }}>
<Box sx={{ left:0,top:0, marginLeft: 1 }}>
<Auth/>
</Box>
        <Box
        //sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}
            sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: 2,
                pt:3,
                zIndex: 1,
                color:'#023370'
            }}
        >   
                <Link to='/upload' style={styleLink}>upload file</Link> | 
                <Link to='/files' style={styleLink}> all files</Link> | 
                <Link to='/' style={styleLink}> about</Link>
                {/* <Link to='/recipes' style={styleLink}> recipes list </Link> */}
                 {/* {user.email &&( <Link to={`/recipes/add`} style={styleLink}> | add recipe </Link>)} */}
        </Box>
        </Box>

            </AppBar> 
           </div>

    </>)
}
export default Menu

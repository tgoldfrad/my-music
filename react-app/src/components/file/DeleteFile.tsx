import { IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteFile } from "../../store/filesSlice";
///to do delete from s3///////////////
const DeleteFile = ({id}:{id:number})=>{

    const dispatch = useDispatch<AppDispatch>();
    
    const handleDelete = async()=>{
        try {
            const res = await dispatch(deleteFile(id));
        } catch (e) {
            console.log(e);
        }
    }
    return(<>
    <div style={{margin: 0}}>
          <IconButton size="small" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          </div>
    </>)
}
export default DeleteFile
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useNavigate } from "react-router-dom";
import { useContext, Fragment } from 'react';
import { SideBarContext } from '../context/SideBarContext';


export default function MenuPopupState() {


    const { classId } = useContext(SideBarContext);

    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate(`/class/${classId}/createhomework`);
    }



    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)} sx={{ borderRadius: 15, paddingX: 3, paddingY: 1.5 }}>
                        <AddIcon /> Crear
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={() => handleNavigation()}><ArticleOutlinedIcon sx={{ mr: 1 }} /> Tarea</MenuItem>
                        <MenuItem onClick={popupState.close}><HelpCenterOutlinedIcon sx={{ mr: 1 }} />Pregunta</MenuItem>
                        <Divider />
                        <MenuItem onClick={popupState.close}><ViewListOutlinedIcon sx={{ mr: 1 }} />Tema</MenuItem>
                    </Menu>
                </Fragment>
            )}
        </PopupState>
    );
}

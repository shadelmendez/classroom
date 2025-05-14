import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

export default function MenuPopupState() {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)} sx={{ borderRadius: 15, paddingX: 3, paddingY: 1.5 }}>
                        <AddIcon /> Crear
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}><ArticleOutlinedIcon sx={{ mr: 1 }} /> Tarea</MenuItem>
                        <MenuItem onClick={popupState.close}><ArticleOutlinedIcon sx={{ mr: 1 }} /> Tarea con cuestionario</MenuItem>
                        <MenuItem onClick={popupState.close}><HelpCenterOutlinedIcon sx={{ mr: 1 }} />Pregunta</MenuItem>
                        <Divider />
                        <MenuItem onClick={popupState.close}><ViewListOutlinedIcon sx={{ mr: 1 }} />Tema</MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}

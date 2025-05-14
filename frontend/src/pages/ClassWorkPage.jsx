import MenuPopupState from '../components/MenuPopupState'
import { Box } from '@mui/material'
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Theme from '../components/Theme';

export default function ClassWorkPage() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Box>
            <MenuPopupState />
            <Box sx={{ marginY: 2, width: "40%", }}>
                <FormControl sx={{ width: "100%", }}>
                    <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Todos los temas</em>
                        </MenuItem>
                        <MenuItem value={10}>Tema 1</MenuItem>
                        <MenuItem value={20}>Tema 2</MenuItem>
                        <MenuItem value={30}>Tema 3</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Theme />
        </Box>
    )
}

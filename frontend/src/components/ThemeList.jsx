import { useContext } from 'react';
import { SideBarContext } from '../context/SideBarContext';
import ThemeItem from './ThemeItem';

export default function ThemeList() {
    const { themesData } = useContext(SideBarContext);

    return (
        <>
            {themesData.map((theme, index) => (
                <ThemeItem key={index} theme={theme} />
            ))}
        </>
    );
}

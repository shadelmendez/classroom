import { createContext, useState } from 'react'

export const SideBarContext = createContext()

function SideBarProvider({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <SideBarContext.Provider value={{ open, setOpen }}>{children}</SideBarContext.Provider>
    )
}

export default SideBarProvider
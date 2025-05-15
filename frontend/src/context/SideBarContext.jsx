import { createContext, useState } from 'react'

export const SideBarContext = createContext()

function SideBarProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [classId, setClassId] = useState("")

    return (
        <SideBarContext.Provider value={{ open, setOpen, classId, setClassId }}>{children}</SideBarContext.Provider>
    )
}

export default SideBarProvider
import { createContext, useContext, useState } from "react";


export const DataContext = createContext({} as any);

export const DataProvider = ({children}: any) => {
    const [ rooms, setRooms ] = useState<string[]>([]);
    const [ messages, setMessages ] = useState<{ name: string; message: string }[]>([]);
    const [ users, setUsers ] = useState<{id: string; name: string}[]>([]);


    return (
        <DataContext.Provider value={{ rooms, setRooms, messages, setMessages, users, setUsers }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
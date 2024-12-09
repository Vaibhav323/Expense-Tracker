import {createContext, useContext, useState} from "react";
import {useLocalStorageState} from "./useLocalStorageState.jsx";

const ExpenseContext = createContext(null);

function ExpenseProvider({children}) {
    // const [expenses, setExpenses] = useState(initialState);
    const [list,setList] = useLocalStorageState([],"expense");
    const [counter, setCounter] = useState(list.length);

    return <ExpenseContext.Provider value={{
        list,setList,counter, setCounter
    }}>
        {children}
    </ExpenseContext.Provider>
}

function useExpensesList(){
    const context = useContext(ExpenseContext);
    if(context === undefined) {
        throw new Error("ExpenseContext was used outside the ExpenseProvider");
    }
    return context;
}
export {ExpenseProvider,useExpensesList};
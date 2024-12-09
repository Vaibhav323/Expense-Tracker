import Title from "./components/Title";
import ExpenseForm from "./components/ExpenseForm";
import Dashboard from "./components/Dashboard";
import ExpenseList from "./components/ExpenseList";

function App() {
    return (
        <div className={"expense-container"}>
            <Title/>
            <div style={{display: "flex",justifyContent: "space-around"}}>
                <Dashboard/>
                <ExpenseForm/>
            </div>
            <ExpenseList/>
        </div>)
}

export default App;
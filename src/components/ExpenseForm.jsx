import {useState} from "react";
import {useExpensesList} from "../contexts/ExpenseContext.jsx";
import {Button, Form, Input, Select, Space} from "antd";

const {Option} = Select;
const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate().toString().padStart(2, "0")}`;

function ExpenseForm() {
    const {setList,counter,setCounter} = useExpensesList();
    const [expense, setExpense] = useState("");
    const [amount, setAmount] = useState(null);
    const [category, setCategory] = useState(null);
    const [expenseDate, setExpenseDate] = useState(today);

    function handleSubmit(e) {
        e.preventDefault();
        if (expense === "" || amount === null || category === "") {
            alert("All fields are required");
            return;
        }
        if (amount <= 0) {
            alert("Amount cannot be a negative value");
            return;
        }
        const new_expense = {
            id: counter + 1,
            name: expense,
            amount,
            category,
            date: expenseDate,
        }
        setList((expense)=>[...expense, new_expense]);
        setCounter(counter + 1);
        setExpense("");
        setAmount(null);
        setCategory(null);
    }

    return (
        <Form className={"expense-form"}>
            <Space direction="vertical" className={"form-group"}>
                <label className="form-label">Transaction Name</label>
                <Input className="expense-input" value={expense} onChange={(e) => setExpense(e.target.value)} allowClear  />
                <label className="form-label">Amount</label>
                <Input className="expense-input" type={"Number"} value={amount} onChange={(e)=>setAmount(e.target.value)} prefix={"₹"}
                       status={amount <= -1 ? "error" : "success"}/>
                <label className="form-label">Category</label>
                <Select className={"category-select"} value={category} showSearch onChange={(value)=>setCategory(value)} onSearch={value=>console.log('search:', value)}>
                    <Option value={"🥗 Food and Drinks"}>🥗 Food and Drinks</Option>
                    <Option value={"🚌 Transportation"}>🚌 Transportation</Option>
                    <Option value={"🏠️ Housing"}>🏠️ Housing</Option>
                    <Option value={"💅 Personal Care"}>💅 Personal Care</Option>
                    <Option value={"🏥 Health and Wellness"}>🏥 Health and Wellness</Option>
                    <Option value={"🏫 Education"}>🏫 Education</Option>
                    <Option value={"🎭️ Entertainment"}>🎭️ Entertainment</Option>
                    <Option value={"💰️ Debt Payments"}>💰️ Debt Payments</Option>
                    <Option value={"🐾 Pets"}>🐾 Pets</Option>
                    <Option value={"📦️ Others"}>📦️ Others</Option>
                </Select>
                <label className="form-label">Date</label>
                <Input className="expense-input" type={"date"} value={expenseDate} onChange={(e) => {
                    setExpenseDate(e.target.value);
                }}/>
                    <Button className={"submit-button "} htmlType="submit" type={"primary"}  onClick={handleSubmit}>Submit</Button>
            </Space>

        </Form>

    );
}

export default ExpenseForm;
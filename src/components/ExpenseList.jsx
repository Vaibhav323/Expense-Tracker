import { useExpensesList } from "../contexts/ExpenseContext.jsx";
import {Button, Table} from "antd";

function ExpenseList() {
    const { list,setList } = useExpensesList();
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            // rowScope: 'row',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'datetime',
            render: text => <p>{new Date(text).toLocaleDateString("en-US")}</p>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_,record) => (
                <Button color={"danger"} danger={true} onClick={() => {setList(item=> item.filter(el=>el.id!== record.id))}}>Delete</Button>
            )
        }
    ];
    return (<Table className="expense-table" dataSource={list} columns={columns} />)

}


export default ExpenseList;

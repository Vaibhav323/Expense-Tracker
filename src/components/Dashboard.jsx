import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Doughnut, Pie} from "react-chartjs-2";
import {useExpensesList} from "../contexts/ExpenseContext.jsx";
import {useState,useEffect} from "react";


ChartJS.register(ArcElement, Tooltip, Legend);


function Dashboard() {
    const {list} = useExpensesList();
    const [combinedData, setCombinedData] = useState([]);
    useEffect(() => {
        const newData = list.reduce((acc, curr) => {
            // Use Map for faster lookup
            const existing = acc.get(curr.category);

            if (existing) {
                existing.amount =Number(existing.amount)+ Number(curr.amount);
            } else {
                acc.set(curr.category, { category: curr.category, amount: curr.amount });
            }

            return acc;
        }, new Map());

        // Convert Map to array and update state
        setCombinedData(Array.from(newData.values()));
    }, [list]);
    const amountData = combinedData.map((expense) => expense.amount);
    const labelData = combinedData.map((expense) => expense.category);

    const backgroundColors = [
        "rgba(255, 99, 132, 0.8)",  // Red
        "rgba(54, 162, 235, 0.8)",  // Blue
        "rgba(255, 206, 86, 0.8)",  // Yellow
        "rgba(75, 192, 192, 0.8)",  // Teal
        "rgba(153, 102, 255, 0.8)", // Purple
        "rgba(255, 159, 64, 0.8)",  // Orange
        "rgba(199, 199, 199, 0.8)", // Grey
        "rgba(255, 99, 71, 0.8)",   // Tomato
        "rgba(144, 238, 144, 0.8)", // Light Green
        "rgba(70, 130, 180, 0.8)",  // Steel Blue
    ];

    const data = {
        labels: labelData,
        datasets: [{
            data: amountData,
            backgroundColor: backgroundColors,
            hoverOffset: 4,
            borderWidth: 3,
        }],

    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    display: true,
                    boxWidth: 20,
                    boxHeight: 20,
                    boxPadding: 10,
                    generateLabels: (chart) => {
                        return chart.data.labels.map((label, index) => {
                            return {
                                text: label,
                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                                strokeStyle: chart.data.datasets[0].borderColor || "",
                                lineWidth: 0,
                                borderRadius: 10,
                            };
                        });
                    },
                }
            }
        }
    }

    return <div className={"dashboard-container"}>
        <h2 className={"expense-header"}>Your Expenses</h2>
        <div className="chart-container">
            <Doughnut data={data} options={options}/>
        </div>
    </div>
}

export default Dashboard;


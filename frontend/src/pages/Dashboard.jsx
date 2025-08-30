import React from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import Table from "../components/Table";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = ({
    totalUploadedGB = 120,
    totalProcessedGB = 100,
    totalFailedGB = 10,
    totalSuccessGB = 90,
    fileCounts = { csv: 40, excel: 30, parquet: 30 },
    fileRatios = { csv: 0.4, excel: 0.3, parquet: 0.3 },
    totalFiles = 100,
    failedFiles = 10,
    successFiles = 90,
}) => {
    const barData = {
        labels: ["Uploaded (GB)", "Processed (GB)", "Failed (GB)", "Success (GB)"],
        datasets: [
            {
                label: "GBs",
                data: [totalUploadedGB, totalProcessedGB, totalFailedGB, totalSuccessGB],
                backgroundColor: [
                    "#007bff",
                    "#28a745",
                    "#dc3545",
                    "#17a2b8",
                ],
            },
        ],
    };

    const pieData = {
        labels: ["CSV", "Excel", "Parquet"],
        datasets: [
            {
                label: "File Type Ratio",
                data: [fileCounts.csv, fileCounts.excel, fileCounts.parquet],
                backgroundColor: ["#007bff", "#ffc107", "#6f42c1"],
            },
        ],
    };

    const doughnutData = {
        labels: ["Success", "Failed"],
        datasets: [
            {
                label: "File Status",
                data: [successFiles, failedFiles],
                backgroundColor: ["#28a745", "#dc3545"],
            },
        ],
    };

    return (
        <>
        <div className="container py-5">
            <h2 className="mb-4 text-center">Dashboard Statistics</h2>
            <div className="row g-4 justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow p-3">
                        <h5 className="text-center mb-3">GBs Uploaded/Processed</h5>
                        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow p-3">
                        <h5 className="text-center mb-3">File Type Ratios</h5>
                        <Pie data={pieData} options={{ responsive: true }} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow p-3">
                        <h5 className="text-center mb-3">File Success vs Failed</h5>
                        <Doughnut data={doughnutData} options={{ responsive: true }} />
                    </div>
                </div>
            </div>
        </div>
        <Table /></>
    );
};

export default Dashboard;
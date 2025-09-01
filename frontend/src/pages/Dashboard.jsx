import React, { useEffect, useState } from "react";
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


const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // Example fallback data
    const fallback = {
        fileTypeStats: { csv: 40, excel: 30, parquet: 30 },
        fileStatusStats: { success: 90, failure: 10 },
        fileSizeStats: { csv: 50, excel: 40, parquet: 30 }, // in GB
    };

        useEffect(() => {
            console.log("[Dashboard] Fetching stats from API...");
            fetch("http://localhost:3000/api/stats")
                .then((res) => res.json())
                .then((data) => {
                    console.log("[Dashboard] Stats API response:", data);
                    if (data && (data.fileTypeStats || data[0]?.fileTypeStats)) {
                        setStats(Array.isArray(data) ? data[0] : data);
                    } else {
                        console.warn("[Dashboard] Stats API returned no usable data, using fallback.");
                        setStats(fallback);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("[Dashboard] Failed to fetch stats, using fallback.", err);
                    setStats(fallback);
                    setLoading(false);
                });
        }, []);

    if (loading) return <div className="container mt-5">Loading stats...</div>;

    // Map backend fields to UI variables
    const fileCounts = stats.fileTypeStats || fallback.fileTypeStats;
    const fileSizes = stats.fileSizeStats || fallback.fileSizeStats;
    const fileStatus = stats.fileStatusStats || fallback.fileStatusStats;

    const totalUploadedGB = fileSizes.csv + fileSizes.excel + fileSizes.parquet;
    const totalProcessedGB = totalUploadedGB; // Adjust if you have a separate processed stat
    const totalFailedGB = fileStatus.failure;
    const totalSuccessGB = fileStatus.success;
    const totalFiles = fileCounts.csv + fileCounts.excel + fileCounts.parquet;
    const failedFiles = fileStatus.failure;
    const successFiles = fileStatus.success;

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
            <Table />
        </>
    );
};

export default Dashboard;
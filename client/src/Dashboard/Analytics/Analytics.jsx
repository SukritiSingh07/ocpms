import React from 'react';
import { AnalyticsContainer, AnalyticsTitle, AnalyticsGrid, AnalyticsCard } from './AnalyticStyles';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, } from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

const AnalyticsTab = () => {
    // Dummy data for charts
    const totalTasksData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Tasks Created',
                data: [50, 60, 70, 80, 90],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const lateSubmissionsData = {
        labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
        datasets: [
            {
                label: 'Late Submission Time (minutes)',
                data: [15, -10, 5, -20, 30],
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1,
            },
        ],
    };

    const participantsData = {
        labels: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
        datasets: [
            {
                data: [3, 2, 1, 2, 1],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
            },
        ],
    };

    return (
        <AnalyticsContainer>
            {/* <AnalyticsTitle>Project Analytics</AnalyticsTitle> */}
            <AnalyticsGrid>
            <box style={{display:"flex",justifyContent: "space-evenly"}}>
                <AnalyticsCard>
                    <h3>Total Tasks</h3>
                    <Bar data={totalTasksData} options={{ responsive: true }} />
                </AnalyticsCard>
                <AnalyticsCard>
                    <h3>Late Submissions</h3>
                    <Line data={lateSubmissionsData} options={{ responsive: true }} />
                </AnalyticsCard>
            </box>
 
                <AnalyticsCard >
                    <h3>Participants</h3>
                    <Pie data={participantsData} options={{ responsive: true }} />
                </AnalyticsCard>
            </AnalyticsGrid>
        </AnalyticsContainer>
    );
};

export default AnalyticsTab;

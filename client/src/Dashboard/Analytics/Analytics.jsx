import React from 'react';
import {
    AnalyticsContainer,
    AnalyticsGrid,
    AnalyticsCard,
    AnalyticsHero,
    TopChartsWrapper,
    BottomChartWrapper,
} from './AnalyticStyles';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AnalyticsTab = ({ project, tasks }) => {
    // console.log(project);
    const members = project?.member_id || [];
    const allTasks = [...tasks.todos, ...tasks.doings, ...tasks.dones];
    console.log(tasks);

    // Helper functions for data
    const calculateMonthlyTaskCounts = () => {
        const monthlyCounts = new Array(12).fill(0);
        allTasks.forEach((task) => {
            const month = new Date(task.created).getMonth();
            monthlyCounts[month]++;
        });
        return monthlyCounts;
    };

    const totalTasksData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Tasks Created',
                data: calculateMonthlyTaskCounts(),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const lateSubmissionsData = {
        labels: tasks?.dones.map((_, index) => _.title),
        datasets: [
            {
                label: 'Late Submission Time (minutes)',
                data: tasks?.dones.map((task) => {
                    const deadline = new Date(task.deadline);
                    const completedAt = new Date(task.completed_at);
                    return completedAt.getTime() ? (completedAt - deadline) / (1000 * 60) : 0;
                }),
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1,
            },
        ],
    };
    console.log(members);
    const taskDistribution = {
        labels: members.map((member) => member.member.username),
        datasets: [
            {
                label: 'To Do',
                data: members.map((member) =>
                    tasks.todos.filter((task) => task.assignedToName === member.member.username).length
                ),
                backgroundColor: '#FF6384',
            },
            {
                label: 'Doing',
                data: members.map((member) =>
                    tasks.doings.filter((task) => task.assignedToName === member.member.username).length
                ),
                backgroundColor: '#36A2EB',
            },
            {
                label: 'Done',
                data: members.map((member) =>
                    tasks.dones.filter((task) => task.assignedToName === member.member.username).length
                ),
                backgroundColor: '#FFCE56',
            },
        ],
    };
    console.log(taskDistribution);

    return (
        <AnalyticsContainer>

            {/* Top Charts */}
            <TopChartsWrapper>
                <AnalyticsCard>
                    <h3>Total Tasks</h3>
                    <Bar
                        data={totalTasksData}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                        }}
                    />
                </AnalyticsCard>
                <AnalyticsCard>
                    <h3>Late Submissions</h3>
                    <Line
                        data={lateSubmissionsData}
                        options={{
                            responsive: true,
                            plugins: { legend: { position: 'top' } },
                        }}
                    />
                </AnalyticsCard>
            </TopChartsWrapper>

            {/* Bottom Chart */}
            <BottomChartWrapper>
                <AnalyticsCard>
                    <h3>Task Distribution</h3>
                    <Bar
                        data={taskDistribution}
                        options={{
                            responsive: true,
                            scales: {
                                x: { title: { display: true, text: 'Members' } },
                                y: { beginAtZero: true, title: { display: true, text: 'Task Count' } },
                            },
                            plugins: { legend: { position: 'top' } },
                        }}
                    />
                </AnalyticsCard>
            </BottomChartWrapper>
        </AnalyticsContainer>
    );
};

export default AnalyticsTab;

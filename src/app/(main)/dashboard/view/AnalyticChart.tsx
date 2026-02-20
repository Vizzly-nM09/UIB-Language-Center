'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Tambahkan Interface agar komponen menerima data dari luar
interface AnalyticsChartProps {
  data: {
    labels: string[];
    datasets: any[];
  };
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle',
          font: { size: 10, weight: 'bold' as const },
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: '#16162a',
        padding: 12,
        cornerRadius: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.03)', drawBorder: false },
        ticks: { color: '#94a3b8', font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 10, weight: 'bold' as const } }
      }
    }
  };

  return (
    <div className="relative w-full h-full">
        {/* Gunakan prop data yang dikirim dari DashboardView */}
        <Bar options={options} data={data} />
    </div>
  );
}
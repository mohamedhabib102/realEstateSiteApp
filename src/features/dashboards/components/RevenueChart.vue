<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const { locale } = useI18n()

const labelsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const labelsAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']

const revenue = [32000, 41500, 38000, 52000, 47000, 61000, 58000, 69000, 74000, 66000, 79000, 82400]
const bookings = [24, 31, 28, 40, 36, 48, 44, 55, 58, 50, 62, 66]

const data = computed(() => ({
    labels: locale.value === 'ar' ? labelsAr : labelsEn,
    datasets: [
        {
            label: locale.value === 'ar' ? 'الإيرادات' : 'Revenue',
            data: revenue,
            borderColor: '#1E3A8A',
            backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D; chartArea?: { left: number; top: number; right: number; bottom: number } } }) => {
                const { chart } = context
                const { ctx, chartArea } = chart
                if (!chartArea) return 'rgba(30,58,138,0.08)'
                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                gradient.addColorStop(0, 'rgba(30,58,138,0.25)')
                gradient.addColorStop(1, 'rgba(30,58,138,0.01)')
                return gradient
            },
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointBackgroundColor: '#F59E0B',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
        },
        {
            label: locale.value === 'ar' ? 'الحجوزات' : 'Bookings',
            data: bookings,
            borderColor: '#F59E0B',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointBackgroundColor: '#F59E0B',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
        },
    ],
}))

const options = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    animation: {
        duration: 1100,
        easing: 'easeOutQuart' as const,
    },
    plugins: {
        legend: {
            display: true,
            position: 'bottom' as const,
            align: 'start' as const,
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                boxWidth: 6,
                boxHeight: 6,
                padding: 16,
                color: '#6B7280',
                font: { size: 12, weight: 600 as const },
            },
        },
        tooltip: {
            backgroundColor: '#0f1b3d',
            titleColor: '#fff',
            bodyColor: '#e5e7eb',
            padding: 12,
            cornerRadius: 10,
            displayColors: true,
            boxPadding: 4,
        },
    },
    scales: {
        x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#9CA3AF', font: { size: 11 } },
        },
        y: {
            beginAtZero: true,
            border: { display: false },
            grid: { color: '#F3F4F6', drawTicks: false },
            ticks: {
                color: '#9CA3AF',
                font: { size: 11 },
                maxTicksLimit: 5,
                callback: (value: string | number) => {
                    const n = Number(value)
                    return `${(n / 1000).toFixed(0)}k`
                },
            },
        },
    },
}))
</script>

<template>
    <div class="relative w-full h-64 md:h-72">
        <Line :data="data" :options="options" />
    </div>
</template>
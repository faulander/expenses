<script>
    import { createEventDispatcher } from 'svelte';
    import { getLocalizedMonths } from '$lib/utils/locale.js';
    
    const dispatch = createEventDispatcher();
    
    let { currentMonth, currentYear } = $props();
    
    // Get localized month names based on browser language
    const months = getLocalizedMonths();
    
    // Generate years (current year ± 10 years)
    const currentYearActual = new Date().getFullYear();
    const years = Array.from({ length: 21 }, (_, i) => currentYearActual - 10 + i);
    
    const handleMonthChange = (event) => {
        const month = parseInt(event.target.value);
        console.log('MonthPicker: dispatching monthchange', { year: currentYear, month });
        dispatch('monthchange', { year: currentYear, month });
    };
    
    const handleYearChange = (event) => {
        const year = parseInt(event.target.value);
        console.log('MonthPicker: dispatching monthchange', { year, month: currentMonth });
        dispatch('monthchange', { year, month: currentMonth });
    };
</script>

<div class="flex gap-2">
    <!-- Month Dropdown -->
    <div class="flex-1">
        <label for="month-select" class="sr-only">Select month</label>
        <select
            id="month-select"
            bind:value={currentMonth}
            onchange={handleMonthChange}
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm bg-white cursor-pointer"
        >
            {#each months as month}
                <option value={month.value}>{month.name}</option>
            {/each}
        </select>
    </div>
    
    <!-- Year Dropdown -->
    <div class="w-20">
        <label for="year-select" class="sr-only">Select year</label>
        <select
            id="year-select"
            bind:value={currentYear}
            onchange={handleYearChange}
            class="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm bg-white cursor-pointer"
        >
            {#each years as year}
                <option value={year}>{year}</option>
            {/each}
        </select>
    </div>
</div>

 
<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import flatpickr from 'flatpickr';
    import { theme } from '$lib/stores/theme.js';
    import { getBrowserLocale, getLocaleDateFormat, getFlatpickrLocale } from '$lib/utils/locale.js';
    
    // Import locales for flatpickr
    import { German } from 'flatpickr/dist/l10n/de.js';
    // You can add more locales here as needed:
    // import { French } from 'flatpickr/dist/l10n/fr.js';
    // import { Spanish } from 'flatpickr/dist/l10n/es.js';
    
    const dispatch = createEventDispatcher();
    
    let { value = new Date().toISOString().split('T')[0], placeholder = "Select date..." } = $props();
    
    let datePickerElement;
    let flatpickrInstance;
    
    const handleDateChange = (selectedDates, dateStr) => {
        if (selectedDates[0]) {
            const formattedDate = selectedDates[0].toISOString().split('T')[0];
            dispatch('dateChange', formattedDate);
        }
    };
    
    onMount(() => {
        // Get locale settings
        const browserLocale = getBrowserLocale();
        const dateFormat = getLocaleDateFormat(browserLocale);
        const flatpickrLoc = getFlatpickrLocale(browserLocale);
        
        // Set up locale for flatpickr
        let localeConfig = {};
        if (flatpickrLoc === 'de') {
            localeConfig.locale = German;
        }
        
        // Convert our date format to flatpickr format
        let flatpickrDateFormat = "Y-m-d"; // Internal format (always ISO)
        let altFormat = "F j, Y"; // Display format
        
        if (dateFormat === 'dd.MM.yyyy') {
            altFormat = "d.m.Y";
        } else if (dateFormat === 'MM/dd/yyyy') {
            altFormat = "m/d/Y";
        } else if (dateFormat === 'dd/MM/yyyy') {
            altFormat = "d/m/Y";
        }
        
        // Initialize flatpickr for date selection
        flatpickrInstance = flatpickr(datePickerElement, {
            defaultDate: value,
            dateFormat: flatpickrDateFormat,
            altInput: true,
            altFormat: altFormat,
            onChange: handleDateChange,
            allowInput: true,
            clickOpens: true,
            maxDate: "today",
            ...localeConfig
        });
        
        // Apply dark mode styling based on current theme
        const updateTheme = (currentTheme) => {
            const flatpickrCalendar = flatpickrInstance.calendarContainer;
            if (flatpickrCalendar) {
                if (currentTheme === 'dark') {
                    flatpickrCalendar.classList.add('flatpickr-dark');
                } else {
                    flatpickrCalendar.classList.remove('flatpickr-dark');
                }
            }
        };
        
        // Apply initial theme
        updateTheme($theme);
        
        // Listen for theme changes
        const unsubscribe = theme.subscribe(updateTheme);
        
        return () => {
            unsubscribe();
            if (flatpickrInstance) {
                flatpickrInstance.destroy();
            }
        };
    });
    
    // Update flatpickr when value prop changes
    $effect(() => {
        if (flatpickrInstance && value) {
            flatpickrInstance.setDate(value, false);
        }
    });
</script>

<div class="relative">
    <input
        bind:this={datePickerElement}
        type="text"
        {placeholder}
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white cursor-pointer"
        readonly
    />
</div>

<style>
    /* Dark mode styles for flatpickr */
    :global(.flatpickr-dark) {
        background: rgb(31 41 55);
        border-color: rgb(75 85 99);
        color: rgb(243 244 246);
    }
    
    :global(.flatpickr-dark .flatpickr-months) {
        background: rgb(31 41 55);
        border-bottom-color: rgb(75 85 99);
    }
    
    :global(.flatpickr-dark .flatpickr-month) {
        color: rgb(243 244 246);
    }
    
    :global(.flatpickr-dark .flatpickr-weekday) {
        background: rgb(55 65 81);
        color: rgb(209 213 219);
    }
    
    :global(.flatpickr-dark .flatpickr-day) {
        color: rgb(243 244 246);
    }
    
    :global(.flatpickr-dark .flatpickr-day:hover) {
        background: rgb(55 65 81);
        border-color: rgb(75 85 99);
    }
    
    :global(.flatpickr-dark .flatpickr-day.selected) {
        background: rgb(59 130 246);
        border-color: rgb(59 130 246);
        color: white;
    }
    
    :global(.flatpickr-dark .flatpickr-day.today) {
        border-color: rgb(59 130 246);
    }
    
    :global(.flatpickr-dark .flatpickr-prev-month,
    .flatpickr-dark .flatpickr-next-month) {
        color: rgb(243 244 246) !important;
        background: rgb(55 65 81);
        border-radius: 4px;
    }
    
    :global(.flatpickr-dark .flatpickr-prev-month:hover,
    .flatpickr-dark .flatpickr-next-month:hover) {
        color: white !important;
        background: rgb(59 130 246);
    }
    
    :global(.flatpickr-dark .flatpickr-current-month) {
        color: rgb(243 244 246);
    }
</style> 
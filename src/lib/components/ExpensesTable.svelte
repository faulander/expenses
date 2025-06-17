<script>
    import { createEventDispatcher } from 'svelte';
    import { formatDateForLocale, getBrowserLocale } from '$lib/utils/locale.js';
    
    const dispatch = createEventDispatcher();
    
    let { expenses = [], currentMonth, currentYear } = $props();
    
    let isDeleting = $state(false);
    
    const formatDate = (dateString) => {
        return formatDateForLocale(dateString);
    };
    
    const formatAmount = (amount) => {
        const browserLocale = getBrowserLocale();
        return new Intl.NumberFormat(browserLocale, {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };
    
    const handleEdit = (expense) => {
        dispatch('expenseEdit', expense);
    };

    const handleDelete = async (expenseId) => {
        if (!confirm('Are you sure you want to delete this expense?')) {
            return;
        }
        
        isDeleting = true;
        
        try {
            const response = await fetch('/api/expenses', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: expenseId,
                    year: currentYear,
                    month: currentMonth
                }),
            });
            
            const result = await response.json();
            
            if (result.success) {
                dispatch('expenseDeleted', expenseId);
            } else {
                alert('Error deleting expense: ' + result.error);
            }
        } catch (error) {
            alert('Error deleting expense: ' + error.message);
        } finally {
            isDeleting = false;
        }
    };
    
    // Calculate total
    const total = $derived(
        expenses.reduce((sum, expense) => sum + expense.amount, 0)
    );
    
    const getMonthName = (month) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month - 1];
    };
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            {getMonthName(currentMonth)} {currentYear} Expenses
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Total: <span class="font-semibold text-lg text-blue-600 dark:text-blue-400">{formatAmount(total)}</span>
        </p>
    </div>
    
    {#if expenses.length === 0}
        <div class="p-8 text-center">
            <div class="text-gray-400 dark:text-gray-500 text-6xl mb-4">💸</div>
            <p class="text-gray-600 dark:text-gray-400 text-lg">No expenses recorded for this month</p>
            <p class="text-gray-500 dark:text-gray-500 text-sm">Add your first expense using the form above</p>
        </div>
    {:else}
        <!-- Mobile view -->
        <div class="sm:hidden">
            {#each expenses as expense}
                <div class="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex-1">
                            <p class="font-semibold text-gray-900 dark:text-white">{formatAmount(expense.amount)}</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">{expense.category}</p>
                        </div>
                        <div class="flex gap-1">
                            <button
                                onclick={() => handleEdit(expense)}
                                class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                                aria-label="Edit expense"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button
                                onclick={() => handleDelete(expense.id)}
                                disabled={isDeleting}
                                class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 disabled:opacity-50"
                                aria-label="Delete expense"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{formatDate(expense.date)}</p>
                    {#if expense.note}
                        <p class="text-sm text-gray-600 dark:text-gray-300 italic">{expense.note}</p>
                    {/if}
                </div>
            {/each}
        </div>
        
        <!-- Desktop view -->
        <div class="hidden sm:block overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Date
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Category
                        </th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Amount
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Note
                        </th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {#each expenses as expense}
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {formatDate(expense.date)}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {expense.category}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-right">
                                {formatAmount(expense.amount)}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                                {expense.note || '-'}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div class="flex justify-end gap-2">
                                    <button
                                        onclick={() => handleEdit(expense)}
                                        class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                        aria-label="Edit expense"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                    </button>
                                    <button
                                        onclick={() => handleDelete(expense.id)}
                                        disabled={isDeleting}
                                        class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                                        aria-label="Delete expense"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div> 
<script>
    import { onMount } from 'svelte';
    import ExpenseForm from '$lib/components/ExpenseForm.svelte';
    import ExpensesTable from '$lib/components/ExpensesTable.svelte';
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';
    import MonthPicker from '$lib/components/MonthPicker.svelte';
    
    // State using runes
    let categories = $state([]);
    let expenses = $state([]);
    let currentMonth = $state(new Date().getMonth() + 1);
    let currentYear = $state(new Date().getFullYear());
    let isLoading = $state(true);
    let editingExpense = $state(null);
    
    // Load initial data
    onMount(async () => {
        await loadCategories();
        await loadExpenses();
        isLoading = false;
    });
    
    const loadCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            categories = data;
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };
    
    const loadExpenses = async () => {
        try {
            console.log('Loading expenses for:', { currentYear, currentMonth });
            const response = await fetch(`/api/expenses?year=${currentYear}&month=${currentMonth}`);
            const data = await response.json();
            console.log('Loaded expenses:', data);
            expenses = data;
        } catch (error) {
            console.error('Error loading expenses:', error);
        }
    };
    
    const handleExpenseAdded = (event) => {
        const newExpense = event.detail;
        expenses = [...expenses, newExpense];
    };
    
    const handleExpenseDeleted = (event) => {
        const deletedId = event.detail;
        expenses = expenses.filter(expense => expense.id !== deletedId);
    };

    const handleExpenseEdit = (event) => {
        const expense = event.detail;
        editingExpense = expense;
        // Scroll to form
        document.querySelector('.bg-white.dark\\:bg-gray-800.rounded-lg.shadow-md').scrollIntoView({ 
            behavior: 'smooth' 
        });
    };

    const handleExpenseUpdated = (event) => {
        const updatedExpense = event.detail;
        expenses = expenses.map(expense => 
            expense.id === updatedExpense.id ? updatedExpense : expense
        );
        editingExpense = null;
    };

    const handleCancelEdit = () => {
        editingExpense = null;
    };
    
    const handleCategoryAdded = (event) => {
        const updatedCategories = event.detail;
        categories = updatedCategories;
    };
    
    const handleMonthChange = async (event) => {
        const { year, month } = event.detail;
        console.log('Main page: received monthChange', { year, month, currentYear, currentMonth });
        currentYear = year;
        currentMonth = month;
        console.log('Main page: updated state', { currentYear, currentMonth });
        await loadExpenses();
    };
    

</script>

<svelte:head>
    <title>Expense Tracker</title>
    <meta name="description" content="Track your monthly expenses with ease" />
</svelte:head>

<div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                        💰 Expense Tracker
                    </h1>
                </div>
                <div class="flex items-center space-x-4">
                    <!-- Month selector -->
                    <div class="hidden sm:block">
                        <MonthPicker 
                            {currentMonth} 
                            {currentYear} 
                            on:monthchange={handleMonthChange}
                        />
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {#if isLoading}
            <div class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        {:else}
            <!-- Mobile month selector -->
            <div class="sm:hidden mb-6">
                <div class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Month
                </div>
                <MonthPicker 
                    {currentMonth} 
                    {currentYear} 
                    on:monthchange={handleMonthChange}
                />
            </div>

            <!-- Expense Form -->
            {#key editingExpense}
                <ExpenseForm 
                    {categories} 
                    editingExpense={editingExpense}
                    on:expenseAdded={handleExpenseAdded}
                    on:expenseUpdated={handleExpenseUpdated}
                    on:cancelEdit={handleCancelEdit}
                    on:categoryAdded={handleCategoryAdded}
                />
            {/key}

            <!-- Expenses Table -->
            <ExpensesTable 
                {expenses} 
                {currentMonth} 
                {currentYear}
                on:expenseDeleted={handleExpenseDeleted}
                on:expenseEdit={handleExpenseEdit}
            />
        {/if}
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p class="text-center text-sm text-gray-600 dark:text-gray-400">
                Built with SvelteKit 5 & Tailwind CSS
            </p>
        </div>
    </footer>
</div>

<script>
    import { createEventDispatcher } from 'svelte';
    import DatePicker from './DatePicker.svelte';
    
    const dispatch = createEventDispatcher();
    
    let { categories = [], editingExpense = null } = $props();
    
    // Form state using runes
    let formData = $state({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        note: ''
    });
    
    let newCategory = $state('');
    let showNewCategoryInput = $state(false);
    let isSubmitting = $state(false);
    let isEditMode = $derived(editingExpense !== null);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!formData.amount || !formData.category || !formData.date) {
            alert('Please fill in all required fields');
            return;
        }
        
        isSubmitting = true;
        
        try {
            let response;
            let eventName;
            
            if (isEditMode) {
                // Update existing expense
                response = await fetch('/api/expenses', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        id: editingExpense.id
                    }),
                });
                eventName = 'expenseUpdated';
            } else {
                // Create new expense
                response = await fetch('/api/expenses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                eventName = 'expenseAdded';
            }
            
            const result = await response.json();
            
            if (result.success) {
                dispatch(eventName, result.expense);
                
                // Reset form
                formData = {
                    amount: '',
                    category: '',
                    date: new Date().toISOString().split('T')[0],
                    note: ''
                };
            } else {
                alert(`Error ${isEditMode ? 'updating' : 'adding'} expense: ` + result.error);
            }
        } catch (error) {
            alert(`Error ${isEditMode ? 'updating' : 'adding'} expense: ` + error.message);
        } finally {
            isSubmitting = false;
        }
    };
    
    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;
        
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category: newCategory.trim() }),
            });
            
            const result = await response.json();
            
            if (result.success) {
                dispatch('categoryAdded', result.categories);
                formData.category = newCategory.trim();
                newCategory = '';
                showNewCategoryInput = false;
            }
        } catch (error) {
            alert('Error adding category: ' + error.message);
        }
    };
    
    const handleDateChange = (event) => {
        formData.date = event.detail;
    };

    // Smart amount formatting function
    const formatAmount = (input) => {
        if (!input) return '';
        
        // Remove all non-digit characters (dots, commas, spaces, etc.)
        const digitsOnly = input.replace(/\D/g, '');
        
        if (digitsOnly === '') return '';
        
        // Convert to number and divide by 100 to get euros.cents format
        const amount = parseInt(digitsOnly) / 100;
        
        // Format with 2 decimal places
        return amount.toFixed(2);
    };

    const handleAmountInput = (event) => {
        const inputValue = event.target.value;
        const formatted = formatAmount(inputValue);
        formData.amount = formatted;
        
        // Update the input field to show formatted value
        event.target.value = formatted;
    };

    // Effect to populate form when editing
    $effect(() => {
        if (editingExpense) {
            formData.amount = editingExpense.amount.toString();
            formData.category = editingExpense.category;
            formData.date = editingExpense.date;
            formData.note = editingExpense.note || '';
        }
    });
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {#if isEditMode}
            Edit Expense
        {:else}
            Add New Expense
        {/if}
    </h2>
    
    <form onsubmit={handleSubmit} class="space-y-4">
        <!-- Amount -->
        <div>
            <label for="amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount (€) *
            </label>
            <input
                type="text"
                id="amount"
                bind:value={formData.amount}
                oninput={handleAmountInput}
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter amount (e.g., 450 = 4.50)"
            />
        </div>
        
        <!-- Category -->
        <div>
            <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
            </label>
            <div class="flex gap-2">
                <select
                    id="category"
                    bind:value={formData.category}
                    required
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                    <option value="">Select a category</option>
                    {#each categories as category}
                        <option value={category}>{category}</option>
                    {/each}
                </select>
                <button
                    type="button"
                    onclick={() => showNewCategoryInput = !showNewCategoryInput}
                    class="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    title="Add new category"
                >
                    +
                </button>
            </div>
            
            {#if showNewCategoryInput}
                <div class="mt-2 flex gap-2">
                    <input
                        type="text"
                        bind:value={newCategory}
                        placeholder="New category name"
                        class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                        type="button"
                        onclick={handleAddCategory}
                        class="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onclick={() => { showNewCategoryInput = false; newCategory = ''; }}
                        class="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Cancel
                    </button>
                </div>
            {/if}
        </div>
        
        <!-- Date -->
        <div>
            <div class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date *
            </div>
            <DatePicker 
                value={formData.date}
                placeholder="Select expense date..."
                ondateChange={handleDateChange}
            />
        </div>
        
        <!-- Note -->
        <div>
            <label for="note" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Note
            </label>
            <textarea
                id="note"
                bind:value={formData.note}
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Optional note about this expense..."
            ></textarea>
        </div>
        
        <!-- Submit button -->
        <div class="flex gap-2">
            <button
                type="submit"
                disabled={isSubmitting}
                class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
                {#if isSubmitting}
                    {#if isEditMode}
                        Updating...
                    {:else}
                        Adding...
                    {/if}
                {:else}
                    {#if isEditMode}
                        Update Expense
                    {:else}
                        Add Expense
                    {/if}
                {/if}
            </button>
            
            {#if isEditMode}
                <button
                    type="button"
                    onclick={() => dispatch('cancelEdit')}
                    disabled={isSubmitting}
                    class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    Cancel
                </button>
            {/if}
        </div>
    </form>
</div> 
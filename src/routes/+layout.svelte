<script>
	import '../app.css';
	import '$lib/stores/theme.js'; // Import theme store to initialize dark mode
	
	let { children } = $props();
</script>

{@render children()}

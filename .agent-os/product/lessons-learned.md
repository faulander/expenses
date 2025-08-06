# Lessons Learned

> Last Updated: 2025-08-06
> Version: 1.0.0

## Development Patterns

### Svelte 5 Runes Implementation

**What Works:**
- Using `$state()` for reactive variables provides clean, predictable reactivity
- `onMount()` for data loading ensures proper component initialization
- Event dispatching with `createEventDispatcher()` maintains clear parent-child communication

**Avoid:**
- Mixing old Svelte reactive syntax (`$:`) with new runes syntax
- Direct DOM manipulation when Svelte reactivity can handle state updates
- Complex state updates without proper reactive declarations

### JSON File Storage Patterns

**What Works:**
- Monthly file organization (expenses_YYYY_MM.json) keeps data manageable
- Separate categories.json file allows for independent category management
- Consistent file naming enables predictable data access patterns

**Avoid:**
- Storing all expenses in a single large JSON file (performance issues)
- Direct file system operations in components (use API endpoints instead)
- Missing error handling for file I/O operations

### Mobile-First Responsive Design

**What Works:**
- Conditional rendering for mobile/desktop month picker placement
- Touch-friendly form controls with adequate spacing
- Using Tailwind's responsive utilities for consistent breakpoint management

**Avoid:**
- Desktop-first design that forces mobile compromises
- Complex navigation patterns that don't work well on small screens
- Ignoring thumb-reach zones for frequently used mobile controls

## Architecture Decisions

### Component Structure

**Effective Patterns:**
- Single responsibility components (ExpenseForm, ExpensesTable, ThemeToggle)
- Props-down, events-up data flow for predictable state management
- Reusable utility components with clear interfaces

**Pitfalls to Avoid:**
- Deeply nested component hierarchies that complicate state management
- Components with multiple unrelated responsibilities
- Tight coupling between UI components and data storage logic

### API Design

**Best Practices:**
- RESTful endpoints that map clearly to data operations
- Consistent error handling and response formats
- Month/year query parameters for efficient data filtering

**Common Issues:**
- Overly complex API responses that include unnecessary data
- Missing validation on API inputs
- Inconsistent error response formats

### Theming Implementation

**Successful Approach:**
- CSS custom properties for theme values
- System preference detection with user override capability
- Consistent dark/light mode implementation across all components

**Lessons:**
- Theme state should be managed globally, not per-component
- Transition animations improve theme switching perceived performance
- Default to system preference, but always allow manual override

## Performance Considerations

### Data Loading

**Optimizations:**
- Loading data only for the current month reduces initial load time
- Using loading states prevents user confusion during data fetches
- Caching categories separately from expense data improves efficiency

**Watch Out For:**
- Loading all historical data on application startup
- Synchronous file operations that block the UI
- Missing loading indicators for async operations

### User Experience

**Effective Patterns:**
- Smooth scrolling to form when editing expenses
- Immediate UI updates with optimistic updating
- Clear feedback for all user actions (add, edit, delete)

**UX Pitfalls:**
- Long delays without loading indicators
- Actions that don't provide clear success/failure feedback
- Form states that don't reflect current editing context

## Future Development Guidelines

### Database Migration Preparation

When migrating to SQLite:
- Maintain API compatibility to avoid breaking existing integrations
- Create comprehensive data migration scripts with rollback capability
- Test thoroughly with large datasets to verify performance improvements
- Plan for gradual rollout with fallback to file-based storage

### Feature Addition Philosophy

**Maintain Simplicity:**
- Every new feature should be evaluated against the core mission of simplicity
- Complex features should have simple defaults with optional advanced modes
- UI additions should enhance rather than clutter the core expense entry workflow

**Code Quality Standards:**
- All new features require comprehensive test coverage
- Components should remain single-purpose and reusable
- State management should follow established reactive patterns

## Testing

### Test Framework Setup
- **Vitest** with jsdom environment provides excellent SvelteKit integration
- **Configuration**: Use vitest.config.js with SvelteKit plugin for proper module resolution
- **Structure**: ALL test files must go in dedicated `/test` directory, never alongside source files
- **Organization**: Mirror source structure in test directory (e.g., `test/lib/utils/` for `src/lib/utils/` tests)

### SvelteKit Testing Best Practices
- **API Testing**: For testing SvelteKit API routes (+server.js files), avoid complex mocking and focus on functional tests
- **File Separation**: NEVER place test files alongside source code in SvelteKit projects - causes Vite conflicts
- **Import Paths**: Use relative paths from `/test` directory to source files (e.g., `../../../src/lib/utils/file.js`)
- **Module Resolution**: Use proper import paths and avoid require() in ES modules
- **Official Guide**: https://svelte.dev/docs/svelte/testing provides best practices for testing Svelte components and SvelteKit applications

### Critical Testing Rules
- **ALWAYS** use dedicated `/test` directory structure
- **NEVER** put `.test.js` files in `src/` directory - breaks SvelteKit routing
- **Mirror** source directory structure in test directory for organization
- Remove any `+` prefixes from test file names (reserved for SvelteKit routes)

### Testing Patterns That Work
- Simple unit tests for utility functions without complex mocking
- Integration tests that exercise real file system operations when appropriate
- Environment variable testing for configuration flexibility
- Focus on testing public API behavior rather than internal implementation details
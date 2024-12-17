/**
 * Provides user controls for filtering and searching issues
 * Contains a toggle button for priority filter and a search input
 *
 * @param showHighPriorityOpen Current state of priority filter
 * @param searchTerm Current search term
 * @param onFilterChange Callback for priority filter changes
 * @param onSearchChange Callback for search term changes
 */
interface FilterControlsProps {
    showHighPriorityOpen: boolean;
    searchTerm: string;
    onFilterChange: (value: boolean) => void;
    onSearchChange: (value: string) => void;
}

export function FilterControls({
    showHighPriorityOpen,
    searchTerm,
    onFilterChange,
    onSearchChange
}: FilterControlsProps) {
    return (
        <div className="mb-4 flex items-center gap-4">
            {/* Priority filter toggle button */}
            <button
                onClick={() => onFilterChange(!showHighPriorityOpen)}
                className={`rounded px-4 py-2 ${
                    showHighPriorityOpen
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                }`}
            >
                {showHighPriorityOpen ? 'Show All Issues' : 'Show High Priority Open Issues'}
            </button>

            {/* Organization search input */}
            <div className="max-w-fit flex-1">
                <input
                    type="text"
                    placeholder="Search by organization..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
            </div>
        </div>
    );
}

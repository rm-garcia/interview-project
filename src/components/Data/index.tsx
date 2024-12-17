import { useState } from 'react';
import { useIssueData } from '../../hooks/useIssueData';
import { TypeDistribution } from './TypeDistribution';
import { PriorityDistribution } from './PriorityDistribution';
import { FilterControls } from './FilterControls';
import { IssuesTable } from './IssuesTable';

/**
 * This is the main component that puts everything together
 * It manages the filters and displays all the sub-components
 */
function Data() {
    // Keep track of what filters the user has selected
    const [showHighPriorityOpen, setShowHighPriorityOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Get all the processed data from our hook
    const {
        isLoading,
        error,
        typePercentages,     // For the type percentage cards
        priorityPercentages, // For the priority percentage cards
        sortedResults,       // For the table of issues
        hasResults          // To show "no results" message
    } = useIssueData(showHighPriorityOpen, searchTerm);

    // Show loading or error messages if needed
    if (isLoading) return <div>Loading data...</div>;
    if (error) return <div>Error loading data</div>;

    // Layout all our components in order
    return (
        <div>
            <TypeDistribution data={typePercentages} />
            <PriorityDistribution data={priorityPercentages} />
            <FilterControls
                showHighPriorityOpen={showHighPriorityOpen}
                searchTerm={searchTerm}
                onFilterChange={setShowHighPriorityOpen}
                onSearchChange={setSearchTerm}
            />
            <IssuesTable
                data={sortedResults}
                isEmpty={!hasResults}
            />
        </div>
    );
}

export default Data;

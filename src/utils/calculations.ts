import { SampleData } from "api/types";
import { PRIORITY_ORDER } from "constants/priorities";

// Counts how many issues are in each category (like counting types or priorities)
export const calculateDistribution = (data: SampleData['results'], key: 'type' | 'priority') => {
    return data.reduce((acc: {[key: string]: number}, issue) => {
        const value = issue[key];
        acc[value] = (acc[value] || 0) + 1; // Add 1 to the count for this category
        return acc;
    }, {});
};

// Turns counts into percentages for the display cards
// Example: 5 out of 10 issues = 50%
export const calculatePercentages = (distribution: {[key: string]: number}, total: number) => {
    return Object.entries(distribution).map(([key, count]) => ({
        type: key,
        priority: key,
        percentage: ((count / total) * 100).toFixed(1) // Convert to percentage with 1 decimal
    }));
};

// Sorts and filters the issues based on user selections
export const sortAndFilterResults = (
    data: SampleData['results'],
    showHighPriorityOpen: boolean,
    searchTerm: string
) => {
    // First, sort by priority (urgent first, low last)
    let results = [...data].sort((a, b) => {
        return (PRIORITY_ORDER[a.priority as keyof typeof PRIORITY_ORDER] || 999) -
               (PRIORITY_ORDER[b.priority as keyof typeof PRIORITY_ORDER] || 999);
    });

    // Then filter for high priority open issues if that filter is on
    if (showHighPriorityOpen) {
        results = results.filter(issue =>
            (issue.priority === 'high' || issue.priority === 'urgent') &&
            issue.status.toLowerCase() === 'open'
        );
    }

    // Finally, filter by search term if one is entered
    if (searchTerm) {
        results = results.filter(issue =>
            issue.organization_id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return results;
};

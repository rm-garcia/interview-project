import { useQuery } from "react-query";
import axios from 'axios';
import { SampleData } from "api/types";
import { calculateDistribution, calculatePercentages, sortAndFilterResults } from "../utils/calculations";

// This hook handles all the data processing in one place
// Gets data from API and prepares it for display
export function useIssueData(showHighPriorityOpen: boolean, searchTerm: string) {
    // Fetch data from the API using react-query
    const { data, isLoading, error } = useQuery<SampleData>("serviceDesk",
        async () => {
            const { data } = await axios.get<SampleData>('/api/data');
            return data;
        }
    );

    // If we don't have data yet, return empty arrays
    if (!data) {
        return {
            isLoading,
            error,
            typePercentages: [],      // Empty arrays prevent errors in the components
            priorityPercentages: [],
            sortedResults: [],
            hasResults: false
        };
    }

    // Calculate all the numbers we need to show
    const typeDistribution = calculateDistribution(data.results, 'type');
    const priorityDistribution = calculateDistribution(data.results, 'priority');

    const total = data.results.length;
    const typePercentages = calculatePercentages(typeDistribution, total);
    const priorityPercentages = calculatePercentages(priorityDistribution, total);

    // Sort and filter the results based on user selections
    const sortedResults = sortAndFilterResults(data.results, showHighPriorityOpen, searchTerm);

    return {
        isLoading,
        error,
        typePercentages,
        priorityPercentages,
        sortedResults,
        hasResults: sortedResults.length > 0
    };
}

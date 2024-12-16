// query keys: https://tkdodo.eu/blog/effective-react-query-keys
// useQuery: https://jhaharsh878.medium.com/effortless-data-handling-in-react-a-deep-dive-into-usemutation-and-usequery-5aa405b9dc6d#:~:text=Difference%20between%20useState%20and%20useQuery&text=useState%20is%20like%20a%20simple,a%20smart%20library%20management%20system.
// keyof: https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript
// table tailwind: https://stackoverflow.com/questions/76203405/table-overflow-on-container-div

import { SampleData } from "api/types";
import { useQuery } from "react-query"; // handles loading and error states
// import { useEffect, useState } from "react";
import axios from 'axios'; // HTTP client library
import { useState } from 'react'; // state management

// priority order object
const PRIORITY_ORDER = {
  urgent: 1, // additional priority extra use case
  high: 2,
  normal: 3,
  low: 4,
};

    /**
     * Gets the data.
     * Hint: consider using the react-query library that is ready to go!
     *
     * used useQuery to simplify how data was handled
     * */

function Data() {
    const [showHighPriorityOpen, setShowHighPriorityOpen] = useState(false); // filter state defult f
    const [searchTerm, setSearchTerm] = useState('');

    const { data, isLoading, error } = useQuery<SampleData>("serviceDesk", // query Key
        async () => { // query function
            const { data } = await axios.get<SampleData>('/api/data');
            return data;
        }
    );

    // states handled by react displayed for users
    if (isLoading) return <div>Loading data...</div>;
    if (error) return <div>Error loading data</div>;
    if (!data) return null;

    let sortedResults = [...data.results].sort((a, b) => { // new array sorted .sort()
        return (PRIORITY_ORDER[a.priority as keyof typeof PRIORITY_ORDER] || 999) - // 999 fallback for undefined
               (PRIORITY_ORDER[b.priority as keyof typeof PRIORITY_ORDER] || 999);
    });

    // filter results if active
    sortedResults = sortedResults
        // high priority + open
        .filter(issue => {
            if (showHighPriorityOpen) {
                return (issue.priority === 'high' || issue.priority === 'urgent') &&
                       issue.status.toLowerCase() === 'open';
            }
            return true;
        })
        // organisation search
        .filter(issue => {
            if (searchTerm) {
                return issue.organization_id.toLowerCase()
                    .includes(searchTerm.toLowerCase());
            }
            return true;
        });

    return (
        <div>
            {/* filter button */}
            <div className="mb-4 flex items-center gap-4">
                <button
                    onClick={() => setShowHighPriorityOpen(!showHighPriorityOpen)}
                    className={`rounded px-4 py-2 ${
                        showHighPriorityOpen
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    {showHighPriorityOpen ? 'Show All Issues' : 'Show High Priority Open Issues'}
                </button>

                <div className="max-w-md flex-1">
                    <input
                        type="text"
                        placeholder="Search by organization..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Priority</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Assignee</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {sortedResults.map((issue) => (
                            <tr key={issue.id}>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                        issue.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                        issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                        issue.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {issue.priority}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.type}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.status}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{issue.subject}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.assignee_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* updated. warning message search results */}
                {sortedResults.length === 0 && (
                    <div className="py-4 text-center text-gray-500">
                        No matching issues found
                    </div>
                )}
            </div>
        </div>
    );
}

export default Data;

import { SampleData } from "api/types";

/**
 * Displays issues data in a table format
 * Shows priority, type, status, subject, and assignee for each issue
 * Includes empty state handling
 *
 * @param data Array of issue objects to display
 * @param isEmpty Boolean flag indicating if there are no results to show
 */
interface IssuesTableProps {
    data: SampleData['results'];
    isEmpty: boolean;
}

export function IssuesTable({ data, isEmpty }: IssuesTableProps) {
    // Show message when no results match filters
    if (isEmpty) {
        return (
            <div className="py-4 text-center text-gray-500">
                No matching issues found
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                {/* Table header */}
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Assignee</th>
                    </tr>
                </thead>
                {/* Table body */}
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((issue) => (
                        <tr key={issue.id}>
                            {/* Priority cell with color coding */}
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
        </div>
    );
}

/**
 * Displays the distribution of issue priorities as a grid of cards
 * Similar structure to TypeDistribution but for priority data
 *
 * @param data Array of objects containing priority and percentage information
 */
interface PriorityDistributionProps {
    data: Array<{ priority: string; percentage: string; }>;
}

export function PriorityDistribution({ data }: PriorityDistributionProps) {
    return (
        <div className="mb-4">
            <h2 className="mb-2 text-xl font-bold">Priority Distribution</h2>
            <div className="grid grid-cols-4 gap-4">
                {/* Map each priority to a card display */}
                {data.map(({ priority, percentage }) => (
                    <div key={priority} className="rounded bg-gray-100 p-4">
                        <div className="font-semibold">{priority}</div>
                        <div className="text-2xl">{percentage}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

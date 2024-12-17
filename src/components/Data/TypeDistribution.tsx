/**
 * Displays the distribution of issue types as a grid of cards
 * Each card shows the type name and its percentage of total issues
 *
 * @param data Array of objects containing type and percentage information
 */
interface TypeDistributionProps {
    data: Array<{ type: string; percentage: string; }>;
}

export function TypeDistribution({ data }: TypeDistributionProps) {
    return (
        <div className="mb-4">
            <h2 className="mb-2 text-xl font-bold">Issue Type Distribution</h2>
            <div className="grid grid-cols-4 gap-4">
                {/* Map each type to a card display */}
                {data.map(({ type, percentage }) => (
                    <div key={type} className="rounded bg-gray-100 p-4">
                        <div className="font-semibold">{type}</div>
                        <div className="text-2xl">{percentage}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

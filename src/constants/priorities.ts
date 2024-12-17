// Priority levels and their order (1 is highest, 4 is lowest)
// Used for sorting issues in the table
export const PRIORITY_ORDER = {
    urgent: 1,  // Most important
    high: 2,    // Very important
    normal: 3,  // Standard importance
    low: 4,    // Least important
} as const;

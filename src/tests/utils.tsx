import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient({});

export const wrapper = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

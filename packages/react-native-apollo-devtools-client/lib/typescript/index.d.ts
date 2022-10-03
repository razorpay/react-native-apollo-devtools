import type { ApolloClientType, Callback } from './typings';
export declare const apolloDevToolsInit: (client: ApolloClientType, { onConnect, }: {
    onConnect?: Callback | undefined;
}) => void;

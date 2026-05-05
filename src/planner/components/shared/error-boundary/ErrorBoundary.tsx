import { Component, type ErrorInfo, type ReactNode } from "react";

import { ErrorFallback } from "./ErrorFallback";

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: (params: { error: Error; reset: () => void }) => ReactNode;
    onError?: (error: Error, info: ErrorInfo) => void;
};

type ErrorBoundaryState = {
    error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("[ErrorBoundary]", error, info);
        this.props.onError?.(error, info);
    }

    private reset = () => {
        this.setState({ error: null });
    };

    render() {
        const { error } = this.state;
        if (!error) return this.props.children;

        if (this.props.fallback) {
            return this.props.fallback({ error, reset: this.reset });
        }
        return <ErrorFallback error={error} reset={this.reset} />;
    }
}

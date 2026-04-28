import { Component, type ErrorInfo, type ReactNode } from "react";

import { ErrorFallback } from "./ErrorFallback";

type ErrorBoundaryProps = {
    children: ReactNode;
    /**
     * Render prop opcional para personalizar la UI del fallback.
     * Recibe el error y una función `reset` que vuelve a intentar renderizar `children`.
     */
    fallback?: (params: { error: Error; reset: () => void }) => ReactNode;
    /** Hook opcional para reportar errores a un servicio externo. */
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
        // En dev queda visible en consola; en prod conviene enchufar un reporter.
        // eslint-disable-next-line no-console
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

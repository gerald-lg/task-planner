import { AlertTriangle } from "lucide-react";

type ErrorFallbackProps = {
    error: Error;
    reset: () => void;
};

const PLANNER_STORE_KEY = "planner-store";

const handleHardReset = () => {
    try {
        window.localStorage.removeItem(PLANNER_STORE_KEY);
    } catch {
        // localStorage puede fallar en modo privado / SSR; ignoramos.
    }
    window.location.reload();
};

const handleReload = () => {
    window.location.reload();
};

export const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
    const isDev = import.meta.env.DEV;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 border-b border-black/10 bg-rose-700/80 px-6 py-5">
                    <AlertTriangle
                        className="h-6 w-6 text-rose-100"
                        aria-hidden="true"
                    />
                    <h2 className="text-xl font-semibold text-white">
                        Ha ocurrido un error
                    </h2>
                </div>

                <div className="px-6 py-6 text-left">
                    <p className="text-sm text-slate-200">
                        Se produjo un error inesperado. Puede intentarlo nuevamente;
                        si el problema persiste, recargue la página o reinicie el
                        planificador.
                    </p>

                    {isDev && (
                        <pre className="mt-4 max-h-48 overflow-auto rounded-xl bg-black/40 p-3 text-xs text-rose-200">
                            {error.message}
                            {"\n"}
                            {error.stack}
                        </pre>
                    )}

                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <button
                            type="button"
                            onClick={reset}
                            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Reintentar
                        </button>
                        <button
                            type="button"
                            onClick={handleReload}
                            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Recargar
                        </button>
                        <button
                            type="button"
                            onClick={handleHardReset}
                            className="rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-rose-500"
                        >
                            Reiniciar planificador
                        </button>
                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                        Reiniciar el planificador eliminará los datos guardados
                        localmente en este dispositivo.
                    </p>
                </div>
            </div>
        </div>
    );
};

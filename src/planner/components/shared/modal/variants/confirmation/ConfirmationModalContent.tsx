import { useState, type ReactNode } from "react";
import { AlertTriangle, BadgeCheck, CircleAlert, OctagonX } from "lucide-react";

import { useConfirmationModal } from "@planner/components/shared/modal";
import type { ConfirmationModalVariant } from "./types";

const variantUi: Record<
	ConfirmationModalVariant,
	{
		icon: ReactNode;
		headerClass: string;
		primaryButtonClass: string;
	}
> = {
	warning: {
		icon: <AlertTriangle className="h-6 w-6 text-amber-200" aria-hidden="true" />,
		headerClass: "bg-amber-600/80",
		primaryButtonClass: "bg-amber-500 hover:bg-amber-400",
	},
	error: {
		icon: <OctagonX className="h-6 w-6 text-rose-200" aria-hidden="true" />,
		headerClass: "bg-rose-700/80",
		primaryButtonClass: "bg-rose-600 hover:bg-rose-500",
	},
	success: {
		icon: <BadgeCheck className="h-6 w-6 text-emerald-200" aria-hidden="true" />,
		headerClass: "bg-emerald-700/80",
		primaryButtonClass: "bg-emerald-600 hover:bg-emerald-500",
	},
	info: {
		icon: <CircleAlert className="h-6 w-6 text-sky-200" aria-hidden="true" />,
		headerClass: "bg-sky-700/80",
		primaryButtonClass: "bg-sky-600 hover:bg-sky-500",
	},
};

export const ConfirmationModalContent = () => {
	const { payload, close } = useConfirmationModal();
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (!payload || payload.kind !== "confirmation") {
		return null;
	}

	const ui = variantUi[payload.variant ?? "warning"];

	const handleConfirm = async () => {
		setIsSubmitting(true);

		try {
			await payload.onConfirm();
			close();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
			<div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl text-left">
				<div className={`border-b border-black/10 px-6 py-5 ${ui.headerClass}`}>
					<div className="flex items-center gap-3">
						{ui.icon}
						<h2 className="text-xl font-semibold text-white">{payload.title}</h2>
					</div>
				</div>

				<div className="px-6 py-6">
					<p className="text-sm text-slate-200">{payload.description}</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<button
							type="button"
							onClick={close}
							disabled={isSubmitting}
							className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-white/10 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
						>
							{payload.cancelLabel ?? "Cancel"}
						</button>

						<button
							type="button"
							onClick={handleConfirm}
							disabled={isSubmitting}
							className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${ui.primaryButtonClass}`}
						>
							{isSubmitting ? "Processing..." : (payload.confirmLabel ?? "Confirm")}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

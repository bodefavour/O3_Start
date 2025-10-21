import { type ReactNode } from "react";
import { Button } from "../../../components/ui/button";

interface SectionContainerProps {
    title: string;
    subtitle: string;
    actionLabel?: string;
    actionAriaLabel?: string;
    actions?: ReactNode;
    children: ReactNode;
}

export const SectionContainer = ({
    title,
    subtitle,
    actionLabel,
    actionAriaLabel,
    actions,
    children,
}: SectionContainerProps) => (
    <div className="rounded-3xl border border-[#d1d5db] bg-white shadow-sm">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-t-3xl bg-[#e6f9f2] px-8 py-6">
            <div>
                <h2 className="text-lg font-semibold text-[#0b1f3a]">{title}</h2>
                <p className="text-xs text-[#4b5563]">{subtitle}</p>
            </div>
            {actions ?? (
                actionLabel ? (
                    <Button
                        className="rounded-xl bg-[#00c48c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00b37d]"
                        aria-label={actionAriaLabel}
                    >
                        {actionLabel}
                    </Button>
                ) : null
            )}
        </header>
        <div className="px-8 py-8">{children}</div>
    </div>
);

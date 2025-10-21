import { SectionContainer } from "./SectionContainer";

export const PlaceholderSection = ({ label }: { label: string }) => (
    <SectionContainer
        title={`${label} Settings`}
        subtitle={`Configuration options for ${label.toLowerCase()} will appear here.`}
        actionLabel="Coming Soon"
        actionAriaLabel={`Coming soon for ${label}`}
    >
        <div className="rounded-2xl border border-dashed border-[#d1d5db] bg-[#f9fafb] p-10 text-center">
            <h3 className="text-lg font-semibold text-[#0b1f3a]">Section in progress</h3>
            <p className="mt-2 text-sm text-[#6b7280]">
                This area will be populated with {label.toLowerCase()} controls soon.
            </p>
        </div>
    </SectionContainer>
);

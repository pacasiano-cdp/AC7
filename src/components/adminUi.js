import React from "react";

export function AdminPageHeader({ eyebrow = "Admin", title, description, children }) {
  return (
    <div className="surface flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="text-2xl font-black text-[#232323]">{title}</h1>
        {description && <p className="mt-1 text-sm font-semibold text-[#697586]">{description}</p>}
      </div>
      {children && <div className="w-full lg:w-96">{children}</div>}
    </div>
  );
}

export function AdminSectionHeader({ title, count, noun = "item", children }) {
  return (
    <div className="surface flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
      <div>
        <span className="text-lg font-black text-[#232323]">{title}</span>
        {typeof count === "number" && (
          <div className="text-sm font-semibold text-[#697586]">
            {count} visible {noun}{count === 1 ? "" : "s"}
          </div>
        )}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function TableSkeleton({ columns = 5, rows = 6 }) {
  return (
    <div className="surface overflow-hidden p-4">
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {Array.from({ length: columns }).map((__, columnIndex) => (
              <div key={columnIndex} className="skeleton-line h-9 rounded-md" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

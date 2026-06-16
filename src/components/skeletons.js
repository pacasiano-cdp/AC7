import React from "react";

export function ProductCardSkeleton({ count = 4 }) {
  return (
    <div className="flex gap-4 overflow-hidden pb-4 pt-1">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-[27rem] w-72 shrink-0 rounded-lg border border-[#e6e0d8] bg-white p-4 shadow-sm">
          <div className="skeleton-line h-52 rounded-lg" />
          <div className="mt-4 skeleton-line h-6 w-24 rounded-md" />
          <div className="mt-3 skeleton-line h-6 w-4/5 rounded-md" />
          <div className="mt-3 skeleton-line h-4 w-full rounded-md" />
          <div className="mt-2 skeleton-line h-4 w-2/3 rounded-md" />
          <div className="mt-8 flex items-center justify-between">
            <div className="skeleton-line h-7 w-20 rounded-md" />
            <div className="skeleton-line h-10 w-20 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="surface grid overflow-hidden md:grid-cols-[0.95fr_1.05fr]">
      <div className="bg-[#f3ebe1] p-4 md:p-8">
        <div className="skeleton-line h-[28rem] w-full rounded-lg" />
      </div>
      <div className="p-6 md:p-10">
        <div className="skeleton-line h-4 w-28 rounded-md" />
        <div className="mt-4 skeleton-line h-10 w-3/4 rounded-md" />
        <div className="mt-3 skeleton-line h-10 w-1/2 rounded-md" />
        <div className="mt-8 space-y-3">
          <div className="skeleton-line h-4 w-full rounded-md" />
          <div className="skeleton-line h-4 w-11/12 rounded-md" />
          <div className="skeleton-line h-4 w-2/3 rounded-md" />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="skeleton-line h-12 w-28 rounded-md" />
          <div className="skeleton-line h-12 w-36 rounded-md" />
          <div className="skeleton-line h-12 w-36 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function CartSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="grid gap-4 border-b border-[#e6e0d8] py-5 last:border-b-0 md:grid-cols-[6rem_1fr_auto_auto] md:items-center">
          <div className="skeleton-line h-24 w-24 rounded-lg" />
          <div>
            <div className="skeleton-line h-6 w-56 rounded-md" />
            <div className="mt-3 skeleton-line h-4 w-24 rounded-md" />
          </div>
          <div className="skeleton-line h-11 w-32 rounded-lg" />
          <div className="skeleton-line h-8 w-24 rounded-md" />
        </div>
      ))}
    </div>
  );
}

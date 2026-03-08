'use client'; // ← This was missing. Required because dynamic + ssr:false is client-only
import dynamic from 'next/dynamic';

// Dynamically import MapView to avoid SSR issues with Mapbox
const MapView = dynamic(
  () => import('@/app/(dashboard)/map/map-view'),
  {
    ssr: false,
    loading: () => (
      // Shown while the map JS bundle is loading
      <div className="flex h-[350px] w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg
            className="h-6 w-6 animate-spin text-[#ff6600]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="text-sm font-medium">Loading map...</span>
        </div>
      </div>
    ),
  }
);

export default function DashboardMapPreview() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">

      {/* Map Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-[#ff6600]"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <h2 className="text-sm font-bold text-gray-700">
            Live Job & Worker Map
          </h2>
        </div>
        <a
          href="/map"
          className="rounded-md border border-[#ff6600] px-3 py-1 text-xs font-bold text-[#ff6600] transition-colors hover:bg-[#ff6600] hover:text-white"
        >
          Full Map →
        </a>
      </div>

      {/* Map — fixed height preview */}
      <div className="h-[350px] w-full">
        <MapView />
      </div>

    </div>
  );
}
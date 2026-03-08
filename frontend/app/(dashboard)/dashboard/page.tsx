// No auth check needed here — layout.tsx handles it for all dashboard pages
import DashboardStatsCards     from './components/DashboardStatsCards';
import DashboardMapPreview     from './components/DashboardMapPreview';
import DashboardRecentActivity from './components/DashboardRecentActivity';

export default function DashboardPage() {
  return (
    <>
      {/* Page Heading */}
      <div>
        <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* Stats Row */}
      <DashboardStatsCards />

      {/* Map Preview */}
      <DashboardMapPreview />

      {/* Recent Activity */}
      <DashboardRecentActivity />
    </>
  );
}
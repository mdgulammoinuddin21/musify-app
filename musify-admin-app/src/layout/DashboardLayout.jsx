import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="flex">

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block shrink-0">
          <Sidebar activeMenu={activeMenu} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-6">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;
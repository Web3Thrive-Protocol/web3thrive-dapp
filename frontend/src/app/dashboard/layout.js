export default function RoleLayout({ children, params }) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h2 className="text-xl font-bold capitalize">
              {params.role} Dashboard
            </h2>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    );
  }
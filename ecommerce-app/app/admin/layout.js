export default function AdminLayout({ children }) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen">

          {/* SIDEBAR */}
          <aside className="w-64 bg-black text-white p-5">
            <h2 className="text-xl font-bold mb-5">
              Admin Panel
            </h2>

            <nav className="space-y-3">
              <a href="/admin" className="block">Dashboard</a>
              <a href="/admin/users" className="block">Users</a>
              <a href="/admin/orders" className="block">Orders</a>
              <a href="/admin/products" className="block">Products</a>
            </nav>
          </aside>

          {/* CONTENT */}
          <main className="flex-1 bg-gray-100 p-6">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
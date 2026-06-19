import Navbar from "@/app/components/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Admin Panel
        </h1>

        {children}
      </div>
    </>
  );
}
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Login to PustakLink</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}

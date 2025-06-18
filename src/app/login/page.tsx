export default function Login() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#ff4500] to-[#ffffff]">
      <div className="absolute bottom-0 w-full h-1/3 bg-wave"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-10 border border-gray-200">
        <h2 className="text-3xl font-semibold mb-4 text-center flex items-center justify-center">
          <span className="text-[#ff8c00]">My Book</span>
          <span className="text-gray-600 ml-1">Shelf</span>
        </h2>
        <p className="text-gray-600 text-center mb-6 text-sm">Welcome back! Sign in to your Digital Library</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              defaultValue="username@college.ac.za"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
              defaultValue="********"
            />
          </div>
          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2 accent-orange-500" /> Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff8c00] text-white p-2 rounded hover:bg-[#ff751a] transition duration-200"
          >
            Login
          </button>
          <p className="text-center mt-4 text-gray-600 text-sm">
            New User? <a href="/register" className="text-blue-600 hover:underline">Register Here</a>
          </p>
        </form>
      </div>
    </div>
  );
}
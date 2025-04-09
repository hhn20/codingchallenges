export default function LoginSignup() {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/src/assets/background.png')] bg-cover bg-center text-white">
       
        <h1>PONG GAME</h1>

        <div className="p-8 rounded-xl shadow-xl w-full max-w-md">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-6 bg-gray-700 border border-gray-600 rounded"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-semibold">
            Submit
          </button>
        </div>

      </div>
    );
  }
  
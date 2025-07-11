import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
      <div className="bg-white rounded-3xl hover:shadow-2xl shadow-xl p-10 md:p-16 max-w-2xl w-[90%] flex flex-col  items-center text-center gap-6">
        <h1 className="text-5xl font-semibod text-gray-800">Second Brain 🧠</h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-md">
          Save your important <span className="font-medium text-blue-600">documents</span>,{" "}
          <span className="font-medium text-blue-600">links</span>,{" "}
          <span className="font-medium text-blue-600">tweets</span>, and{" "}
          <span className="font-medium text-blue-600">notes</span> in one intelligent space.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-4 w-full justify-center">
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium w-full md:w-auto"
          >
            Create an Account
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg text-lg font-medium w-full md:w-auto"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

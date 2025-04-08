const Loader = ({ text, submitted, setloaderState }) => {
  return (
    <div className="fixed inset-0 bg-pink-100/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white border border-pink-200 text-pink-800 p-6 rounded-2xl shadow-xl w-80 flex flex-col items-center space-y-4 font-serif text-center">
        <h1 className="text-lg font-semibold">{text}</h1>
        
        {!submitted && (
          <div className="w-8 h-8 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
        )}

        {submitted && (
          <button
            onClick={() => setloaderState(false)}
            className="mt-2 px-5 py-2 text-sm bg-pink-600 hover:bg-pink-500 text-white rounded-full transition duration-300"
          >
            Okay
          </button>
        )}
      </div>
    </div>
  );
};

export default Loader;

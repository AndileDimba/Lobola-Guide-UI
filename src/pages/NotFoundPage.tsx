import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 px-6">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🕵️‍♂️</span>
        </div>
        <h1 className="text-4xl font-black text-stone-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-stone-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-800 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

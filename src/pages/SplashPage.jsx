import { Link } from 'react-router-dom';

const SplashPage = () => (
  <div className="p-6 text-center">
    <h1 className="text-3xl font-bold mb-4">Welcome to the App!</h1>
    <p className="mb-4">Your splash/landing page.</p>
    <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Get Started</Link>
  </div>
);

export default SplashPage;

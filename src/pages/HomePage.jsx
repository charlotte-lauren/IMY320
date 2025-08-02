import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Home</h1>
    <p>Welcome! You are logged in.</p>
    <Link to="/about" className="text-blue-600 underline">Go to About</Link>
  </div>
);

export default HomePage;

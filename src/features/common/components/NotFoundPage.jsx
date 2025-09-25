import { Link } from 'react-router-dom';


const NotFoundPage = () => {
    return (
        <div className="select-none  h-screen flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mt-4">404 - Page Not Found</h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
            Sorry, the page you are looking for does not exist.
            </p>
            <Link to="/" className='bg-teal-700 w-50 mb-10 text-white px-4 py-2 rounded-2xl'>Go Back To Home Page</Link>
        </div>
    );
};

export default NotFoundPage;
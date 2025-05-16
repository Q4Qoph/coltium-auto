"use client"

import { useRouter } from 'next/navigation';

const NotFound = () => {
const router = useRouter()

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center"
      style={{
        backgroundImage:
          'url(/1.png)', // Replace with your own dark car-themed image
      }}
    >
      <div className="bg-black bg-opacity-70 p-10 rounded-xl text-center text-white max-w-lg">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-6">Page Not Found</p>
        <button
          onClick={() => router.push('/')}
          className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

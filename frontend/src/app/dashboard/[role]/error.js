'use client';

export default function Error({ error }) {
  return (
    <div className="p-4 bg-red-50 text-red-600">
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
    </div>
  );
}
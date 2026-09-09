export default function Button({ children, type = "button", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      {children}
    </button>
  );
}
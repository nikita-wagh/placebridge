import { useState } from "react";

export default function ProfileMenu({ setIsLoggedIn }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      
      {/* Profile Icon */}
      <img
        src="https://i.pravatar.cc/40"
        alt="profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
          <p className="px-2 py-1 font-semibold">Vaishnavi</p>

          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
            Dashboard
          </button>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="block w-full text-left px-2 py-1 text-red-500 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
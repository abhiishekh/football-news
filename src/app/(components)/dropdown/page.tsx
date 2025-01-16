'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import Link from 'next/link';

interface DropdownMenuProps {
  title: string;
  options: string[];
  linkPrefix: string;
  icon?: React.ReactNode; // Optional icon for the button
}

const DropdownMenu = ({ title, options, linkPrefix, icon }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the document
    setIsOpen(!isOpen);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full flex items-center gap-1 capitalize"
        onClick={toggleDropdown}
      >
        {icon && <span className="mr-2">{icon}</span>} {/* Optional icon */}
        {title} <FaCaretDown className="text-xs" />
      </button>
      {isOpen && (
        <div className="absolute z-10 left-0 mt-[2px] w-36 py-2 overflow-hidden bg-[#FFFFFFE0] border border-gray-300 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg">
          <ul>
            {options.map((option, index) => {
              const formattedOption = option.toLowerCase().replace(/\s+/g, '');
              return (
                <Link key={index} href={`${linkPrefix}/${formattedOption}`}>
                  <li className="px-4 pb-1 text-xs hover:bg-gray-200 text-black capitalize">
                    {option}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

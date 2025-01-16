import React from 'react';
import Link from 'next/link';

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
  active: boolean;
  icon?: React.ReactNode;
}

const NavButton = ({ href, children, active ,icon }: NavButtonProps) => {
  return (
    <Link href={href}>
      <li
        className={`list-none text-sm capitalize cursor-pointer ${active ? 'text-white' : ''}`}
      >
        <div className='flex gap-1 items-center'>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
        </div>
      </li>
    </Link>
  );
};

export default NavButton;

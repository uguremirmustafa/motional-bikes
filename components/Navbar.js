import Link from 'next/link';
import React from 'react';
import { ActiveLink } from './ActiveLink';

function Navbar() {
  const normalRoutes = [
    { route: '/', label: 'Home' },
    { route: '/stolen-bikes', label: 'Stolen Bikes' },
  ];

  const normalLinks = normalRoutes.map((i) => (
    <ActiveLink href={i.route} key={i.route}>
      <a className="nav-btn">{i.label}</a>
    </ActiveLink>
  ));
  return (
    <nav className="bg-white shadow-none hover:shadow-md transition h-16 font-bold fixed w-full flex z-10 px-4">
      <div className="w-full max-w-4xl mx-auto flex justify-between flex-row items-center">
        <Link href="/">
          <a className="text-black text-xl">Motional Bikes</a>
        </Link>
        <div className="flex">{normalLinks}</div>
      </div>
    </nav>
  );
}

export default Navbar;

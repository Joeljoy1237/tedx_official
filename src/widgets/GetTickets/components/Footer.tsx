import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-white px-[5vw] py-[4vh] border-t border-black-300">
      <div className="container mx-auto flex justify-between">
        <div className="flex space-x-4">
          <Link href="/privacy-policy">
            <span className="hover:underline text-xs">Privacy Policy</span>
          </Link>
          <Link href="/refund-policy">
            <span className="hover:underline text-xs">Refund Policy</span>
          </Link>
          <Link href="/terms-and-conditions">
            <span className="hover:underline text-xs">Terms and Conditions</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

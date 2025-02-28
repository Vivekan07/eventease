import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-purple-400">EventEase</h3>
            <p className="mt-4 text-gray-400">
              Your one-stop platform for finding and booking the best event services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/planner/services" className="text-gray-400 hover:text-purple-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/planner/about" className="text-gray-400 hover:text-purple-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/planner/contact" className="text-gray-400 hover:text-purple-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/planner/services?category=photography" className="text-gray-400 hover:text-purple-400">
                  Photography
                </Link>
              </li>
              <li>
                <Link href="/planner/services?category=catering" className="text-gray-400 hover:text-purple-400">
                  Catering
                </Link>
              </li>
              <li>
                <Link href="/planner/services?category=decoration" className="text-gray-400 hover:text-purple-400">
                  Decoration
                </Link>
              </li>
              <li>
                <Link href="/planner/services?category=entertainment" className="text-gray-400 hover:text-purple-400">
                  Entertainment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Event Street</li>
              <li>Valvetithurai, Sri Lanka</li>
              <li>Phone: +94 11 234 5678</li>
              <li>Email: info@EventEase.com</li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EventEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
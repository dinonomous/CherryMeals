// components/NavBar.tsx
'use client';

import UserControols from "../components/UserControols";
import Link from "next/link";
import Cartbutton from "@/components/Cartbutton";
import PartnerButton from "./PartnerButton";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { usePathname } from 'next/navigation';
import OrderButton from "./OrederBotton";

export default function NavBar() {
  const pathname = usePathname();

  const hideNavbarRoutes = ['/restaurantadmin/:id'];

  const isRestaurantAdminPage = pathname.startsWith('/restaurantadmin/');

  if (hideNavbarRoutes.includes(pathname) || isRestaurantAdminPage) {
    return null;
  }

  return (
    <nav className="max-w-[85rem] mx-1 px-4 py-4 flex flex-wrap basis-full items-center justify-between rounded-3xl shadow-lg fixed top-4 z-50 bg-whiteCustom dark:bg-zinc-700 sm:rounded-full left-0 right-0 sm:left-1 sm:right-1 w-auto sm:w-auto sm:mx-auto">
            <a
              className="sm:order-1 flex-none text-xl font-semibold dark:text-gray-50 text-red-900 focus:outline-none focus:opacity-80 ms-4"
              href="#"
            >
              Cherry Meals
            </a>
            <div className="sm:order-3 flex items-center gap-x-2">
              <button
                type="button"
                className="sm:hidden hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                id="hs-navbar-alignment-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-alignment"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-alignment"
              >
                <svg
                  className="hs-collapse-open:hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Toggle</span>
              </button>
              <UserControols />
            </div>
            <div
              id="hs-navbar-alignment"
              className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
              aria-labelledby="hs-navbar-alignment-collapse"
            >
              <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
                <PartnerButton />
                <Link
                  href="/"
                  className="font-medium text-black dark:text-whiteCustom focus:outline-none"
                  aria-current="page"
                >
                  Home
                </Link>
                <Cartbutton />
                <OrderButton />
                <a
                  className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                  href="#"
                >
                  Blog
                </a>
                <ThemeToggleButton />
              </div>
            </div>
          </nav>
  );
}

'use client';
import React, { useEffect, useState } from "react";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <aside
        className={`fixed top-0 inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out bg-white shadow-md w-64 z-30 md:relative md:translate-x-0`}
      >
        <div className="p-4 flex items-center">
          <img
            src="https://placehold.co/50x50"
            alt="Profile picture of Anny Glover"
            className="rounded-full w-12 h-12"
          />
          <div className="ml-4">
            <h2 className="text-lg font-bold">Anny Glover</h2>
            <p className="text-sm text-gray-500">Super Admin</p>
          </div>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="px-4 py-2 text-pink-600 bg-pink-100 rounded-md mb-2 flex items-center">
              <i className="fas fa-home mr-2"></i> Dashboard
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-hotel mr-2"></i> Hotels
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-exchange-alt mr-2"></i> Transaction
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-bed mr-2"></i> Room Book
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-couch mr-2"></i> Room Facilities
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-broom mr-2"></i> House keeping
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-taxi mr-2"></i> Cab Facility
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-box mr-2"></i> Items Manage
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-user-cog mr-2"></i> Personalised
            </li>
          </ul>
        </nav>
        <div className="mt-4">
          <h3 className="px-4 py-2 text-gray-500">REPORTS</h3>
          <ul>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-file-alt mr-2"></i> Booking Reports
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-file-alt mr-2"></i> Purchase Reports
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-file-alt mr-2"></i> Stock Reports
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="px-4 py-2 text-gray-500">ROOMS SETTINGS</h3>
          <ul>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-bed mr-2"></i> Bed List
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-list mr-2"></i> Booking Type List
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-percentage mr-2"></i> Booking Commission
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-gift mr-2"></i> Complementary List
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-layer-group mr-2"></i> Floor Plan List
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-list-alt mr-2"></i> Room List
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center">
              <i className="fas fa-image mr-2"></i> Room Images
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 p-6 ml-64 md:ml-0">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              className="md:hidden text-gray-600 mr-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
            <h1 className="text-2xl font-bold text-pink-600 mr-4">HotelAir</h1>
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex items-center">
            <i className="fas fa-bell text-gray-600 mr-4"></i>
            <i className="fas fa-cog text-gray-600 mr-4"></i>
            <img
              src="https://placehold.co/40x40"
              alt="Profile picture of Michelle"
              className="rounded-full w-10 h-10"
            />
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-gray-500">Today Booking</h2>
            <p className="text-2xl font-bold">1,587</p>
            <p className="text-sm text-blue-500">+11% From previous period</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-gray-500">Total Amount</h2>
            <p className="text-2xl font-bold">$2,258</p>
            <p className="text-sm text-blue-500">+0.5% New income</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-gray-500">Total Customer</h2>
            <p className="text-2xl font-bold">2.3k</p>
            <p className="text-sm text-yellow-500">+11% From previous period</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-gray-500">Total Revenue</h2>
            <p className="text-2xl font-bold">11,587</p>
            <p className="text-sm text-green-500">+21% From previous period</p>
          </div>
        </section>
        <section className="bg-white p-6 rounded-md shadow-md mb-6">
          <h2 className="text-lg font-bold mb-4">Reservations</h2>
          <img
            src="https://placehold.co/600x300"
            alt="Graph showing booking confirmed and booking pending trends"
          />
        </section>
        <section className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Today Booking List</h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <label>
                Show
                <select className="border rounded-md p-1 mx-2">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                entries
              </label>
            </div>
            <div>
              <label>
                Search:
                <input type="text" className="border rounded-md p-1 ml-2" />
              </label>
            </div>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">NAME</th>
                <th className="border-b p-2">ROOM TYPE</th>
                <th className="border-b p-2">CHECK IN</th>
                <th className="border-b p-2">CHECK OUT</th>
                <th className="border-b p-2">PAID AMOUNT</th>
                <th className="border-b p-2">DUE AMOUNT</th>
                <th className="border-b p-2">PAYMENT STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b p-2">Frank Baker</td>
                <td className="border-b p-2">Single</td>
                <td className="border-b p-2">12/03/2024</td>
                <td className="border-b p-2">13/03/2024</td>
                <td className="border-b p-2">0.00</td>
                <td className="border-b p-2">$230</td>
                <td className="border-b p-2">
                  <span className="bg-yellow-200 text-yellow-700 p-1 rounded">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border-b p-2">Phil Glover</td>
                <td className="border-b p-2">Studio</td>
                <td className="border-b p-2">12/03/2024</td>
                <td className="border-b p-2">21/03/2024</td>
                <td className="border-b p-2">$4450</td>
                <td className="border-b p-2">0.00</td>
                <td className="border-b p-2">
                  <span className="bg-yellow-200 text-yellow-700 p-1 rounded">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border-b p-2">Rya Randall</td>
                <td className="border-b p-2">Deluxe</td>
                <td className="border-b p-2">12/03/2024</td>
                <td className="border-b p-2">24/03/2024</td>
                <td className="border-b p-2">0.00</td>
                <td className="border-b p-2">$430</td>
                <td className="border-b p-2">
                  <span className="bg-yellow-200 text-yellow-700 p-1 rounded">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border-b p-2">Sally Graham</td>
                <td className="border-b p-2">Queen</td>
                <td className="border-b p-2">12/03/2024</td>
                <td className="border-b p-2">17/03/2024</td>
                <td className="border-b p-2">$1550</td>
                <td className="border-b p-2">0.00</td>
                <td className="border-b p-2">
                  <span className="bg-green-200 text-green-700 p-1 rounded">
                    Success
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border-b p-2">Victor Rampling</td>
                <td className="border-b p-2">Junior Suite</td>
                <td className="border-b p-2">12/03/2024</td>
                <td className="border-b p-2">15/03/2024</td>
                <td className="border-b p-2">0.00</td>
                <td className="border-b p-2">$530</td>
                <td className="border-b p-2">
                  <span className="bg-yellow-200 text-yellow-700 p-1 rounded">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <p>Showing 1 to 5 of 5 entries</p>
            <div className="flex items-center">
              <button className="border rounded-md px-3 py-1 mr-2">
                Previous
              </button>
              <button className="border rounded-md px-3 py-1 bg-purple-600 text-white">
                1
              </button>
              <button className="border rounded-md px-3 py-1 ml-2">Next</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
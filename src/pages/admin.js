import React, { useState } from "react";
import "../App.css";
import navlogo from "../imgs/navlogo.png";
import { faShoppingCart, faUsers, faInbox, faTruck, faIndustry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Inventory from "../components/inventory";
import Orders from "../components/orders";
import Users from "../components/users";
import Shipping from "../components/shipping";
import InventoryIn from "../components/InventoryIn";
import AddItem from "../components/addItem";
import InventoryOut from "../components/inventoryOut";
import InventoryInTransactions from "../components/inventoryInTransactions";
import InventoryOutTransactions from "../components/inventoryOutTransactions";
import AddEmployee from "../components/addEmp";
import ViewSuppliers from "../components/supplier";
import AddSupplier from "../components/supplierAdd";
import Returned from "../components/ordersReturns";
import { myContext } from "../context/adminContext";
import { Link } from "react-router-dom";

export default function Admin() {
  const [page, setPage] = useState("orders");

  function removeCookie() {
    document.cookie = "account_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setTimeout(() => {
      window.location.reload();
    }, 0);
  }

  const inventory = ["inventory", "addItem", "inventoryIn", "inventoryOut", "inventoryTransactions"];
  const isInInventory = inventory.some((item) => page.includes(item));

  return (
    <div className="admin-page">
      <div className="flex min-h-screen">
        <aside id="sideBar" className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-y-auto bg-[#232323] text-white shadow-2xl">
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              <img src={navlogo} alt="AC7 Logo" className="h-12 w-12 rounded-md object-cover" />
              <div>
                <div className="text-lg font-black">AC7 Admin</div>
                <div className="text-xs font-semibold text-white/55">Operations desk</div>
              </div>
            </div>
          </div>

          <nav className="flex flex-1 flex-col justify-between p-4">
            <div className="space-y-1">
              <NavButton id="orders" active={page === "orders" || page === "returned"} icon={faShoppingCart} label="Orders" onClick={() => setPage("orders")} />
              <NavButton id="accounts" active={page === "users" || page === "addEmployee"} icon={faUsers} label="Accounts" onClick={() => setPage("users")} />
              <NavButton id="inventory" active={isInInventory} icon={faInbox} label="Inventory" onClick={() => setPage("inventory")} />
              <NavButton id="shipping" active={page === "shipping"} icon={faTruck} label="Shipping" onClick={() => setPage("shipping")} />
              <NavButton id="suppliers" active={page === "viewSuppliers" || page === "addSupplier"} icon={faIndustry} label="Suppliers" onClick={() => setPage("viewSuppliers")} />
            </div>

            <Link
              to="/"
              onClick={removeCookie}
              className="rounded-md border border-white/10 px-4 py-3 text-sm font-black text-white/80 transition hover:bg-white hover:text-[#232323]"
            >
              Sign out
            </Link>
          </nav>
        </aside>

        <main id="body" className="admin-content ml-64 min-h-screen w-[calc(100%-16rem)]">
          <myContext.Provider value={{ page, setPage }}>
            {(() => {
              switch (page) {
                case "inventory":
                  return <Inventory />;
                case "orders":
                  return <Orders />;
                case "users":
                  return <Users />;
                case "shipping":
                  return <Shipping />;
                case "inventoryIn":
                  return <InventoryIn />;
                case "inventoryOut":
                  return <InventoryOut />;
                case "addItem":
                  return <AddItem />;
                case "inventoryInTransactions":
                  return <InventoryInTransactions />;
                case "inventoryOutTransactions":
                  return <InventoryOutTransactions />;
                case "addEmployee":
                  return <AddEmployee />;
                case "viewSuppliers":
                  return <ViewSuppliers />;
                case "addSupplier":
                  return <AddSupplier />;
                case "returned":
                  return <Returned />;
                default:
                  return <Inventory />;
              }
            })()}
          </myContext.Provider>
        </main>
      </div>
    </div>
  );
}

function NavButton({ id, active, icon, label, onClick }) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-black transition ${
        active ? "bg-white text-[#232323]" : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="w-5" />
      {label}
    </button>
  );
}

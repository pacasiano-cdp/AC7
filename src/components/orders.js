import React, { useState, useEffect, useContext } from 'react';
import "../App.css";
import Order from './ordersExpand';
import Select from "react-select";
import Check from "../imgs/check.png";
import { myContext } from '../context/adminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { parse, isValid, isToday, isWithinInterval, subWeeks } from 'date-fns';
import { AdminPageHeader, AdminSectionHeader, TableSkeleton } from "./adminUi";


export default function Orders() {

    // const today = new Date().toLocaleDateString();

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reloadData, setReloadData] = useState(false);
    const [shipped, setShipped] = useState(false);
    const [returned, setReturned] = useState(false);
    const [packed, setPacked] = useState(false);
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(true);
    const [shippedSucces, setShippedSucces] = useState(false);
    const [selectedOrderToBeShipped, setSelectedOrderToBeShipped] = useState(null);
    const { setPage } = useContext(myContext); 

    useEffect(() => {
        fetch('/api/orders')
            .then((res) => res.json())
            .then((orders) => {
                setOrders(orders);
            })
            .finally(() => setLoading(false));
    }, [reloadData]);

    useEffect(() => {
        // Assuming orders is a state variable or a prop
        const newOptions = [
          { value: 'All', label: 'All' },
          ...orders.map((order) => ({
            value: order.sale_id,
            label: `${order.sale_id} - ${order.full_name} - ${order.sale_date}`,
          })),
        ];
    
        // Set the options in the component state
        setOptions(newOptions);
      }, [orders]);

    // Filter products based on the selected value
    // Filter users based on the selected value
    const filteredOrders = selectedOrder
    ? selectedOrder.value === 'All'
        ? orders
        : orders.filter((order) => order.sale_id === selectedOrder.value)
    : orders;

    console.log(orders)

    return(<>
        <ShippedForm isModalOpen={shipped} setIsModalOpen={setShipped} setShippedSucces={setShippedSucces} selectedOrderToBeShipped={selectedOrderToBeShipped} setReloadData={setReloadData} reloadData={reloadData} />
        <Shipped isModalOpen={shippedSucces} setModalOpen={setShippedSucces} />
        <Returned isModalOpen={returned} setModalOpen={setReturned} />
        <Packed isModalOpen={packed} setModalOpen={setPacked} />
        <div className="min-h-screen">
            <div className="flex flex-col gap-6">
                <AdminPageHeader title="Orders" description="Review order volume, revenue, fulfillment status, and return requests.">
                    <Select
                        options={options}
                        className="text-sm"
                        placeholder="Filter by order"
                        onChange={(selectedOption) => setSelectedOrder(selectedOption)}
                    />
                </AdminPageHeader>
                <div className="grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  <DailySales orders={orders} />
                  <DailyRevenue orders={orders} />
                  <WeeklySales orders={orders} />
                  <WeeklyRevenue orders={orders} />
                </div>
                <div className="flex flex-col gap-3">
                    <AdminSectionHeader title="Order List" count={filteredOrders.length} noun="order">
                        <button onClick={() => setPage("returned")} className="btn-secondary min-h-0 px-4 py-2 text-sm">Return Requests</button>
                    </AdminSectionHeader>
                    {loading ? <TableSkeleton columns={7} /> : (
                    <div className="overflow-auto pb-10">
                        <table className="w-full border-collapse table-auto border">
                            <thead>
                                <tr className="bg-gray-400 border">
                                    <th className="sticky bg-gray-400 text-sm font-semibold border p-2 text-white">Order ID</th>
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">User ID</th>
                                    {/* <th className="text-sm font-semibold border p-2 text-white">Product ID</th> */}
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">Full Name</th>
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">Date</th>
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">Status</th>
                                    {/* <th className="text-sm font-semibold border p-2 text-white">Quantity</th> */}
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">Total</th>
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">Actions</th>
                                </tr>
                            </thead>
                            {filteredOrders.map((order) => (
                            <Order key={order.sale_id} order={order} setReloadData={setReloadData} setShipped={setShipped} setPacked={setPacked} reloadData={reloadData} setSelectedOrderToBeShipped={setSelectedOrderToBeShipped} />
                            ))}
                        </table>
                    </div>
                    )}
                </div>
            </div>   
        </div>
        </>
    );
};

const Modal = ({ isOpen, children }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          {children}
        </div>
      </div>
    );
  };
  
  function ShippedForm({isModalOpen, setIsModalOpen, setShippedSucces, selectedOrderToBeShipped, setReloadData, reloadData}) {
      
    const [trackNums, setTrackNums] = useState([]);
    const [taken, setTaken] = useState(false);
  
    const [shippedForm, setShippedForm] = useState({
      tracknum: "",
      courier: "",
      payment: "",
    });

    const handleChange = (e) => {
      setShippedForm({
        ...shippedForm,
        [e.target.name]: e.target.value,
      });
    }

    const {sale_id} = selectedOrderToBeShipped || {};

    //Get cookie
    const accountId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("account_id="))
    ?.split("=")[1];

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(selectedOrderToBeShipped)
        // console.log(shippedForm);

        fetch(`/api/shipment/${sale_id}`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({...shippedForm, account_id: accountId})
        })

        setIsModalOpen(false);
        setShippedSucces(true);
        setReloadData(!reloadData);
    }

    useEffect(() => {
      fetch('/api/shipment')
          .then((res) => res.json())
          .then((orders) => {
              setTrackNums(orders);
          });
    },[]);

    // useEffect that checks if the tracking number is already taken
    
    useEffect(() => {
      const trackNumsArr = [];
      for(let i = 0; i < trackNums.length; i++){
        trackNumsArr.push(trackNums[i].tracking_number);
      }
      if (trackNumsArr.includes(shippedForm.tracknum)) {
        setTaken(true);
      }else{;
        setTaken(false);
      }
    }, [shippedForm.tracking_number, shippedForm.tracknum, trackNums]);
  
    return (
      <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl -ml-56 z-50">
        <Modal isOpen={isModalOpen}>
          <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
            <form onSubmit={handleSubmit} className="fixed bg-gray-100 pb-3 rounded-xl w-[40rem]">
                <div className="flex flex-col gap-5 text-center py-5 px-10">
                  <div className="text-2xl font-bold">
                    Product Shipment Form
                  </div>
                  <div className="flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Tracking number
                      </div>
                      <div className="flex flex-col">
                        <input name="tracknum" onChange={handleChange} className="w-full border-2 border-black/60 rounded-md p-2" required/>
                        {taken && <span className="fixed translate-y-11 text-red-500 text-sm">Tracking number is already taken</span>  }
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Courier
                      </div>
                      <div>
                        <input name="courier" onChange={handleChange} className="w-full border-2 border-black/60 rounded-md p-2 resize-none" required/>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Payment
                      </div>
                      <div>
                        <input name="payment" onChange={handleChange} className="w-full border-2 border-black/60 rounded-md p-2 resize-none" required/>
                      </div>
                    </div>

                    <div className="flex flex-row gap-1">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-black/80 hover:bg-black text-gray-50 p-2 rounded-md w-1/2 font-medium">Cancel</button>
                    <button type="submit" className="bg-green-900/80 hover:bg-green-900 text-gray-50 p-2 rounded-md w-full font-medium">Submit</button>
                    </div>
                  </div>
                </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  };

  function Shipped({isModalOpen, setModalOpen}) {
  
    return (
      <div className="fixed backdrop-blur-sm bg-black/20 -translate-x-56 drop-shadow-xl z-50">
          <Modal isOpen={isModalOpen}>
            <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
                <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                    <div className="p-5 flex flex-col justify-center items-center gap-5">
                        <img src={Check} alt="check" className="w-32 h-32"/>
                        <span className="text-xl font-bold">Order status changed to Shipped!</span>
                        <button onClick={() => setModalOpen(false)} className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</button>
                    </div>
                </div>
            </div>
          </Modal>
        </div>
    );
  };
  
  function Returned({isModalOpen, setModalOpen}) {
  
    return (
      <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl -translate-x-56 z-50">
          <Modal isOpen={isModalOpen}>
            <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
                <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                    <div className="p-5 flex flex-col justify-center items-center gap-5">
                        <img src={Check} alt="check" className="w-32 h-32"/>
                        <span className="text-xl font-bold">Order Status changed to Returned!</span>
                        <button onClick={() => setModalOpen(false)} className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</button>
                    </div>
                </div>
            </div>
          </Modal>
        </div>
    );
  };

  function Packed({isModalOpen, setModalOpen}) {
  
    return (
      <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl -translate-x-56 z-50">
          <Modal isOpen={isModalOpen}>
            <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
                <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                    <div className="p-5 flex flex-col justify-center items-center gap-5">
                        <img src={Check} alt="check" className="w-32 h-32"/>
                        <span className="text-xl font-bold">Order Status changed to Packed!</span>
                        <button onClick={() => setModalOpen(false)} className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</button>
                    </div>
                </div>
            </div>
          </Modal>
        </div>
    );
  };

const parseOrderDate = (saleDate) => {
  if (!saleDate) return null;

  const parsedDate = parse(saleDate, "MMMM dd, yyyy - hh:mm:ss a", new Date());
  return isValid(parsedDate) ? parsedDate : null;
};

const getOrderRevenue = (order) => Number.parseFloat(order.price) || 0;

const getTodayOrders = (orders) => (
  orders.filter((order) => {
    const parsedDate = parseOrderDate(order.sale_date);
    return parsedDate && isToday(parsedDate);
  })
);

const getWeeklyOrders = (orders) => {
  const now = new Date();

  return orders.filter((order) => {
    const parsedDate = parseOrderDate(order.sale_date);
    return parsedDate && isWithinInterval(parsedDate, {
      start: subWeeks(now, 1),
      end: now,
    });
  });
};

const formatCurrency = (value) => (
  value.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
);

function DailySales({orders}) {
  const dailySales = getTodayOrders(orders).length;

  return(
  <div className="metric-card flex min-h-36 w-full flex-col justify-between gap-5 rounded-lg p-6 text-[#232323]">
    
    <div className="flex flex-row justify-between">
        <span className="text-base font-black">Daily Sales</span>
      <div className="text-[#768f78]">
        <FontAwesomeIcon icon={faCartShopping} size="2x" />
      </div>
    </div>

    <div className="flex flex-row justify-between items-center w-full" >
      
      <div>
        <span className="text-3xl font-black">{dailySales}</span>
      </div>
    </div>

  </div>
  );
}

function WeeklySales({orders}) {
  const weeklySales = getWeeklyOrders(orders).length;

  return(
  <div className="metric-card flex min-h-36 w-full flex-col justify-between gap-5 rounded-lg p-6 text-[#232323]">
    
    <div className="flex flex-row justify-between">
      <span className="text-base font-black">Weekly Sales</span>
      <div className="text-[#768f78]">
        <FontAwesomeIcon icon={faCartShopping} size="2x" />
      </div>
    </div>

    <div className="flex flex-row justify-between items-center w-full" >
      
      <div>
        <span className="text-3xl font-black">{weeklySales}</span>
      </div>
    </div>

  </div>
  );
}

function DailyRevenue({orders}) {
  const totalSalesPrice = getTodayOrders(orders).reduce((total, order) => total + getOrderRevenue(order), 0);
  

  return(
  <div className="metric-card metric-card-revenue flex min-h-36 w-full flex-col justify-between gap-5 rounded-lg p-6 text-[#232323]">
    
    <div className="flex flex-row justify-between">
      <span className="text-base font-black">Daily Revenue</span>
      <div className="-mt-2 text-3xl font-black text-[#b85c6b]">&#8369;</div>
    </div>

    <div className="flex flex-row justify-between items-center w-full" >
      
      <div>
        <span className="text-3xl font-black">&#8369; {formatCurrency(totalSalesPrice)}</span>
      </div>
    </div>

  </div>
  );
}

function WeeklyRevenue({orders}) {
  const totalWeeklyRevenue = getWeeklyOrders(orders).reduce((total, order) => total + getOrderRevenue(order), 0);

  return(
  <div className="metric-card metric-card-revenue flex min-h-36 w-full flex-col justify-between gap-5 rounded-lg p-6 text-[#232323]">
    
    <div className="flex flex-row justify-between">
      <span className="text-base font-black">Weekly Revenue</span>
      <div className="-mt-2 text-3xl font-black text-[#b85c6b]">&#8369;</div>
    </div>

    <div className="flex flex-row justify-between items-center w-full" >
      
      <div>
        <span className="text-3xl font-black">&#8369; {formatCurrency(totalWeeklyRevenue)}</span>
      </div>
    </div>

  </div>
  );
}

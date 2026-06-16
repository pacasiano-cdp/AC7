import React, { useEffect, useState} from "react";
import "../App.css";
import Select from "react-select";
import { AdminPageHeader, AdminSectionHeader, TableSkeleton } from "./adminUi";

export default function Shipping() {

    const [shipped, setShipped] = useState([]);
    const [selectedShipped, setSelectedShipped] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/shipment/shipped/items')  // Ensure the leading slash for an absolute path
            .then(res => res.json())
            .then(shipped => {
                setShipped(shipped);
            })
            .catch(error => console.error('Error fetching shipped data:', error))
            .finally(() => setLoading(false));
    }, []);
    console.log(shipped);


    const options = [
    { value: 'All', label: 'All' },
    // sets the options to the suppliers
    ...shipped.map((shipped) => ({
        value: shipped.shipped_sale_id,
        label: shipped.tracking_number + " - " + shipped.courier + " - " + shipped.payment + " - " + shipped.sale_id + " - " + shipped.address_id + " - " + shipped.employee_id,
        })),
    ];

    const filteredShipped = selectedShipped
    ? selectedShipped.value === 'All'
        ? shipped
        : shipped.filter((shipped) => shipped.shipped_sale_id === selectedShipped.value)
    : shipped;


    return(
        <div className="min-h-screen">
            <div className="flex flex-col gap-6">
                <AdminPageHeader title="Shipments" description="Track shipped orders, couriers, and delivery references.">
                    <Select options={options} onChange={(selectedOption) => setSelectedShipped(selectedOption)} className="text-sm" placeholder="Filter shipments" />
                </AdminPageHeader>
                <div className="flex flex-col gap-3">
                    <AdminSectionHeader title="Delivery List" count={filteredShipped.length} noun="shipment" />
                    {loading ? <TableSkeleton columns={7} /> : (
                    <div className="max-h-[560px] overflow-auto">
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-400">
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Shipment ID</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Purchase ID</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Address</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Employee ID</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Tracking Number</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Courier</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Date</th>
                                    {/* <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredShipped.map((shipped) => (
                                <tr className="bg-gray-300">
                                    <td className="text-sm font-semibold border p-2">{shipped.shipped_sale_id}</td>
                                    <td className="text-sm font-semibold border p-2">{shipped.sale_id}</td>
                                    <td className="text-sm font-semibold border p-2">{shipped.employee_id}</td>
                                    <td className="text-sm font-semibold border p-2">{shipped.address_id}</td>
                                    <td className="text-sm font-semibold border p-2">{shipped.tracking_number}</td>
                                    <td className="text-sm font-semibold border p-2">{shipped.courier}</td>
                                    <td className="text-sm font-semibold border p-2">{shipped.date}</td>
                                    {/* <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                    <button className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                    </td> */}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )}
                </div>
            </div>   
        </div>
    );
};

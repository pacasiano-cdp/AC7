import React, { useState, useEffect, useContext } from 'react';
import "../App.css";
import Select from "react-select";
import { myContext } from "../context/adminContext";
import { AdminPageHeader, AdminSectionHeader, TableSkeleton } from "./adminUi";

export default function Users() {

    const[account, setAccount]= useState("customer");
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const { setPage } = useContext(myContext);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingEmployees, setLoadingEmployees] = useState(true);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/customer')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            })
            .finally(() => setLoadingUsers(false));
    }, []);

    // Generate options based on products
    const options = [
        { value: 'All', label: 'All' },
        ...users.map((user) => ({
        value: user.account_id,
        label: user.first_name+" "+user.last_name,
        })),
    ];

    // Filter users based on the selected value
    const filteredUsers = selectedUser
    ? selectedUser.value === 'All'
        ? users
        : users.filter((user) => user.account_id === selectedUser.value)
    : users;

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch('/api/employee')
            .then((res) => res.json())
            .then((data) => {
                setEmployees(data);
            })
            .finally(() => setLoadingEmployees(false));
    }, []);

    const options2 = [
        { value: 'All', label: 'All' },
        ...employees.map((employee) => ({
        value: employee.employee_id,
        label: employee.first_name+" "+employee.last_name,
        })),
    ];

    // Filter users based on the selected value
    const filteredEmployees = selectedEmployee
    ? selectedEmployee.value === 'All'
        ? employees
        : employees.filter((employee) => employee.employee_id === selectedEmployee.value)
    : employees;


    return(
        <div className="min-h-screen">
            <div className="flex flex-col gap-6">
                <AdminPageHeader title="Accounts" description="Browse customer and employee account records.">
                    {account === "customer" ?
                    <Select options={options} className="text-sm" placeholder="Filter customers" onChange={(e) => setSelectedUser(e)} isSearchable={true} />
                    :
                    <Select options={options2} className="text-sm" placeholder="Filter employees" onChange={(e) => setSelectedEmployee(e)} isSearchable={true}/>
                    }   
                </AdminPageHeader>
                <div className="flex flex-col gap-3">
                    <AdminSectionHeader title={account==="customer" ? "User List" : "Employee List"} count={account==="customer" ? filteredUsers.length : filteredEmployees.length} noun="account">
                            {account==="customer" ? (
                            <button onClick={()=> setAccount("employee")} className="btn-secondary min-h-0 px-4 py-2 text-sm">Employee Accounts</button>
                            ) : (<>
                            <button onClick={()=> setAccount("customer")} className="btn-secondary min-h-0 px-4 py-2 text-sm">Customer Accounts</button>  
                            <button onClick={()=> setPage("addEmployee")} className="btn-primary min-h-0 px-4 py-2 text-sm">Add Employee</button>
                            </>)}
                    </AdminSectionHeader>
                    {account==="customer" ? (
                    loadingUsers ? <TableSkeleton columns={6} /> : (
                    <div className="max-h-[560px] overflow-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Account ID</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">First Name</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Last Name</th>
                                {/* <th className="text-sm font-semibold border p-2 text-white">Address</th> */}
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Contact</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Email</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Reputation</th>
                                {/* <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredUsers.map((user) => (
                                    <tr className="bg-gray-300" key={user.account_id}>
                                        <td className="text-sm font-semibold border p-2">{user.account_id}</td>
                                        <td className="text-sm font-semibold border p-2">{user.first_name}</td>
                                        <td className="text-sm font-semibold border p-2">{user.last_name}</td>
                                        <td className="text-sm font-semibold border p-2">{user.contact_info}</td>
                                        <td className="text-sm font-semibold border p-2">{user.email}</td>
                                        <td className="text-sm font-semibold border p-2">{user.reputation}</td>
                                        {/* <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                        <button className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                         </td> */}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
                    )
                    ) : (
                    loadingEmployees ? <TableSkeleton columns={6} /> : (
                    <div className="max-h-[560px] overflow-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Employee ID</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">First Name</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Last Name</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Position</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Emp_Status</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Contact Info</th>
                                {/* <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr className="bg-gray-300">
                                    <td className="text-sm font-semibold border p-2">{employee.employee_id}</td>
                                    <td className="text-sm font-semibold border p-2">{employee.first_name}</td>
                                    <td className="text-sm font-semibold border p-2">{employee.last_name}</td>
                                    <td className="text-sm font-semibold border p-2">{employee.position}</td>
                                    <td className="text-sm font-semibold border p-2">{employee.emp_status}</td>
                                    <td className="text-sm font-semibold border p-2">{employee.contact_info}</td>
                                    {/* <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                    <button className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    )
                    )}
                </div>
            </div> 
        </div>
        
    );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteEmployeeById, getEmployees } from '../service/EmployeeService';
import { toast } from 'react-toastify';

const Employee = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteEmployee = (e, id) => {
        e.preventDefault();
        deleteEmployeeById(id)
            .then(() => {
                if (employees) {
                    toast.success("Employee Deleted Successfully");
                    setEmployees((prevElement) => prevElement.filter((employee) => employee.id !== id));
                }
            })
            .catch((error) => {
                toast.error("Error deleting employee");
                console.error(error);
            });
    };

    const profile = (e, id) => {
        e.preventDefault();
        navigate(`/profile/${id}`);
    };

    const editEmployee = (e, id) => {
        e.preventDefault();
        navigate(`/addEmployee/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getEmployees();
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="mx-40">
            <div className='button'>
                <button
                    onClick={() => navigate("/addEmployee")}
                    className='bg-slate-600 hover:bg-blue-700 my-8 px-14 py-2 text-white font-bold'>
                    Add Employee
                </button>
            </div>

            <div className="relative flex flex-col w-full max-w-4xl text-gray-700 bg-white shadow-md bg-clip-border rounded-sm mx-auto">
                <table className="w-full text-left table-auto min-w-max">
                    <thead className='bg-slate-800 text-white font-bold text-lg'>
                        <tr>
                            <th className="p-4 border-b">Name</th>
                            <th className="p-4 border-b">Phone</th>
                            <th className="p-4 border-b">Email</th>
                            <th className="p-4 border-b">Action</th>
                        </tr>
                    </thead>

                    {!loading && employees?.length > 0 ? (
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id} className="hover:bg-slate-500 hover:text-white">
                                    <td className="p-4">
                                        <button
                                            onClick={(e) => profile(e, employee.id)}
                                            className="text-blue-600 hover:underline">
                                            {employee.name}
                                        </button>
                                    </td>
                                    <td className="p-4">{employee.phone}</td>
                                    <td className="p-4">{employee.email}</td>
                                    <td className="p-4 flex gap-4">
                                        <button
                                            onClick={(e) => editEmployee(e, employee.id)}
                                            className="text-blue-500 hover:text-blue-700">
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => deleteEmployee(e, employee.id)}
                                            className="text-red-500 hover:text-red-700">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">
                                    {loading ? "Loading..." : "No employees found"}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default Employee;

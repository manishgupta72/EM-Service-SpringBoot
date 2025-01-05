import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveEmployeeData, getEmployeeById, updateEmployeeById } from '../service/EmployeeService.jsx';
import { toast } from 'react-toastify';

const AddEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isUpdateMode = Boolean(id);

    const [employee, setEmployee] = useState({
        id: id || "",
        name: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        if (isUpdateMode) {
            const fetchData = async () => {
                try {
                    const response = await getEmployeeById(id);
                    setEmployee(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [id, isUpdateMode]);

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({ ...employee, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdateMode) {
            updateEmployeeById(employee, id)
                .then((response) => {
                    toast.success("Employee Updated Successfully");
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            saveEmployeeData(employee)
                .then((response) => {
                    toast.success("Employee Added Successfully");
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const resetData = () => {
        setEmployee({
            name: "",
            phone: "",
            email: ""
        });
    };

    return (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center min-h-screen">
            <div className="max-w-xl bg-white shadow-lg rounded-lg py-8 px-10">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        {isUpdateMode ? "👤 Update Employee" : "👤 Add New Employee"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {isUpdateMode ? "Update the details of the existing employee" : "Fill in the details to add a new employee"}
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full py-3 px-4 text-gray-700 bg-gray-100 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="phone"
                                value={employee.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full py-3 px-4 text-gray-700 bg-gray-100 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full py-3 px-4 text-gray-700 bg-gray-100 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-8 space-x-4">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                        >
                            {isUpdateMode ? "Update" : "Save"}
                        </button>
                        <button
                            type="reset"
                            onClick={resetData}
                            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;

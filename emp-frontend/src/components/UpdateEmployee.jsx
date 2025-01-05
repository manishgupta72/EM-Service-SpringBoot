import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, saveEmployeeData, updateEmployeeById } from '../service/EmployeeService.jsx'
import { toast } from 'react-toastify';
const UpdateEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        id: id,
        name: "",
        phone: "",
        email: ""
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({ ...employee, [e.target.name]: value })
    }

    const updateEmployee = (e, id, employee) => {
        e.preventDefault();
        updateEmployeeById(employee, id)
            .then((response) => {
                console.log(response);
                toast.success("Employee Updated Successfully");
                navigate("/")

            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await getEmployeeById(id);
                setEmployee(response.data);

            } catch (error) {
                console.log(error);

            }

        }
        fetchData();
    }, [])

    return (
        <div class="bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center min-h-screen">
            <div class="max-w-xl bg-white shadow-lg rounded-lg py-8 px-10">
                <div class="text-center mb-6">
                    <h1 class="text-3xl font-extrabold text-gray-800">👤 Update Employee</h1>
                    <p class="text-gray-500 mt-2">update the details to update a existing employee</p>
                </div>
                <form>
                    <div class="space-y-6">
                        {/* <!-- Name Field --> */}
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={employee.name}
                                onChange={(e) => handleChange(e)}
                                placeholder="Name"
                                class="w-full py-3 px-4 text-gray-700 bg-gray-100 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        {/* <!-- Phone Field --> */}
                        <div>
                            <input
                                type="number"
                                name='phone'
                                value={employee.phone}
                                onChange={(e) => handleChange(e)}
                                placeholder="Phone"
                                class="w-full py-3 px-4 text-gray-700 bg-gray-100 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        {/* <!-- Email Field --> */}
                        <div>
                            <input
                                type="email"
                                name='email'
                                value={employee.email}
                                onChange={(e) => handleChange(e)}
                                placeholder="Email"
                                class="w-full py-3 px-4 text-gray-700 bg-gray-100 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div class="flex justify-center mt-8 space-x-4">
                        {/* <!-- Save Button --> */}
                        <button
                            type="submit"
                            onClick={(e) => updateEmployee(e, employee.id, employee)}
                            class="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                        >
                            Update
                        </button>

                        {/* <!-- Cancel Button --> */}
                        <button
                            type="button"
                            class="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateEmployee
import React from "react";
import { firebase } from "../firebase";
import { nanoid, customAlphabet } from "nanoid";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';

const Form = () => {

    const IMAGE_BASE_URL = "https://picsum.photos/400/300?image=";

    const generateNumber = customAlphabet('123456789', 3);

    const [user, setUser] = React.useState({
        id: "",
        avatar: "",
        firstname: "",
        lastname: "",
        email: "",
        country: "",
        city: ""
    });
    const countries = ["Colombia", "Argentina", "Brazil", "Canada", "United States", "Mexico"];
    const [users, setUsers] = React.useState([]);
    const [editMode, setEditMode] = React.useState(false);

    const handlePropValue = (e, prop) => {
        setUser({
            ...user,
            [prop]: e.target.value
        })
    };


    React.useEffect(() => {
        const getUsers = async () => {
            try {
                const db = firebase.firestore();
                const data = await db.collection("users").get();
                const users = data.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });

                setUsers(users);
            } catch (error) {
                console.error(error);
            }
        };

        getUsers();
    })

    const validateFields = () => {
        if (user.firstname.trim() === "") {
            alertify.error("Firstname is required");
            return false;
        }

        if (user.lastname.trim() === "") {
            alertify.error("Lastname is required");
            return false;
        }

        if (user.email.trim() === "") {
            alertify.error("Email is required");
            return false;
        }

        if (user.country.trim() === "") {
            alertify.error("Country is required");
            return false;
        }

        if (user.city.trim() === "") {
            alertify.error("City is required");
            return false;
        }

        return true;
    };

    const cleanInputs = () => {
        setUser({
            id: "",
            avatar: "",
            firstname: "",
            lastname: "",
            email: "",
            country: "",
            city: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            firstname,
            lastname,
            email,
            country,
            city            
        } = user;

        if (!validateFields()) {
            return;
        }

        try {
            const db = firebase.firestore();

            const newUser = {
                avatar: IMAGE_BASE_URL + generateNumber(),
                firstname,
                lastname,
                email,
                country,
                city
            };

            await db.collection("users").add(newUser)

            newUser.id = nanoid();

            setUsers([...users, newUser]);

            alertify.success("User added successfully!");

            setEditMode(false);
            cleanInputs();
        } catch (error) {
            alertify.error("Error adding user");
            console.error("Error adding document: ", error);
        }
    };

    const setEditModeInput = (user) => {
        setUser(user);
        setEditMode(true);
    };

    const handleUserEdit = async (e) => {
        e.preventDefault();

        const {
            id,            
            firstname,
            lastname,
            email,
            country,
            city,
        } = user;

        try {
            const db = firebase.firestore();

            const newUser = {
                firstname,
                lastname,
                email,
                country,
                city
            };

            await db.collection("users").doc(id).update(newUser);

            setUsers([...users, newUser]);

            alertify.success("User edited successfully!");

            setEditMode(false);
            cleanInputs();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };



    const handleUserDelete = async (id) => {
        try {
            const db = firebase.firestore();
            await db.collection('users').doc(id).delete();

            setUsers(users.filter(user => user.id !== id));

            alertify.success("User deleted successfully!");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-1 md:gap-6 sm:grid-cols-1">
                    {/** INFO */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Users Information</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
                        </div>
                        <div className="table-responsive">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Avatar
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            First Name
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Last Name
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Country
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            City
                                        </th>                                        
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>

                                    {
                                        users.map(user => (
                                            <tr key={user.id} className="odd:bg-white even:bg-slate-100">
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                                    <img src={user.avatar} alt="Avatar" className="h-20 rounded-full" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                    {user.firstname}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                    {user.lastname}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                    {user.country}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                    {user.city}
                                                </td>                                                
                                                <td>
                                                    <button
                                                        className="px-4 py-2 text-sm leading-5 bg-orange-500 text-white font-medium rounded-md shadow-sm focus:outline-none focus:shadow-outline hover:bg-orange-600 mr-3"
                                                        onClick={() => setEditModeInput(user)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 text-sm leading-5 bg-red-600 text-white font-medium rounded-md shadow-sm focus:outline-none focus:shadow-outline hover:bg-red-700 hover:fw-"
                                                        onClick={() => handleUserDelete(user.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/** FORM */}
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Users Registration</h3>
                        </div>
                        <form onSubmit={!editMode ? handleSubmit : handleUserEdit}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:shadow-outline"
                                                onChange={(e) => handlePropValue(e, 'firstname')}
                                                value={user.firstname}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                onChange={(e) => handlePropValue(e, 'lastname')}
                                                value={user.lastname}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                                            <input
                                                type="email"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                onChange={(e) => handlePropValue(e, 'email')}
                                                value={user.email}
                                            />
                                            <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                                                Please provide a valid email address.
                                            </p>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                onChange={(e) => handlePropValue(e, 'country')}
                                                value={user.country}
                                            >
                                                <option value="">Choose...</option>
                                                {
                                                    countries.map((country, index) => {
                                                        return (
                                                            <option key={index} value={country}>{country}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                autoComplete="address-level2"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                onChange={(e) => handlePropValue(e, 'city')}
                                                value={user.city}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{editMode ? "Update" : "Save"}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>
        </>
    );
}

export default Form;
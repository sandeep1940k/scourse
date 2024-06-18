import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Popup from 'reactjs-popup';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { RESPONSE } from '../constant/response.constant';

const Dashboard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        format: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const userId = localStorage.getItem('userId');
    const [questions, setQuestions] = useState([]);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event, close) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post(`http://localhost:3005/api/common/question/${userId}`, formData);
            if (response.status === RESPONSE.OK) {
                setQuestions(prevQuestions => [...prevQuestions, response.data.question]);
                setFormData({ name: '', category: '', format: '' });
                close();
                toast.success('Question added successfully!');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add question.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                navigate('/login');
            } else {
                try {
                    const response = await axios.get(`http://localhost:3005/api/common/question/${userId}`);
                    if (response.status === RESPONSE.OK) {
                        setQuestions(response.data.questions);
                    }
                } catch (error) {
                    console.error(error);
                    toast.error('Failed to fetch questions.');
                }
            }
        };
        fetchData();
    }, [userId, navigate]);

    return (
        <div>
            <nav>
                <h3 className='heading'>Dashboard</h3>
                <div className='heading-option'>
                    <Popup position="left top"
                        trigger={<button className="button">
                            <i className="ri-add-line"></i>Question
                        </button>}
                    >
                        {close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="header"> Add Question </div>
                                <form className="form" onSubmit={(event) => handleSubmit(event, close)}>
                                    <div className="content">
                                        <div className="formGroup">
                                            <label className="label">Name</label>
                                            <textarea
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className='d-flex'>
                                            <div className="formGroup w-50">
                                                <label className="label">Category</label>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="" disabled>Select</option>
                                                    <option value="Software Developer">Software Developer</option>
                                                    <option value="Government Job">Government Job</option>
                                                </select>
                                            </div>
                                            <div className="formGroup w-50">
                                                <label className="label">Format</label>
                                                <select
                                                    name="format"
                                                    value={formData.format}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="" disabled>Select</option>
                                                    <option value="Written">Written</option>
                                                    <option value="MCQ">MCQ</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="actions">
                                        <button type='submit' disabled={isLoading} className="save-button">
                                            {isLoading ? <><ClipLoader size={20} /><span>Saving...</span></> : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Popup>
                </div>
            </nav>
            <div>
                <h1>Questions</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Format</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <tr key={question._id}>
                                <td>{index + 1}</td>
                                <td>{question.name}</td>
                                <td>{question.category}</td>
                                <td>{question.format}</td>
                                <td>{/* You can add actions like Edit/Delete here */}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;

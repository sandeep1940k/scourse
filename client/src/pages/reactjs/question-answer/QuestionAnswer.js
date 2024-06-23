import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { RESPONSE } from '../../../constant/response.constant';
import './QuestionAnswer.css';
import { SERVER } from '../../../config';

const QuestionAnswer = () => {
    const [isOpenQuestionPopup, setIsOpenQuestionPopup] = useState(false);
    const [editQuestionId, setEditQuestionId] = useState(null);
    const [userId] = useState(localStorage.getItem('userId'));
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
    });
    const [questionList, setQuestionList] = useState([]);

    const handleQuestionPopup = () => {
        setFormData({ question: '', answer: '' })
        setIsOpenQuestionPopup(!isOpenQuestionPopup);
        setEditQuestionId(null)
    };

    const handleAddEditQuestion = async (event) => {
        event.preventDefault();
        try {
            if (editQuestionId) {
                const response = await axios.put(`${SERVER}api/reactjs/question-answer/${editQuestionId}`, formData);
                if (response.data.status === RESPONSE.SUCCESS) {
                    toast.success(response.data.message);
                    setFormData({ question: '', answer: '' });
                    setIsOpenQuestionPopup(false);
                    setEditQuestionId(null);
                }
            } else {
                const response = await axios.post(`${SERVER}api/reactjs/question-answer/${userId}`, formData);
                if (response.status === RESPONSE.OK) {
                    toast.success(response.data.message);
                    handleQuestionPopup();
                    setQuestionList(prevList => [...prevList, formData]);
                    setFormData({ question: '', answer: '' }); // Clear the form after submission
                }
            }
        } catch (error) {
            // toast.error("Something went wrong. Please try again.");
            // console.error(error);
            console.log(error);
        }
    };

    const handleDeleteQuestion = async (id, createdBy) => {
        try {
            if (createdBy) {
                if (userId === createdBy) {
                    const response = await axios.delete(`${SERVER}api/reactjs/question-answer/${id}`);
                    if (response.status === RESPONSE.OK) {
                        setQuestionList(questionList.filter(item => item._id !== id));
                        toast.success(response.data.message);
                    }
                } else {
                    toast.info('You cannot delete this question.');
                }
            } else {
                toast.info('This question is recently added.');
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete question.");
        }
    };
    const handleEditQuestion = async (question) => {
        try {
            if (question.createdBy) {
                if (userId === question.createdBy) {
                    handleQuestionPopup();
                    setFormData(question);
                    setEditQuestionId(question._id)
                } else {
                    toast.info('You cannot edit this question.');
                }
            } else {
                toast.info('This question is recently added.');
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete question.");
        }
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${SERVER}api/reactjs/question-answer`);
                if (response.status === RESPONSE.OK) {
                    setQuestionList(response.data.questions);
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch questions.');
            }
        };
        fetchQuestions();
    }, [isOpenQuestionPopup]);

    return (
        <>
            <div className='nav'>
                <div className='left'>
                    <div className='heading'>Question-Answer</div>
                </div>
                <div className='right'>
                    <button type='button' onClick={handleQuestionPopup}>Add Question</button>
                </div>
            </div>
            {
                questionList.length ?
                    <div>
                        {
                            questionList.map((item, index) => (
                                <div key={index} className='question-container'>
                                    <div className='questions'>
                                        <h3>Question {index + 1}. {item.question}</h3>
                                        <p>Answer: {item.answer}</p>
                                    </div>
                                    <div className='icons'>
                                        <div onClick={() => handleEditQuestion(item)}><i className="ri-pencil-line"></i></div>
                                        <div onClick={() => handleDeleteQuestion(item._id, item.createdBy)}><i className="ri-delete-bin-line"></i></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className='no-questions'>No questions available.</div>
            }

            {/* Add/Edit Question Answer Popup Modal */}
            {isOpenQuestionPopup &&
                <div className='popup'>
                    <div className='header'>
                        <div className='left'>
                            <div className='heading'>{editQuestionId ? 'Edit' : 'Add'} Question</div>
                        </div>
                        <div className='right'>
                            <i onClick={handleQuestionPopup} className="ri-close-line"></i>
                        </div>
                    </div>
                    <hr />
                    <div className='body'>
                        <form onSubmit={handleAddEditQuestion}>
                            <div className='form-group'>
                                <label>Question</label>
                                <textarea
                                    type='text'
                                    value={formData.question}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        question: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Answer</label>
                                <textarea
                                    value={formData.answer}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        answer: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <button type='submit'>{editQuestionId ? 'Update' : 'Save'}</button>
                        </form>
                    </div>
                    <div className='footer'></div>
                </div>
            }
        </>
    );
};

export default QuestionAnswer;

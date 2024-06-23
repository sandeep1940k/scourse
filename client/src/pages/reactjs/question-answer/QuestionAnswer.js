import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { RESPONSE } from '../../../constant/response.constant';
import './QuestionAnswer.css';

const QuestionAnswer = () => {
    const [isOpenQuestionPopup, setIsOpenQuestionPopup] = useState(false);
    const [userId] = useState(localStorage.getItem('userId'));
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
    });
    const [questionList, setQuestionList] = useState([]);

    const handleQuestionPopup = () => {
        setIsOpenQuestionPopup(!isOpenQuestionPopup);
    };

    const handleAddEditQuestion = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3005/api/reactjs/question-answer/${userId}`, formData);
            if (response.status === RESPONSE.OK) {
                toast.success(response.data.message);
                handleQuestionPopup();
                setQuestionList(prevList => [...prevList, formData]);
                setFormData({ question: '', answer: '' }); // Clear the form after submission
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        }
    };

    const handleDeleteQuestion = async (id, createdBy) => {
        try {
            if(createdBy){
                if (userId === createdBy) {
                    const response = await axios.delete(`http://localhost:3005/api/reactjs/question-answer/${id}`);
                    if (response.status === RESPONSE.OK) {
                        setQuestionList(questionList.filter(item => item._id !== id));
                        toast.success(response.data.message);
                    }
                } else {
                    toast.info('You cannot delete this question.');
                }
            }else{
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
                const response = await axios.get(`http://localhost:3005/api/reactjs/question-answer`);
                if (response.status === RESPONSE.OK) {
                    setQuestionList(response.data.questions);
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch questions.');
            }
        };
        fetchQuestions();
    }, []);

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
            <div>
                {
                    questionList.map((item, index) => (
                        <div key={index} className='question-container'>
                            <div className='questions'>
                                <h3>Question {index + 1}. {item.question}</h3>
                                <p>Answer: {item.answer}</p>
                            </div>
                            <div className='icons'>
                                <div><i className="ri-pencil-line"></i></div>
                                <div onClick={() => handleDeleteQuestion(item._id, item.createdBy)}><i className="ri-delete-bin-line"></i></div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Add/Edit Question Answer Popup Modal */}
            {isOpenQuestionPopup &&
                <div className='popup'>
                    <div className='header'>
                        <div className='left'>
                            <div className='heading'>Add Question</div>
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
                                <input
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
                            <button type='submit'>Save</button>
                        </form>
                    </div>
                    <div className='footer'></div>
                </div>
            }
        </>
    );
};

export default QuestionAnswer;
import React, { useEffect, useState } from 'react'
import './Question.css'
import 'remixicon/fonts/remixicon.css'
import { RESPONSE } from '../../constant/response.constant';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Question = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [isOpenQuestionPopup, setIsOpenQuestionPopup] = useState(false);
    const [userId] = useState(localStorage.getItem('userId'));

    const handleAddEditQuestion = async () => {
        try {
            setIsOpenQuestionPopup(!isOpenQuestionPopup)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchQuestions = async () => {
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
        fetchQuestions();
    }, []);
    return (
        <>
            <div className='nav'>
                <div className='left'>
                    <div className='heading'>Questions</div>
                </div>
                <div className='right'>
                    <button type='button' onClick={handleAddEditQuestion}>Add Question</button>
                </div>
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Format</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <tr key={question._id}>
                                <td>{question.name}</td>
                                <td>{question.category}</td>
                                <td>{question.format}</td>
                                <td>{/* You can add actions like Edit/Delete here */}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isOpenQuestionPopup ?
                <div className='popup'>
                    <div className='header'>
                        <div className='left'>
                            <div className='heading'>Add Question</div>
                        </div>
                        <div className='right'>
                            <i onClick={handleAddEditQuestion} class="ri-close-line"></i>
                        </div>
                    </div>
                    <hr />
                    <div className='body'></div>
                    <div className='footer'></div>
                </div>
                : ''}
        </>
    )
}

export default Question
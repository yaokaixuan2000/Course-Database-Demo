/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from './AuthContext';
import Modal from './Modal.jsx';
import {Icon} from '@iconify/react';
import {checkLoginStatus} from './checkLogin.jsx';

function TransList() {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const {loggedIn, updateLoggedInStatus} = useContext(AuthContext);  // 使用 updateLoggedInStatus 而不是 setLoggedIn
    const [transData, setTransData] = useState([]);
    const [searchTranID, setSearchTranID] = useState('');
    const [searchedTrans, setSearchedTrans] = useState(null);
    const [genderStats, setGenderStats] = useState([]);
    const checkLoginStatus = async () => {
        try {
            const response = await fetch('/api/check-auth');
            const data = await response.json();
            if (data.success) {
                updateLoggedInStatus(true);  // 更新 AuthContext 的 loggedIn 狀態
            } else {
                updateLoggedInStatus(false);
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            updateLoggedInStatus(false);
        }
    };


    const fetchReplyData = () => {
        fetch('/api/reply')
            .then((response) => response.json())
            .then((data) =>  setTransData(data))
            .catch((error) => console.error('Error fetching reply data:', error));
    };

    const fetchGenderData = () => {
        fetch('/api/reply/gender')
            .then((response) => response.json())
            .then((data) => setGenderStats(data))
            .catch((error) => console.error('Error fetching gender data:', error));
    };
    genderStats.map((item) => console.log(item.NumberOfStudents))

    useEffect(() => {
        fetchReplyData();
        fetchGenderData();
    }, []);


    const [newReply, setNewReply] = useState({
        Class: '',
        StudentID: '',
        Name: '',
        Gender: '',
        Content: '',
        UP_User: '',
    });

    const addReply = (newReply) => {
        fetch('/api/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReply),
        })
            .then((response) => response.json())
            .then((data) => {
                fetchReplyData();  // 重新載入資料
                setShowAlert(true);
            })
            .catch((error) => console.error('Error adding new reply:', error));
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    const deleteTransaction = (tranID) => {
        fetch(`/api/reply/${tranID}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                fetchReplyData();  // 重新載入資料
                setShowDeleteAlert(true);
            })
            .catch((error) => console.error('Error deleting transaction:', error));
        setTimeout(() => {
            setShowDeleteAlert(false);
        }, 3000);
    };


    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedTrans, setEditedTrans] = useState(null);

    const openEditModal = (trans) => {
        setEditedTrans(trans);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditedTrans(null);
        setEditModalOpen(false);
    };


    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/reply/${editedTrans.TranID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedTrans),
            });

            if (response.ok) {
                // 更新成功，關閉編輯視窗並重新載入交易數據
                closeEditModal();
                fetchReplyData();

                if (searchedTrans) {
                    fetch(`/api/trans/${searchedTrans.TranID}`)
                        .then((response) => response.json())
                        .then((data) => setSearchedTrans(data))
                        .catch((error) => console.error('Error fetching searched data:', error));
                }
            } else {
                // 更新失敗，可以顯示錯誤信息
                console.error('Update failed');
            }
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };
    const searchTransaction = () => {
        if (!searchTranID) {
            return;
        }

        fetch(`/api/reply/${searchTranID}`)
            .then((response) => response.json())
            .then((data) => setSearchedTrans(data))
            .catch((error) => console.error('Error searching transaction:', error));
    };


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {!loggedIn ? (
                <p className="text-center text-red-600 text-4xl">請先登入方可使用所有功能謝謝</p>
            ) : (
                <div className="container m-4 rounded-lg border-4 border-gray-500 bg-gray-200 mx-auto  p-4">
                    <h1 className="m-4 font-bold text-2xl">回覆紀錄 CRUD</h1>
                    <div>
                        <p>男生總數: {genderStats.find(item => item.Gender === 'male')?.NumberOfStudents || 0}</p>
                        <p>女生總數: {genderStats.find(item => item.Gender === 'female')?.NumberOfStudents || 0}</p>
                    </div>

                    <form className="flex flex-col md:flex-row justify-center items-center w-full md:w-2/3 mx-auto"
                          onSubmit={(e) => {
                              e.preventDefault();
                              addReply(newReply);
                          }}>



                        <table className="w-full  border-gray-500 bg-white border-2">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border">班級</th>
                                <th className="py-2 px-4 border">學生編號</th>
                                <th className="py-2 px-4 border">姓名</th>
                                <th className="py-2 px-4 border">性別</th>
                                <th className="py-2 px-4 border">回覆內容</th>
                                <th className="py-2 px-4 border"/>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="py-2 px-4 border">
                                    <input type="text" placeholder="班級" value={newReply.Class}
                                           onChange={(e) => setNewReply({ ...newReply, Class: e.target.value })}/>
                                </td>
                                <td className="py-2 px-4 border">
                                    <input type="text" placeholder="學生編號" value={newReply.StudentID}
                                           onChange={(e) => setNewReply({ ...newReply, StudentID: e.target.value })}/>
                                </td>
                                <td className="py-2 px-4 border">
                                    <input type="text" placeholder="姓名" value={newReply.Name}
                                           onChange={(e) => setNewReply({ ...newReply, Name: e.target.value })}/>
                                </td>
                                <td className="py-2 px-4 border">
                                    <input type="text" placeholder="性別" value={newReply.Gender}
                                           onChange={(e) => setNewReply({ ...newReply, Gender: e.target.value })}/>
                                </td>
                                <td className="py-2 px-4 border">
                                    <input type="text" placeholder="回覆內容" value={newReply.Content}
                                           onChange={(e) => setNewReply({ ...newReply, Content: e.target.value })}/>
                                </td>
                                <td>
                                    <button
                                        className=" px-4 h-8 rounded-lg  text-xl font-bold  text-white bg-green-500 hover:bg-green-700"
                                        type="submit">+
                                    </button>
                                    {showAlert && (
                                        <div
                                            className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded shadow animate-slide-in-out"
                                        >
                                           建立成功！
                                        </div>
                                    )}

                                </td>
                            </tr>

                            </tbody>
                        </table>

                    </form>
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        <input
                            className="border-2 bg-white text-center m-2 bg-gray-200 rounded-lg border-gray-300"
                            type="text"
                            placeholder="輸入交易編號"
                            value={searchTranID}
                            onChange={(e) => setSearchTranID(e.target.value)}
                        />
                        <button
                            className=" px-4 h-8 rounded-lg m-2   text-xl font-bold  text-white bg-green-500 hover:bg-green-700"
                            onClick={searchTransaction}>查詢
                        </button>
                    </div>
                    <div className="mb-4">
                        <button
                            className=" px-4 h-8 rounded-lg  text-xl font-bold  text-white bg-green-500 hover:bg-green-700"
                            onClick={() => setSearchedTrans(null)}>顯示全部
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border-4 border-gray-500">
                            <thead>
                            <tr>
                                <th className="py-2 px-4 border">序號</th>
                                <th className="py-2 px-4 border">班級</th>
                                <th className="py-2 px-4 border">學號</th>
                                <th className="py-2 px-4 border">姓名</th>
                                <th className="py-2 px-4 border">性別</th>
                                <th className="py-2 px-4 border">回覆說明</th>
                                <th className="py-2 px-4 border">填表單時間</th>
                                <th className="py-2 px-4 border">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {searchedTrans ? (
                                <tr className="bg-gray-100">
                                    <td className="py-2 px-4 border">{searchedTrans.ID}</td>
                                    <td className="py-2 px-4 border">{searchedTrans.Class}</td>
                                    <td className="py-2 px-4 border">{searchedTrans.StudentID}</td>
                                    <td className="py-2 px-4 border">{searchedTrans.Name}</td>
                                    <td className="py-2 px-4 border">{searchedTrans.Gender}</td>
                                    <td className="py-2 px-4 border">{searchedTrans.Content}</td>
                                    <td className="py-2 px-4 border">{searchedTrans.UP_User}</td>
                                    <td className="py-2 px-4 flex justify-center border">
                                        <button
                                            className="px-4 mr-4 h-8 rounded-lg text-xl font-bold text-white bg-green-500 hover:bg-green-700"
                                            onClick={() => deleteTransaction(searchedTrans.ID)}>
                                            刪除
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                transData.map((trans, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                        <td className="py-2 px-4 border">{trans.ID}</td>
                                        <td className="py-2 px-4 border">{trans.Class}</td>
                                        <td className="py-2 px-4 border">{trans.StudentID}</td>
                                        <td className="py-2 px-4 border">{trans.Name}</td>
                                        <td className="py-2 px-4 border">{trans.Gender}</td>
                                        <td className="py-2 px-4 border">{trans.Content}</td>
                                        <td className="py-2 px-4 border">{trans.UP_Date}</td>
                                        <td className="py-2 px-4 flex justify-center border">
                                            <button
                                                className="px-4 mr-4 h-8 rounded-lg text-xl font-bold text-white bg-green-500 hover:bg-green-700"
                                                onClick={() => deleteTransaction(trans.ID)}>
                                                刪除
                                            </button>
                                            {showDeleteAlert && (
                                                <div className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded shadow animate-slide-in-out">
                                                    刪除成功!
                                                </div>
                                            )}

                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>

                    </div>
                </div>
            )}
            <style>
                {`
                @keyframes slide-in-out {
                    0%, 100% { transform: translateX(120%); }
                    10%, 90% { transform: translateX(0); }
                }

                .animate-slide-in-out {
                    animation: slide-in-out 3s ease;
                }
                `}
            </style>
        </div>


    );


}

export default TransList;



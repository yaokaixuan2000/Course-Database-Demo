/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Modal from '../Modal.jsx';
import { Icon } from '@iconify/react';
function TransList() {

    const [transData, setTransData] = useState([]);
    const [searchTranID, setSearchTranID] = useState('');
    const [searchedTrans, setSearchedTrans] = useState(null);

    useEffect(() => {
        fetch('/api/trans')
            .then((response) => response.json())
            .then((data) => setTransData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const fetchTransData = () => {
        fetch('/api/trans')
            .then((response) => response.json())
            .then((data) => setTransData(data))
            .catch((error) => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchTransData();
    }, []);

    const [newTrans, setNewTrans] = useState({
        AccID: '',
        AtmID: '',
        TranType: '',
        TranNote: '',
        UP_USR: '',
    });


    const addTransaction = (newTrans) => {
        fetch('/api/trans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTrans),
        })
            .then((response) => response.json())
            .then((data) => {
                // 更新前端的狀態或重新載入資料
                fetchTransData();  // 重新載入資料
            })
            .catch((error) => console.error('Error adding new transaction:', error));
    };

    const deleteTransaction = (tranID) => {
        fetch(`/api/trans/${tranID}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                fetchTransData();  // 重新載入資料
            })
            .catch((error) => console.error('Error deleting transaction:', error));
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
            const response = await fetch(`/api/trans/${editedTrans.TranID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedTrans),
            });

            if (response.ok) {
                // 更新成功，關閉編輯視窗並重新載入交易數據
                closeEditModal();
                fetchTransData();

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

        fetch(`/api/trans/${searchTranID}`)
            .then((response) => response.json())
            .then((data) => setSearchedTrans(data))
            .catch((error) => console.error('Error searching transaction:', error));
    };


    return (
        <div className="container m-4 rounded-lg border-4 border-gray-500 bg-gray-200 mx-auto  p-4">


            <h1 className=" flex text-2xl font-semibold mb-4"><Icon className="text-gray-500 text-3xl" icon="teenyicons:android-solid" />北護銀行助手-交易紀錄編輯器</h1>
            {/* 新增的表單 */}
            <form onSubmit={(e) => {
                e.preventDefault();
                addTransaction(newTrans);
            }}>
                <table className="mx-auto  border-gray-500 bg-white border-2">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border">銀行帳號</th>
                        <th className="py-2 px-4 border">ATM編號</th>
                        <th className="py-2 px-4 border">交易類型</th>
                        <th className="py-2 px-4 border">交易說明</th>
                        <th className="py-2 px-4 border">操作者</th>
                        <th className="py-2 px-4 border"/>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="py-2 px-4 border">
                            <input type="text" placeholder="銀行帳號" value={newTrans.AccID}
                                   onChange={(e) => setNewTrans({...newTrans, AccID: e.target.value})}/>
                        </td>
                        <td className="py-2 px-4 border">
                            <input type="text" placeholder="ATM編號" value={newTrans.AtmID}
                                   onChange={(e) => setNewTrans({...newTrans, AtmID: e.target.value})}/>
                        </td>
                        <td className="py-2 px-4 border">
                            <input type="text" placeholder="交易類型" value={newTrans.TranType}
                                   onChange={(e) => setNewTrans({...newTrans, TranType: e.target.value})}/>
                        </td>
                        <td className="py-2 px-4 border">
                            <input type="text" placeholder="交易說明" value={newTrans.TranNote}
                                   onChange={(e) => setNewTrans({...newTrans, TranNote: e.target.value})}/>
                        </td>
                        <td className="py-2 px-4 border">
                            <input type="text" placeholder="操作者" value={newTrans.UP_USR}
                                   onChange={(e) => setNewTrans({...newTrans, UP_USR: e.target.value})}/>
                        </td>
                        <td>
                            <button
                                className=" px-4 h-8 rounded-lg  text-xl font-bold  text-white bg-green-500 hover:bg-green-700"
                                type="submit">新增
                            </button>
                        </td>
                    </tr>

                    </tbody>
                </table>

            </form>
            <div className="flex justify-center">
                <input
                    className="border-2 bg-white text-center m-2 bg-gray-200 rounded-lg border-gray-300"
                    type="text"
                    placeholder="輸入交易編號"
                    value={searchTranID}
                    onChange={(e) => setSearchTranID(e.target.value)}
                />
                <button className=" px-4 h-8 rounded-lg m-2   text-xl font-bold  text-white bg-green-500 hover:bg-green-700"
                        onClick={searchTransaction}>查詢</button>
            </div>
            <div className="mb-4">
                <button className=" px-4 h-8 rounded-lg  text-xl font-bold  text-white bg-green-500 hover:bg-green-700"
                        onClick={() => setSearchedTrans(null)}>顯示全部</button>
            </div>


            <table className="min-w-full bg-white border-4 border-gray-500">
                <thead>
                <tr>
                    <th className="py-2 px-4 border">銀行帳號</th>
                    <th className="py-2 px-4 border">交易序號</th>
                    <th className="py-2 px-4 border">交易時間</th>
                    <th className="py-2 px-4 border">ATM編號</th>
                    <th className="py-2 px-4 border">交易類型</th>
                    <th className="py-2 px-4 border">交易說明</th>
                    <th className="py-2 px-4 border">操作者</th>
                    <th className="py-2 px-4 border">更新時間</th>
                </tr>
                </thead>
                <tbody>
                {searchedTrans ? ( // 如果有查詢結果
                    <tr>
                        <td className="py-2 px-4 border">{searchedTrans.AccID}</td>
                        <td className="py-2 px-4 border">{searchedTrans.TranID}</td>
                        <td className="py-2 px-4 border">{searchedTrans.TranTime}</td>
                        <td className="py-2 px-4 border">{searchedTrans.AtmID}</td>
                        <td className="py-2 px-4 border">{searchedTrans.TranType}</td>
                        <td className="py-2 px-4 border">{searchedTrans.TranNote}</td>
                        <td className="py-2 px-4 border">{searchedTrans.UP_USR}</td>
                        <td className="py-2 px-4 border">{searchedTrans.UP_DATETIME}</td>
                        <td className="py-2 px-4 flex justify-center border">
                            <button className=" px-4 h-8 mr-4 rounded-lg  text-xl font-bold  text-white bg-green-500 hover:bg-green-700"
                                    onClick={() => deleteTransaction(searchedTrans.TranID)}>刪除</button>

                            <button className=" px-4 h-8 rounded-lg  text-xl font-bold  text-white bg-green-500 hover:bg-green-700"
                                    onClick={() => openEditModal(searchedTrans)}>編輯</button>
                        </td>
                    </tr>
                ) : (
                    transData.map((trans, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="py-2 px-4 border">{trans.AccID}</td>
                            <td className="py-2 px-4 border">{trans.TranID}</td>
                            <td className="py-2 px-4 border">{trans.TranTime}</td>
                            <td className="py-2 px-4 border">{trans.AtmID}</td>
                            <td className="py-2 px-4 border">{trans.TranType}</td>
                            <td className="py-2 px-4 border">{trans.TranNote}</td>
                            <td className="py-2 px-4 border">{trans.UP_USR}</td>
                            <td className="py-2 px-4 border">{trans.UP_DATETIME}</td>
                            <td className="py-2 px-4 flex justify-center border">
                                <button className=" px-4 mr-4 h-8 rounded-lg  text-xl font-bold  text-white bg-green-500 hover:bg-green-700"
                                        onClick={() => deleteTransaction(trans.TranID)}>刪除</button>

                                <button className=" px-4 h-8 rounded-lg  text-xl font-bold  text-white bg-green-500 hover:bg-green-700"
                                        onClick={() => openEditModal(trans)}>編輯</button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            {editedTrans && (
                <Modal isOpen={editModalOpen} onClose={closeEditModal}>

                    <form onSubmit={handleEditSubmit}>
                        <tbody>
                        <tr>
                            <th className="py-2 px-4 border">銀行帳號</th>
                            <th className="py-2 px-4 border">ATM編號</th>
                            <th className="py-2 px-4 border">交易類型</th>
                            <th className="py-2 px-4 border">交易說明</th>
                            <th className="py-2 px-4 border">操作者</th>
                        </tr>
                        </tbody>
                        <td><input type="text" placeholder="銀行帳號" value={editedTrans.AccID}
                                   onChange={(e) => setEditedTrans({...editedTrans, AccID: e.target.value})}/>
                        </td>
                        <td><input type="text" placeholder="ATM編號" value={editedTrans.AtmID}
                                   onChange={(e) => setEditedTrans({...editedTrans, AtmID: e.target.value})}/>
                        </td>
                        <td><input type="text" placeholder="交易類型" value={editedTrans.TranType}
                                   onChange={(e) => setEditedTrans({...editedTrans, TranType: e.target.value})}/>
                        </td>
                        <td><input type="text" placeholder="交易說明" value={editedTrans.TranNote}
                                   onChange={(e) => setEditedTrans({...editedTrans, TranNote: e.target.value})}/>
                        </td>
                        <td><input type="text" placeholder="操作者" value={editedTrans.UP_USR}
                                   onChange={(e) => setEditedTrans({...editedTrans, UP_USR: e.target.value})}/>
                        </td>

                        <button className=" px-4 h-8 rounded-lg  text-xl font-bold  text-white bg-green-500 hover:bg-green-700"
                                type="submit">更新交易</button>

                    </form>
                </Modal>
            )}

        </div>

    );


}

export default TransList;

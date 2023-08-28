import React from 'react';
import { Icon } from '@iconify/react';
// import ntunhsT.png
import ntunhsT from './ntunhsT.png';
import { Helmet } from 'react-helmet';
const Ntunhssu  = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Helmet>
                <title>北護學生會-靜態展</title>
            </Helmet>
            <header className="bg-blue-500/40 text-black/50 font-bold text-center p-4">
                <h1 className="text-2xl">學生會</h1>
            </header>

            <main className="p-4">
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">給新生的話</h2>
                    <div className="bg-white rounded-lg p-4 shadow">
                        <p>我們是北護學生會，歡迎你們加入北護大家庭，與我們一同開啟美好校園時光！</p>
                    </div>

                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">最新消息</h2>
                    <div className=" bg-white rounded-lg p-4 shadow">
                        <p className=" font-bold m-2">我們推出紀念衫囉!</p>
                        <img className="border-2 border-black" src={ntunhsT} alt="北護校園景色"></img>
                        <p className=" font-bold m-2">有興趣的同學可以到學生會IG了解詳細資訊</p>
                    </div>

                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">靜態展表單</h2>
                    <div className="bg-white rounded-lg p-4 shadow">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="class" className="block text-sm font-bold">班級</label>
                                <input type="text" id="class" name="class" className="w-full p-2 border rounded"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="studentId" className="block text-sm font-bold">學號</label>
                                <input type="text" id="studentId" name="studentId" className="w-full p-2 border rounded"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-bold">姓名</label>
                                <input type="text" id="name" name="name" className="w-full p-2 border rounded"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-bold">有什麼想對學生會說的嗎</label>
                                <input type="text" id="name" name="name" className="w-full p-2 border rounded"/>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                                送出
                            </button>
                        </form>
                    </div>
                </section>



                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">聯絡我們</h2>
                    <div className="bg-white rounded-lg p-4 shadow">
                        <a
                            href="https://www.instagram.com/ntunhssu_21/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" flex text-black underline">
                            <Icon className="text-2xl mr-2" icon="skill-icons:instagram" />關注我們的Instagram
                        </a>
                    </div>
                </section>
            </main>

            <footer className="bg-blue-500/40 text-black/50 font-bold text-white text-center p-2">
                <p>版權所有 &copy; 學生會</p>
            </footer>
        </div>
    );
};

export default Ntunhssu ;

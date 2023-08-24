import sql from 'mssql';
import controllers from '../controllers/index.js';
import express from 'express';
import viteExpress from 'vite-express';

const app = express();
app.use(express.json());
// 資料庫連接設定
const config = {
    user: 'sa',
    password: '<YourStrong@Passw0rd>',
    server: 'localhost',
    database: 'BANK',
    options: {
        encrypt: true, // 使用 SSL
        trustServerCertificate: true // 信任自簽名憑證
    }
};

// 連接資料庫
sql.connect(config).then(pool => {
    console.log('Connected to the database.');

    // 將資料庫 pool 傳遞給你的控制器，如果需要的話
    app.locals.pool = pool;

    // 使用你的控制器
    app.use('/api', controllers);

    const server = app.listen(3251, () => {
        console.log('Server is running on port 3251');
    });

    viteExpress.bind(app, server);

}).catch(err => {
    console.error('Database connection failed!', err);
});

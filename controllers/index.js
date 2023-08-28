/* eslint-disable no-unused-vars */
import { Router } from "express";
import sql from 'mssql';
const router = Router();

router.get('/check-auth', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const pool = req.app.locals.pool;

        const query = `SELECT AccID, Password FROM Account WHERE AccID = @username;`;

        const result = await pool.request()
            .input('username', username)
            .query(query);

        console.log("Query Result: ", result.recordset);

        if (result.recordset.length > 0) {
            if (password === result.recordset[0].Password) {
                req.session.user = { AccID: username };
                res.json({ success: true, message: 'Login successful' });
            } else {
                res.status(401).json({ success: false, message: 'Invalid Credentials' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/reply', async (req, res) => {
    try {
        const pool = req.app.locals.pool;

        const result = await pool.request().query('SELECT ID, Class, StudentID, Name,Gender, Content, CONVERT(varchar, UP_Date, 23) AS UP_Date, UP_User FROM Reply;');

        console.log(result);

        res.json(result.recordset);
    } catch (err) {
        console.error('Error querying Reply table', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/reply', async (req, res) => {
    try {
        const pool = req.app.locals.pool;
        const newReply = req.body;

        const result = await pool.request()
            .input('Class', sql.NVarChar, newReply.Class)
            .input('StudentID', sql.NVarChar, newReply.StudentID)
            .input('Name', sql.NVarChar, newReply.Name)
            .input('Gender', sql.NVarChar, newReply.Gender)
            .input('Content', sql.NVarChar, newReply.Content)
            .input('UP_User', sql.NVarChar, newReply.UP_User)
            .query('INSERT INTO Reply (Class, StudentID, Name,Gender, Content, UP_User) VALUES (@Class, @StudentID, @Name,@Gender, @Content, @UP_User)');

        res.status(201).json({ message: 'Reply added successfully' });
    } catch (err) {
        console.error('Error adding new reply', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/reply/:ID', async (req, res) => {
    try {
        const pool = req.app.locals.pool;
        const { ID } = req.params;

        const result = await pool.request()
            .input('ID', sql.NVarChar, ID)
            .query('SELECT ID, Class, StudentID, Name,Gender, Content, CONVERT(varchar, UP_Date, 23) AS UP_Date, UP_User FROM Reply WHERE ID = @ID');

        if (result.recordset.length === 0) {
            res.status(404).send('Reply not found');
            return;
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Error querying reply by ID', err);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/reply/:ID', async (req, res) => {
    try {
        const pool = req.app.locals.pool;
        const { ID } = req.params;

        const result = await pool.request()
            .input('ID', sql.NVarChar, ID)
            .query('DELETE FROM Reply WHERE ID = @ID');

        if (result.rowsAffected[0] === 0) {
            res.status(404).send('Reply not found');
            return;
        }

        res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (err) {
        console.error('Error deleting reply', err);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/reply/:ID', async (req, res) => {
    try {
        const pool = req.app.locals.pool;
        const { ID } = req.params;
        const updatedReply = req.body;

        const result = await pool.request()
            .input('ID', sql.NVarChar, ID)
            .input('Class', sql.NVarChar, updatedReply.Class)
            .input('StudentID', sql.NVarChar, updatedReply.StudentID)
            .input('Name', sql.NVarChar, updatedReply.Name)
            .input('Content', sql.NVarChar, updatedReply.Content)
            .input('UP_User', sql.NVarChar, updatedReply.UP_User)
            .query('UPDATE Reply SET Class = @Class, StudentID = @StudentID, Name = @Name, Content = @Content, UP_User = @UP_User, UP_Date = GETDATE() WHERE ID = @ID');

        if (result.rowsAffected[0] === 0) {
            res.status(404).send('Reply not found');
            return;
        }

        res.status(200).json({ message: 'Reply updated successfully' });
    } catch (err) {
        console.error('Error updating reply', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;

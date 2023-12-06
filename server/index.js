const sqlite = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const db = new sqlite.Database('./appointment.db', sqlite.OPEN_READWRITE, (err) => {
	if (err) return console.error(err);
	console.log('[SQLITE]: the connection of database is successfully.');
});

app.use(express.json());
app.use(
	cors({
		origin: '*',
		credentials: true, //access-control-allow-credentials:true
		optionSuccessStatus: 200,
		methods: ['POST', 'GET', 'PUT', 'DELETE'],
	})
);
app.use(morgan('dev'));

app.get('/schedules', (req, res) => {
	const { status } = req.query;
	try {
		let sql = `SELECT * FROM User WHERE status = ? ORDER BY created_at DESC`;
		if (status === undefined) {
			sql = `SELECT * FROM User ORDER BY created_at DESC`;

			db.all(sql, [], (err, rows) => {
				if (err) return res.status(300).json({ error: err });
				if (rows?.length < 1) return res.status(404).json({ error: 'this field is empty, please add user!' });

				const filterRows = rows.map((row) => {
					const parseDoc = JSON.parse(row.documents);
					return { ...row, documents: parseDoc };
				});

				return res.status(200).json(filterRows);
			});
		} else {
			db.all(sql, [status], (err, rows) => {
				if (err) return res.status(300).json({ error: err });
				if (rows?.length < 1) return res.status(404).json({ error: 'this field is empty, please add user!' });

				const filterRows = rows.map((row) => {
					const parseDoc = JSON.parse(row.documents);
					return { ...row, documents: parseDoc };
				});

				return res.status(200).json(filterRows);
			});
		}
	} catch (error) {
		throw new Error(error);
	}
});

app.get('/check-status', (req, res) => {
	const { school_id_no, first_name, last_name, middle_name } = req.query;
	let sql = `SELECT * FROM User WHERE school_id_no = ? AND first_name = ? AND last_name = ? AND middle_name = ?`;
	try {
		db.all(sql, [school_id_no, first_name, last_name, middle_name], (err, rows) => {
			if (err) return res.status(300).json({ error: err });
			if (rows === null) return res.status(404).json({ error: 'the appointment is not found.' });
			return res.status(200).json({ data: rows });
		});
	} catch (error) {
		throw new Error(error);
	}
});

app.post('/create-schedules', (req, res) => {
	try {
		const { first_name, last_name, middle_name, contact_no, section, school_id_no, documents } = req.body;

		console.log(req.body);

		const parseDocs = JSON.stringify(documents);

		const sql = `INSERT INTO User(first_name, last_name, middle_name, contact_no, section, school_id_no, documents, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?,?)`;

		db.run(sql, [first_name, last_name, middle_name, contact_no, section, school_id_no, parseDocs, new Date().toISOString(), new Date().toISOString()], (err) => {
			if (err) return res.status(300).json({ error: err });

			return res.status(200).json({
				message: 'successfully created.',
			});
		});
	} catch (error) {
		throw new Error(error);
	}
});

app.post('/set-schedule/:id', (req, res) => {
	const { id } = req.params;
	const { scheduled_at } = req.body;

	console.log(req.body);
	try {
		const sql = `UPDATE User SET scheduled_at = ?, status = 'completed' WHERE id = ?`;
		db.run(sql, [scheduled_at, id], (err) => {
			if (err) return res.status(300).json({ error: err });

			return res.status(200).json({
				message: 'successfully scheduled.',
			});
		});
	} catch (error) {
		throw new Error(error);
	}
});

app.listen(3001, () => {
	console.log(`[SERVER]: STARTED AT http://localhost:3001`);
});

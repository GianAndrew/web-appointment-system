const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./appointment.db', sqlite.OPEN_READWRITE, (err) => {
	if (err) return console.error(err);
	console.log('[SQLITE]: the connection of database is successfully.');
});

const sql = `CREATE TABLE "User" (
	"id"	INTEGER NOT NULL,
	"first_name"	TEXT,
	"last_name"	TEXT,
	"middle_name"	TEXT,
	"section"	TEXT,
	"school_id_no"	TEXT,
	"contact_no"	TEXT,
	"documents"	TEXT,
	"status"	TEXT DEFAULT 'pending',
	"scheduled_at"	TEXT,
	"created_at"	TEXT,
	"updated_at"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
)`;

db.run(sql);

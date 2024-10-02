const client = require('../model/mqttConn');
const db = require('../model/db'); // Đảm bảo bạn đã import đúng model database
const { default: start } = require('mqtt/bin/pub');

let getdata = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Lấy số trang từ query parameter, mặc định là 1
    const pageSize = 10; // Kích thước trang
    const offset = (page - 1) * pageSize; // Tính toán offset

    // Truy vấn dữ liệu từ cơ sở dữ liệu với phân trang
    const query = 'SELECT * FROM datasensor ORDER BY timestamp ASC LIMIT ? OFFSET ?';

    db.query(query, [pageSize, offset], (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.status(500).json({ error: "error" });
        }

        // Nếu cần, bạn có thể thêm một truy vấn khác để đếm tổng số bản ghi
        const countQuery = 'SELECT COUNT(*) AS total FROM datasensor';

        db.query(countQuery, (err, countResults) => {
            if (err) {
                console.error('Error executing count query', err.stack);
                return res.status(500).json({ error: "error" });
            }

            const totalRecords = countResults[0].total;
            const totalPages = Math.ceil(totalRecords / pageSize);

            // Gửi kết quả về frontend
            res.json({
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalRecords: totalRecords
                },
                data: results.map(row => ({
                    id: row.id,
                    temperature: row.temperature,
                    humidity: row.humidity,
                    light: row.light,
                    timestamp: row.timestamp
                }))

            });
        });
    });
};

let search = (req, res) => {

    const page = parseInt(req.query.page) || 1; // Lấy số trang từ query parameter, mặc định là 1
    const pageSize = 10; // Kích thước trang
    const offset = (page - 1) * pageSize;
    const { type, value } = req.query;
    console.log("type .value: ", type, value)
    // Truy vấn dữ liệu từ cơ sở dữ liệu với phân trang
    const query = `SELECT * FROM datasensor WHERE ${type} = ?  ORDER BY timestamp ASC LIMIT ? OFFSET ?`;
    const values = [value, pageSize, offset];

    //query
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.status(500).json({ error: "error" });
        }

        const countQuery = `SELECT COUNT(*) AS total FROM datasensor where ${type} = ? `;

        db.query(countQuery, value, (err, countResults) => {
            if (err) {
                console.error('Error executing count query', err.stack);
                return res.status(500).json({ error: "error" });
            }

            const totalRecords = countResults[0].total;
            const totalPages = Math.ceil(totalRecords / pageSize);

            //     // Gửi kết quả về frontend
            res.json({
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalRecords: totalRecords
                },
                data: results.map(row => ({
                    id: row.id,
                    temperature: row.temperature,
                    humidity: row.humidity,
                    light: row.light,
                    timestamp: row.timestamp
                }))

            });
        });

    })
};

let Filter = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Lấy số trang từ query parameter, mặc định là 1
    const pageSize = 10; // Kích thước trang
    const offset = (page - 1) * pageSize;
    const query = `SELECT * FROM datasensor 
    WHERE timestamp >= ? AND timestamp <= ? 
    ORDER BY timestamp ASC LIMIT ? OFFSET ?`;

    const starttime = req.query.starttime.replace("T", " ").concat(":00");
    const endtime = req.query.endtime.replace("T", " ").concat(":00");
    

    console.log("start, end, type, value:", starttime, endtime);

    const values = [starttime, endtime, 888, offset];
    //query
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.status(500).json({ error: "error 1" });
        }
        const countQuery = `SELECT COUNT(*) AS total FROM datasensor  WHERE timestamp >= ? AND timestamp <= ?  `;

        db.query(countQuery, [starttime, endtime], (err, countResults) => {
            if (err) {
                console.error('Error executing count query', err.stack);
                return res.status(500).json({ error: "error 2" });
            }

            const totalRecords = countResults[0].total;
            const totalPages = Math.ceil(totalRecords / pageSize);

            //     // Gửi kết quả về frontend
            res.json({
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalRecords: totalRecords
                },
                data: results.map(row => ({
                    id: row.id,
                    temperature: row.temperature,
                    humidity: row.humidity,
                    light: row.light,
                    timestamp: row.timestamp
                }))

            });
        });

    })
};


module.exports = { getdata, search, Filter };

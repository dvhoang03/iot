const client = require('../model/mqttConn');
const db = require('../model/db'); // Đảm bảo bạn đã import đúng model database
const { default: start } = require('mqtt/bin/pub');

let getdata = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Lấy số trang từ query parameter, mặc định là 1
    const pageSize = parseInt(req.query.pagesize); // Kích thước trang
    const offset = (page - 1) * pageSize; // Tính toán offset
    console.log(page, pageSize);
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
    const pageSize = parseInt(req.query.pagesize); // Kích thước trang
    const offset = (page - 1) * pageSize;
    const value = req.query.value.replace("T", " ").concat("");
    console.log("type .value: ", value)
    // Truy vấn dữ liệu từ cơ sở dữ liệu với phân trang
    const query = `SELECT * FROM datasensor WHERE timestamp LIKE "${value}%"  ORDER BY timestamp ASC LIMIT ? OFFSET ?`;


    const values = [pageSize, offset];
    //query
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.status(500).json({ error: "error1" });
        }

        const countQuery = `SELECT COUNT(*) AS total FROM datasensor where timestamp LIKE "${value}%" `;

        db.query(countQuery, value, (err, countResults) => {
            if (err) {
                console.error('Error executing count query', err.stack);
                return res.status(500).json({ error: "error2" });
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




module.exports = { getdata, search };

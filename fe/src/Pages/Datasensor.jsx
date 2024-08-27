import React, { useState } from 'react';
import './css/Datasensor.css'

function Datasensor() {
    const [data, setData] = useState([
        // Dữ liệu mẫu, có thể thay thế bằng dữ liệu thực tế
        { id: 1, temperature: 25, light: 100, humidity: 50, time: '2024-08-26 10:00' },
        { id: 2, temperature: 28, light: 120, humidity: 55, time: '2024-08-26 11:00' },
        { id: 3, temperature: 26, light: 110, humidity: 60, time: '2024-08-26 12:00' },
        { id: 4, temperature: 30, light: 130, humidity: 65, time: '2024-08-26 13:00' },
        { id: 5, temperature: 27, light: 125, humidity: 58, time: '2024-08-26 14:00' },
        // Thêm nhiều dữ liệu để kiểm tra phân trang
    ]);

    const [filterType, setFilterType] = useState('temperature');
    const [filterValue, setFilterValue] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2); // Số dòng hiển thị mỗi trang

    const handleSearch = () => {
        // Lọc dữ liệu theo giá trị input và loại trường được chọn
        const filteredData = data.filter(item =>
            item[filterType].toString().includes(filterValue)
        );
        setData(filteredData);
        setCurrentPage(1); // Reset trang về 1 sau khi tìm kiếm
    };

    const handleFilterByTime = () => {
        // Lọc dữ liệu theo khoảng thời gian
        const filteredData = data.filter(item => {
            const itemTime = new Date(item.time);
            return itemTime >= new Date(startTime) && itemTime <= new Date(endTime);
        });
        setData(filteredData);
        setCurrentPage(1); // Reset trang về 1 sau khi lọc
    };

    // Tính toán dữ liệu để hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / pageSize);

    return (
        <div className='datasensor'>

            <div className='search'>
                <input
                    type="text"
                    placeholder="Nhập giá trị tìm kiếm"
                    value={filterValue}

                    onChange={(e) => setFilterValue(e.target.value)}
                />

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="temperature">Temperature</option>
                    <option value="light">Light</option>
                    <option value="humidity">Humidity</option>
                </select>

                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>


            <div>
                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />

                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />

                <button onClick={handleFilterByTime}>Lọc</button>
            </div>


            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Temperature</th>
                        <th>Light</th>
                        <th>Humidity</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.temperature}</td>
                            <td>{item.light}</td>
                            <td>{item.humidity}</td>
                            <td>{item.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className='page'>
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Trang trước
                </button>

                <span>Trang {currentPage} / {totalPages}</span>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Trang sau
                </button>
            </div>

            <div className='pagesize'>
                <label>Page Size:</label>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
            </div>
        </div>
    );
}

export default Datasensor;

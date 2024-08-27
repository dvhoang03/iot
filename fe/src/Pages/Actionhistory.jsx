import React, { useState } from 'react';
import './css/Actionhistory.css'

function Actionhistory() {
    const [data, setData] = useState([
        // Dữ liệu mẫu, có thể thay thế bằng dữ liệu thực tế
        { id: 1, device: 'Device A', onTime: '2024-08-26 08:00', offTime: '2024-08-26 10:00' },
        { id: 2, device: 'Device B', onTime: '2024-08-26 09:00', offTime: '2024-08-26 11:00' },
        { id: 3, device: 'Device C', onTime: '2024-08-26 12:00', offTime: '2024-08-26 14:00' },
        // Thêm nhiều dữ liệu để kiểm tra
    ]);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2); // Số dòng hiển thị mỗi trang

    const handleFilterByTime = () => {
        // Lọc dữ liệu theo khoảng thời gian
        const filteredData = data.filter(item => {
            const onTime = new Date(item.onTime);
            const offTime = new Date(item.offTime);
            const start = new Date(startTime);
            const end = new Date(endTime);
            return (onTime >= start && onTime <= end) || (offTime >= start && offTime <= end);
        });
        setData(filteredData);
        setCurrentPage(1); // Reset về trang 1 sau khi lọc
    };

    // Tính toán dữ liệu để hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / pageSize);

    return (
        <div className='actionhistory'>
            <div>
                <label>Start Time: </label>
                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />

                <label>End Time: </label>
                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />

                <button onClick={handleFilterByTime}>Lọc</button>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Device</th>
                            <th>On-Time</th>
                            <th>Off-Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.device}</td>
                                <td>{item.onTime}</td>
                                <td>{item.offTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='pagination'>
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Trang trước
                </button>

                <span> Trang {currentPage} / {totalPages}</span>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Trang sau
                </button>
            </div>

            <div className='page-size'>
                <label>Kích thước trang:</label>
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

export default Actionhistory;

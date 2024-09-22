import React, { useState, useEffect } from 'react';
import './css/Actionhistory.css'

function Actionhistory() {
    const [data, setData] = useState([]);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Số dòng hiển thị mỗi trang
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang
    useEffect(() => {
        getData();
    }, [currentPage, pageSize]);

    const getData = () => {
        fetch(`http://localhost:4000/actionhistory?page=${currentPage}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data)
                setData(result.data);
                setTotalPages(result.pagination.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const getFilter = () => {
        
        fetch(`http://localhost:4000/actionhistory/filter?starttime=${startTime}&endtime=${endTime}&page=${currentPage}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data)
                setData(result.data);
                setTotalPages(result.pagination.totalPages);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    };




    const getNextPage = async (index) => {

        if (index < pageSize) {
            setCurrentPage(index + 1);
            if (startTime === null && endTime === null) {

                getData();
            }
            else {
                getFilter();
            }
        }
    }

    const getPreviousPage = (index) => {
        if (index > 1) {
            setCurrentPage(index - 1);
            if (startTime === null && endTime === null) {

                getData();
            }
            else {
                getFilter();
            }
        }
    }

    const handleFilterByTime = () => {
        // Lọc dữ liệu theo khoảng thời gian
        setCurrentPage(1)
        getFilter();

    };





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
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.device}</td>
                                <td>{item.action}</td>
                                <td>{new Date(item.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='pagination'>
                <button
                    onClick={() => getPreviousPage(currentPage)}
                >
                    Trang trước
                </button>

                <span> Trang {currentPage} / {totalPages}</span>

                <button
                    onClick={() => getNextPage(currentPage)}
                >
                    Trang sau
                </button>
            </div>


        </div>
    );
}

export default Actionhistory;

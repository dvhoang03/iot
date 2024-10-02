import React, { useState, useEffect } from 'react';
import './css/Actionhistory.css'

function Actionhistory() {
    const [data, setData] = useState([]);
    const [filterValue, setFilterValue] = useState("none");
    const [filterType, setFilterType] = useState("none");
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Số dòng hiển thị mỗi trang
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang


    console.log(filterType, filterValue)
    useEffect(() => {
        // Kiểm tra xem có filter theo thời gian không
        if (filterType != "none" && filterValue != "none") {
            getSearch();
        }
        else if (startTime && endTime) {
            getFilter();
        }
        else { getData(); }

    }, [currentPage]);

    const getData = () => {
        fetch(`http://localhost:4000/actionhistory?page=${currentPage}`)
            .then((response) => response.json())
            .then((result) => {
                setData(result.data);
                setTotalPages(result.pagination.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const getSearch = () => {
        console.log("get filter:", filterType, filterValue, currentPage, totalPages)
        fetch(`http://localhost:4000/actionhistory/search?type=${filterType}&value=${filterValue}&page=${currentPage}`)
            .then((response) => response.json())
            .then((result) => {
                setData(result.data);
                setTotalPages(result.pagination.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const getFilter = () => {
        console.log("get filter:", startTime, endTime, currentPage, totalPages)
        fetch(`http://localhost:4000/actionhistory/filter?starttime=${startTime}&endtime=${endTime}&page=${currentPage}`)
            .then((response) => response.json())
            .then((result) => {
                setData(result.data);
                setTotalPages(result.pagination.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const getNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);  // Tăng currentPage lên 1

        }
    };

    const getPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);  // Giảm currentPage xuống 1

        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        getSearch()

    }

    const handleFilterByTime = () => {
        setCurrentPage(1); // Reset về trang 1 khi lọc mới
        getFilter();
    };

    return (
        <div className='actionhistory'>
            <div className="search">
                <select
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                >
                    <option value="none">No</option>
                    <option value="on">on</option>
                    <option value="off">off</option>

                </select>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="none">No</option>
                    <option value="led">led</option>
                    <option value="fan">fan</option>
                    <option value="ac">ac</option>
                </select>
                <button onClick={handleSearch}>Tìm kiếm</button>

            </div>
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
                    onClick={getPreviousPage}
                    disabled={currentPage <= 1}
                >
                    Trang trước
                </button>

                <span> Trang {currentPage} / {totalPages}</span>

                <button
                    onClick={getNextPage}
                    disabled={currentPage >= totalPages}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
}

export default Actionhistory;

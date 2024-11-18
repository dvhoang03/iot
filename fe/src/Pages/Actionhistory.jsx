import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'; // Thêm import cho date-fns
import './css/Actionhistory.css'

function Actionhistory() {
    const [data, setData] = useState([]);
    const [filterValue, setFilterValue] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPages] = useState(0);

    useEffect(() => {
        if (filterValue) {
            getSearch();
        } else {
            getData();
        }
    }, [currentPage, pageSize]);

    const getData = () => {
        fetch(`http://localhost:4000/actionhistory?pagesize=${pageSize}&page=${currentPage}`)
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
        fetch(`http://localhost:4000/actionhistory/search?pagesize=${pageSize}&page=${currentPage}&value=${filterValue}`)
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
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const getPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        getSearch();
    };

    return (
        <div className='actionhistory'>
            <div className="search">
                <input
                    type="text"
                    placeholder="nhap thoi gian"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
                Page Size:
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                <button onClick={handleSearch}>Tìm kiếm</button>
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
                                <td>{format(new Date(item.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td> {/* Định dạng thời gian */}
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

            <div className="gotopage">
                Go to Page: 
                <input type="text" 
                placeholder=" nhap page"
                onChange={(e) => setPages(e.target.value)}
                
                />

                <button
                    onClick={() => setCurrentPage(page)}
                >
                    Goto
                </button>
            </div>
        </div>
    );
}

export default Actionhistory;

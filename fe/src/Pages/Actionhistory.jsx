import React, { useState, useEffect } from 'react';
import './css/Actionhistory.css'

function Actionhistory() {
    const [data, setData] = useState([]);
    const [filterValue, setFilterValue] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Số dòng hiển thị mỗi trang
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang


    // console.log( filterValue)
    useEffect(() => {
        // Kiểm tra xem có filter theo thời gian không
        if (filterValue) {
            getSearch();
        }

        else {
            getData();
        }

    }, [currentPage, pageSize]);

    const getData = () => {
        fetch(`http://localhost:4000/actionhistory?pagesize=${pageSize}&page=${currentPage}`)
            //    http://localhost:4000/actionhistory?pagesize=20&page=1
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
        console.log("get filter:", filterValue, currentPage, totalPages)
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
        getSearch();
    }



    return (
        <div className='actionhistory'>
            <div className="search">
                <input
                    type="text"
                    placeholder=" định dạng yyyy-mm-ddThh:mm"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
                Page Sise:
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

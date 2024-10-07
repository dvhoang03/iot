import React, { useState, useEffect } from 'react';
import './css/Datasensor.css'

function Datasensor() {
    const [data, setData] = useState([]); // Dữ liệu từ backend
    const [filterValue, setFilterValue] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Số dòng hiển thị mỗi trang
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang


    useEffect(() => {
        if (filterValue) {
            getSearch();
        } else {
            getData();
        }
    }, [currentPage, pageSize]);

    const getData = () => {
        fetch(`http://localhost:4000/datasensor?pagesize=${pageSize}&page=${currentPage}`)
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


    const getSearch = () => {

        fetch(`http://localhost:4000/datasensor/search?pagesize=${pageSize}&value=${filterValue}&page=${currentPage}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data)
                setData(result.data);
                setTotalPages(result.pagination.totalPages);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    };


    const handleSearch = () => {
        // if (filterType ===null && filterValue === null) {
        setCurrentPage(1)
        getSearch()

        // }
    }

    // Tính toán dữ liệu để hiển thị trên trang hiện tại
    // const indexOfLastItem = currentPage * pageSize;
    // const indexOfFirstItem = indexOfLastItem - pageSize;

    return (
        <div className='datasensor'>

            <div className='search'>
                <input
                    type="text"
                    placeholder=" định dạng yyyy-mm-ddThh:mm"
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
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.temperature}</td>
                            <td>{item.light}</td>
                            <td>{item.humidity}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='page'>
                <button
                    onClick={() => getPreviousPage(currentPage)}

                >
                    Trang trước
                </button>

                <span>   Trang {currentPage} / {totalPages}   </span>

                <button
                    onClick={() => getNextPage(currentPage)}

                >
                    Trang sau
                </button>
            </div>


        </div>
    );
}

export default Datasensor;

import React, { useState, useEffect } from 'react';
import './css/Datasensor.css'

function Datasensor() {
    const [data, setData] = useState([]); // Dữ liệu từ backend
    const [filterType, setFilterType] = useState(null);
    const [filterValue, setFilterValue] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Số dòng hiển thị mỗi trang
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang


    useEffect(() => {
        if (filterType && filterType !== 'none' && filterValue) {
            getSearch();
        } else if (startTime && endTime) {
            getFilter();
        } else {
            getData();
        }
    }, [currentPage]);

    const getData = () => {
        fetch(`http://localhost:4000/datasensor?page=${currentPage}`)
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

        fetch(`http://localhost:4000/datasensor/search?type=${filterType}&value=${filterValue}&page=${currentPage}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data)
                setData(result.data);
                setTotalPages(result.pagination.totalPages);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const getFilter = () => {

        fetch(`http://localhost:4000/datasensor/filter?starttime=${startTime}&endtime=${endTime}&page=${currentPage}`)
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

    const handleFiler = () => {
        console.log("gia truj:", typeof (filterType), typeof (filterValue));
        setCurrentPage(1);
        getFilter();

        setFilterValue('');  // Làm trống giá trị input tìm kiếm
        setFilterType('none');
    }

    const handleFilterByTime = () => {

    };

    // Tính toán dữ liệu để hiển thị trên trang hiện tại
    // const indexOfLastItem = currentPage * pageSize;
    // const indexOfFirstItem = indexOfLastItem - pageSize;

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
                    <option value="none">No</option>
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

                <button onClick={handleFiler}>Lọc</button>
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

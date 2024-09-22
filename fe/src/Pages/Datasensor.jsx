import React, { useState, useEffect } from 'react';
import './css/Datasensor.css'

function Datasensor() {
    const [data, setData] = useState([]); // Dữ liệu từ backend
    const [filterType, setFilterType] = useState('none');
    const [filterValue, setFilterValue] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Số dòng hiển thị mỗi trang
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang

    console.log("vlaue", filterValue);
    console.log("type", filterType);
    console.log("startTime", startTime);
    console.log("endTime", endTime);
    // Gọi API để lấy dữ liệu từ backend
    useEffect(() => {
        getData();
    }, [currentPage, pageSize]);

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


    const getNextPage = async (index) => {

        if (index < pageSize) {
            setCurrentPage(index + 1);
            if (filterType === "none" || filterValue === null) {

                getData();
            }
            else {
                getSearch();
            }
        }
    }

    const getPreviousPage = (index) => {
        if (index > 1) {
            setCurrentPage(index - 1);
            if (filterType === "none" || filterValue === null) {

                getData();
            }
            else {
                getSearch();
            }
        }
    }

    const getSearch = () => {
        // fetch(`http://localhost:4000/datasensor?page=${currentPage}`)
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log(result.data)
        //         setData(result.data);
        //         setTotalPages(result.pagination.totalPages);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching data:', error);
        //     });
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
        setCurrentPage(1);
        getSearch();
    }

    const handleFiler = () => {
        setCurrentPage(1);
        getFilter();
    }

    const handleFilterByTime = () => {

    };

    // Tính toán dữ liệu để hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;

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

                <span>Trang {currentPage} / {totalPages}</span>

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

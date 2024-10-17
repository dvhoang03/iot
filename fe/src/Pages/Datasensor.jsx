import React, { useState, useEffect } from 'react';
import './css/Datasensor.css'
import { format } from 'date-fns'; // Thêm import cho date-fns

function Datasensor() {
    const [data, setData] = useState([]); // Dữ liệu từ backend
    const [filterValue, setFilterValue] = useState(null);
    const [filterField, setFilterField] = useState('timestamp');

    const [filterField1, setFilterField1] = useState('timestamp'); // Thêm filterField
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Số dòng hiển thị mỗi trang
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang
    const [page, setPages] = useState(0);
    const [sort, setSort] = useState("tang");

    useEffect(() => {
        if (filterValue) {
            console.log("search")
            getSearch();
        } else {
            console.log("ko search")
            getData();
        }
    }, [currentPage, pageSize]);

    const getData = () => {

        console.log("gia trị:", currentPage)
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



    const getSearch = () => {
        console.log("gia trị:", filterField, filterValue, currentPage)
        fetch(`http://localhost:4000/datasensor/search?pagesize=${pageSize}&field=${filterField}&value=${filterValue}&page=${currentPage}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data)
                setData(result.data);
                setTotalPages(result.pagination.totalPages);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const getSort = () => {
        console.log("gia trị:", filterField, filterValue, currentPage)
        fetch(`http://localhost:4000/datasensor/sort?pagesize=${pageSize}&field=${filterField1}&value=${sort}&page=${page}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data)
                setData(result.data);
                setTotalPages(result.pagination.totalPages);
            }).catch((error) => {
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
    };

    const handleSort = () => {
        setCurrentPage(1);
        getSort();
    };

    return (
        <div className='datasensor'>
            <div className='search'>
                <select
                    value={filterField}
                    onChange={(e) => setFilterField(e.target.value)}
                >
                    <option value="light">light</option>
                    <option value="temperature">temperature</option>
                    <option value="humidity">humidity</option>
                    <option value="timestamp">timestamp</option>
                </select>

                <input
                    type="text"
                    placeholder=" Nhập giá trị tìm kiếm"
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

            <div className='sort'>
                <select
                    value={filterField1}
                    onChange={(e) => setFilterField1(e.target.value)}
                >
                    <option value="light">light</option>
                    <option value="temperature">temperature</option>
                    <option value="humidity">humidity</option>
                    <option value="timestamp">timestamp</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="tang">Tăng dần</option>
                    <option value="giam">Giảm dần</option>
                </select>



                <button onClick={handleSort}>Sắp xếp</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>temperature</th>
                        <th>light</th>
                        <th>dust</th>
                        <th>humidity</th>
                        <th>timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.temperature}</td>
                            <td>{item.light}</td>
                            <td>{item.dust}</td>
                            <td>{item.humidity}</td>
                            <td>{format(new Date(item.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='page'>
                <button onClick={() => getPreviousPage()}>Trang trước</button>
                <span>   Trang {currentPage} / {totalPages}   </span>
                <button onClick={() => getNextPage()}>Trang sau</button>
            </div>

            <div className="abc">
                Go to Page:
                <input type="text"
                    placeholder=" nhập page"
                    onChange={(e) => setPages(e.target.value)}
                />
                <button onClick={() => setCurrentPage(page)}>Goto</button>
            </div>
        </div>
    );
}

export default Datasensor;

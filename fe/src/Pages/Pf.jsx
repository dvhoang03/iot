import React from 'react'
import image from '../Components/Assets/image.png'
import baocao from "../Components/Assets/baocao.pdf"
import "./css/Pf.css"

function profile() {
    return (
        <div className='pf' >

            <div className="image">
                <img
                    src={image}
                    alt="Profile"

                />
            </div>

            <div className="info">
                <h2>Họ và Tên: Dương Việt Hoàng</h2>

                <p>Mã Sinh Viên: B21DCCN384</p>

                <div>File báo cáo: <a href={baocao} download="Profile.pdf" >
                    Tải xuống
                </a></div>
                <p>github: https://github.com/dvhoang03/web_iot </p>
            </div>
        </div>
    )
}

export default profile

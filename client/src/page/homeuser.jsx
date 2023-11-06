import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function homeuser() {
  const [phone, setPhone] = useState('');
  const [plate, setPlate] = useState('');
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState(null);


  const searchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/customerData/${phone}/${plate}`);
      const data = response.data;
      setOrderData(data);
      setError(null);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการร้องข้อมูล:', error);
      setError('เกิดข้อผิดพลาดในการค้นหาข้อมูล');
      setOrderData([]);
    }
  };


  return (
    <div>
      <Navbar />
      <div>
        <div className="search">
          <input
            type="search"
            class="mysearch"
            placeholder="กรอกป้ายทะเบียน"
            onChange={(e) => setPlate(e.target.value)}
          />
        </div>
        <div className="search">
          <input
            type="search"
            class="telsearch"
            placeholder="กรอกเบอรโทรศัพท์"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="btcontent">
          <button className="bt" onClick={searchOrders}>ค้นหา</button>
        </div>
      </div>
      <div>
      {error && <p>{error}</p>}
      {orderData.length > 0 && (
        <div>
          <h2>รายการซ่อมที่เกี่ยวข้อง</h2>
          <ul>
            {orderData.map((order) => (
              <li key={order.order_id}>
                <p>รหัสรายการซ่อม: {order.order_id}</p>
                <p>คำอธิบาย: {order.description}</p>
                <p>เวลาโดยประมาณ: {order.estimate_time}</p>
                <p>ชื่อลูกค้า: {order.name}</p>
                <p>เบอร์โทร: {order.phone}</p>
                <p>ทะเบียนรถ: {order.plate_license}</p>
                <p>ช่าง: {order.mech_name}</p>
                <p>สถานะ: {order.status_name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      </div>


    </div>
  );
}

export default homeuser;

// 设置后端API地址
const API_BASE_URL = 'http://localhost:10000/api';

// 指定房型ID，比如 dorm8 或 private3
const roomId = 'dorm8';

// 初始化日历
async function loadCalendar() {
  try {
    const res = await fetch(`${API_BASE_URL}/calendar/${roomId}`);
    const dates = await res.json();

    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';

    dates.forEach(day => {
      const dateDiv = document.createElement('div');
      dateDiv.className = 'date-cell';
      dateDiv.textContent = `${day.date} - ${day.status}`;

      if (day.status === 'available') {
        dateDiv.style.backgroundColor = '#d4edda'; // 绿色背景表示可预订
        dateDiv.style.cursor = 'pointer';

        dateDiv.onclick = () => openBookingForm(day.date);
      } else if (day.status === 'booked') {
        dateDiv.style.backgroundColor = '#f8d7da'; // 红色背景表示已预订
      } else if (day.status === 'locked') {
        dateDiv.style.backgroundColor = '#d1ecf1'; // 蓝色背景表示锁定
      }

      calendarDiv.appendChild(dateDiv);
    });
  } catch (error) {
    console.error('加载房态失败:', error);
  }
}

// 弹出预定表单
function openBookingForm(date) {
  const name = prompt(`预订 ${date}，请输入姓名：`);
  if (!name) return;

  const phone = prompt('请输入电话：');
  if (!phone) return;

  const email = prompt('请输入邮箱：');
  if (!email) return;

  // 提交订单
  submitBooking({ roomId, date, name, phone, email });
}

// 提交订单到后端
async function submitBooking(bookingData) {
  try {
    const res = await fetch(`${API_BASE_URL}/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });

    const data = await res.json();
    alert(data.message);

    loadCalendar(); // 提交成功后刷新日历
  } catch (error) {
    console.error('预定失败:', error);
  }
}

// 页面加载完毕后启动
window.onload = () => {
  loadCalendar();
};

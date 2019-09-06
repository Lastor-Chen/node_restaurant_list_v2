// 餐廳圖片連結無效時，替換預設圖片
window.addEventListener('error', e => {
  if (e.target.matches('img')) {
    e.target.src = '/img/default_img.png'
    console.clear()
  }
}, true)
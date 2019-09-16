/*
 * 說明： 
 * 於登入/註冊頁，點擊 FB OAuth 按鈕時，開出彈出窗口並給予 window.name = "OAuth"
 * 如果 User 取消操作，pop-up 會回到 /signin 頁面。
 * 此時可以透過 window.name 這個 flag 將 pop-up 關閉。
 * 如果是從外部網站進入此 app，將不會具有這個 flag，用來避免 window.close() 誤觸發。
*/

// 確認當前窗口是否為此 app 開啟的 OAuth pop-up
if (window.name === 'OAuth') {
  window.close()
}

$('#fb-btn').on('click', e => {
  e.preventDefault()

  // 設定 pop-up 視窗大小
  const width = screen.width * 0.3
  const height = screen.height *0.6

  // 設定 pop-up 視窗位置
  const left = (screen.width / 2) - (width / 2)
  const top = (screen.height / 2) - (height / 1.7)


  window.open('/OAuth/facebook', 'OAuth', `width=${width}, height=${height}, left=${left}, top=${top}`)
})
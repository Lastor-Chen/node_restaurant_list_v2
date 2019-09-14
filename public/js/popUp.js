// 確認當前窗口是否為 OAuth pop-up
if (window.opener) {
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
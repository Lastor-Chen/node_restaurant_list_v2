// 確認當前窗口是否為 OAuth pop-up
if (window.opener) {
  // 父視窗重新導向
  window.opener.location.replace('/index')

  // 關閉子視窗
  window.close()
}
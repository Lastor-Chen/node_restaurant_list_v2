/*
 * 說明：
 * 此 app 使用 pop-up 處理 OAuth 授權。
 * 如果是此 app 開出的 pop-up 窗口，將帶有 window.name = "OAuth" 屬性。
 * 授權確認後，會在 pop-up 導回首頁，而非期望的原視窗。
 * 所以透過判斷 window.name = "OAuth" 來關閉 pop-up，並將原視窗導進首頁。
*/

// 確認當前窗口是否為此 app 開啟的 OAuth pop-up
if (window.name === 'OAuth') {
  // 父視窗重新導向
  window.opener.location.replace('/index')

  // 關閉 pop-up 視窗
  window.close()
}
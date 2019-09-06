// 點擊刪除按鈕後，將 id 傳給 Modal 的表單
$('.del').on('click', e => {
  const id = e.target.dataset.id
  
  $('#del-form').attr('action', `/restaurants/${id}/delete`)
})
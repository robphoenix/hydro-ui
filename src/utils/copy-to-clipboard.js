export default (text) => {
  document.addEventListener('copy', (e) => {
    e.clipboardData.setData('text/plain', text)
    e.preventDefault()
    document.removeEventListener('copy', null)
  })
  document.execCommand('copy')
}

import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap'
import './styles/styles.css'

// add table class to tables
Array.from(document.querySelectorAll('table')).forEach(el => {
  el.classList.add('table')
});

// allow images to open in new tab
Array.from(document.querySelectorAll('.post img')).forEach(el => {
  el.onclick = () => window.open(el.src, '_blank');
})

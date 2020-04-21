import './utils.less'
const Toast = (text) => {
    if(!document.getElementById('toast')) {
        let body = document.getElementsByTagName('body')[0];
        let toast = document.createElement('div');
        toast.setAttribute('id','toast');
        toast.innerHTML = text;
        body.appendChild(toast)
        let toastTime = setTimeout( ()=> {
            body.removeChild(toast);
            clearTimeout(toastTime)
        },2000)
    }
}
const SuccessModal = () => {
    let body = document.getElementsByTagName('body')[0];
    let modal = document.createElement('div');
    modal.setAttribute('id','success-modal');
    modal.innerHTML = '<img style="width: 7.5rem" src="http://modulefile.holike.com/marketing/marketing/img/success_cx.png" />';
    body.appendChild(modal);
    const sucModal = document.getElementById('success-modal');
    sucModal.onclick = ()=> {
        sucModal.style.display = 'none';
    }
}

export {
    Toast,
    SuccessModal
};
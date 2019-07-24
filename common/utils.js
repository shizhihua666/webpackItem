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

export {
    Toast
};
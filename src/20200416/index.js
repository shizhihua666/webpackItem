import './index.less'
import Holike from '../../common/request'
import '../../common/rem'
import 'lazysizes';
import { Toast, SuccessModal } from '../../common/utils.js'
import Swiper from 'swiper'

const holike = new Holike();
var timeOut = null;
var isClick = true;
function ajaxRequest(name, phone) {
    if (isClick) {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            if (holike.checkPhone(phone)) {
                holike.getRequest({ name, phone }).then((data) => {
                    SuccessModal();
                    isClick = false;
                    let input = document.querySelectorAll('input');
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = null;
                    }
                }).catch(err => {
                    Toast('报名失败!')
                })
            }
        }, 300)
    } else {
        Toast('您刚刚已经报名了~')
    }
}

let fromBtn = document.getElementsByClassName('from-btn')[0];
let modelBtn = document.getElementsByClassName('model-from-btn')[0];

modelBtn.onclick = function () {
    let name = document.getElementsByClassName('name-input-model')[0].value;
    let phone = document.getElementsByClassName('tel-input-model')[0].value;
    ajaxRequest(name, phone)
}

fromBtn.onclick = function () {
    let name = document.getElementsByClassName('name-input')[0].value;
    let phone = document.getElementsByClassName('tel-input')[0].value;
    ajaxRequest(name, phone)
}


//显示隐藏model
const gary = document.getElementById('gary');
const close = document.getElementsByClassName('model-close')[0];
const model = document.getElementsByClassName('model')[0];
let floatBth = document.getElementsByClassName('float');

for (let i = 0; i < floatBth.length; i++) {
    floatBth[i].onclick = function () {
        gary.style.visibility = 'visible';
        model.style.transform = 'scale(1)';
    }
}
close.onclick = function () {
    gary.style.visibility = 'hidden';
    model.style.transform = 'scale(0)';
}



//阻止图片在手机浏览器自动放大
let img = document.getElementsByTagName('img');
for (let i = 0; i < img.length; i++) {
    img[i].addEventListener('click', function (e) {
        e.preventDefault()
    }, false)
}


const arr = [
    {
        date: '4月17日',
        text: '全能女神',
        name: '陈紫函'
    },
    {
        date: '4月25日',
        text: '百变大咖',
        name: '王祖蓝'
    },
    {
        date: '5月1日',
        text: '脱口秀一姐',
        name: '思文'
    },
    {
        date: '4月12日',
        text: '脱口秀冠军',
        name: '卡姆'
    },
]
const arr2 = ['全屋', '客厅', '餐厅', '主卧', '次卧', '阳台']
var swiper1 = new Swiper('#swiper1', {
    loop: true,
    pagination: '.swiper-pagination',
    autoplay: 3000,
    speed: 500,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
    uniqueNavElements: false,
    paginationClickable: true,
    paginationBulletRender: function (swiper, index, className) {
        return '<div class="' + className + '"><div class="swi-date">' + arr[index].date + '</div><div class="swi-text">' + arr[index].text + '</div><div class="swi-name">' + arr[index].name + '</div></div>';
    }
});

var swiper2 = new Swiper('#swiper2', {
    loop: true,
    autoplay: 3000,
    speed: 500,
    pagination: '.swiper2-pagination',
    uniqueNavElements: false,
    paginationClickable: true,
    paginationBulletRender: function (swiper, index, className) {
        return '<span class="' + className + '">' + arr2[index] + '</span>';
    }
})






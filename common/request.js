import axios from 'axios'

class Holike {
    constructor() {
        this.city = '';
        this.province = '';
        this.getIP();
    }
    //通过百度地图api获取地址
    getIP() {
        axios.jsonp = (url) => {
            if(!url){
                console.error('Axios.JSONP 至少需要一个url参数!')
                return;
            }
            return new Promise((resolve,reject) => {
                window.jsonCallBack =(result) => {
                    resolve(result)
                }
                var JSONP=document.createElement("script");
                JSONP.type="text/javascript";
                JSONP.src=`${url}&callback=jsonCallBack`;
                document.getElementsByTagName("head")[0].appendChild(JSONP);
                setTimeout(() => {
                    document.getElementsByTagName("head")[0].removeChild(JSONP)
                },0)
            })
        }
        axios.jsonp('https://api.map.baidu.com/location/ip?ak=UwCD9sEWtfYpvjPldLwLCvl4y7cnvbhk').then(res => {
            if(res.content) {
                console.log(res.content.address_detail)
                let PROVINCE='',CITY='',ADDRESS='';
                let p = res.content.address_detail.province
                let c = res.content.address_detail.city

                if (p.indexOf('市') > -1) {
                    PROVINCE = p.slice(0, p.indexOf('市'))

                } else if (p.indexOf('省') > -1) {
                    PROVINCE = p.slice(0, p.indexOf('省'))

                } else if (p.indexOf('自治区') > -1) {
                    PROVINCE = p.slice(0, p.indexOf('自治区'))
                } else if (p.indexOf('特别行政区') > -1) {
                    PROVINCE = p.slice(0, p.indexOf('特别行政区'))
                }
                CITY = c.slice(0, c.indexOf('市'))
                ADDRESS = '中国' + PROVINCE + CITY;

                this.city = CITY;
                this.province = ADDRESS;
            }else {
                console.log('获取地理位置失败')
            }
            
        })
        
    }
    //获取url参数
    getUrlQuery() { 
        var url = location.search; //获取url中"?"符后的字串  
        var theRequest = new Object();  
        if (url.indexOf("?") != -1) {  
            var str = url.substr(1);  
            var strs = str.split("&");  
            for(var i = 0; i < strs.length; i ++) {  
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
            }  
        }  
        return theRequest;  
    }
    //后台报名接口 
    getRequest(data) {
        if(data != null && typeof(data) == 'object') {
            var params = {
                name: data.name,    //用户姓名
                phone: data.phone,  //用户电话号码
                city: data.city ? data.city : this.city,     //用户所在城市
                province: data.address ? data.address : this.province,    //用户所在省份
                district: data.district ? data.district : '',       //用户所在地区
                adId: this.getUrlQuery().adId,    //渠道id
                info4: this.getUrlQuery().plan,   //用户报名专题名称
                source: this.getUrlQuery().source,    //用户报名渠道来源
                remark: data.remark,     //评论或说明
                url: location.href,     //获取url
                clickId: this.getUrlQuery().gdt_vid,
                mark: this.getUrlQuery().mark,
            }
        }else {
            alert("请上传参数或参数有错")
        }

        return new Promise((resolve,reject) => {
            axios.post('/marketing/marketing/customer/signup',params).then(res => {
                console.log(res)
            })
            axios.post('https://c.holike.com/newretail/api/customer/signup',params).then( res => {
                if(res.data.code == 0) {
                    resolve(res.data);
                }else {
                    reject();
                }
            }).catch(error => {
                alert('报名失败!')
            })
        })
    }
    checkPhone(tel) {
        if(tel=='' || tel==null) {
            alert('请输入手机号码！');
            return false; 
        }else if(!(/^1[34578]\d{9}$/.test(tel))) {
            alert("手机号码有误，请重填");  
            return false; 
        }else {
            return true; 
        }
    }
    checkName(name) {
        var regex = /^[\u4E00-\u9FA5]{1,5}$/; 
        if(name == '' || name == null) {
            alert('请输入名字!');
            return false; 
        }else if(!regex.test(name)) {
            alert("请填写正确的名字!");  
            return false; 
        }else {
            return true; 
        }
    }
}

export default Holike
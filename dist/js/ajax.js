class Ajax {
    static ajaxPost(url, data){
        return new Promise((resolve, reject) => {
            data = data || {};
            let str = '';
            for (let i in data) {
                str += `${i}=${data[i]}&`;
            }
            let xhr = new XMLHttpRequest();
            xhr.open('post', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else if (xhr.status !== 200) {
                        reject(xhr.status);
                    }
                }
            }
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(str);
        })

    }
    static ajaxGet(url, data) {
        return new Promise((resolve, reject) => {
            data = data || {};
            let str = '';
            for (let i in data) {
                str += `${i}=${data[i]}&`;
            }
            url = `${url}?${str}'__haha='${Date.now()}`;
            let xhr = new XMLHttpRequest();
            xhr.open('get', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else if (xhr.status !== 200) {
                        reject(xhr.status);
                    }
                }
            }
            xhr.send();
        })
    }
}




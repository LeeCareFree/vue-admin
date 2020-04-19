/**
 * 过滤特殊字符串
 */
export function stripscript(str) {
    var pattern = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（%）——|{ }【】‘；：”“'。，、？]"
    );
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, "");
    }
    return rs;
};
export function validateE(value) {
    // eslint-disable-next-line no-useless-escape
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value) ? true : false;
}

export function validateP(value) {
    // eslint-disable-next-line no-useless-escape
    let reg = /^[0-9a-zA-Z]{6,20}$/;
    return !reg.test(value) ? true : false;
}

export function validateC(value) {
    // eslint-disable-next-line no-useless-escape
    let reg = /^[a-z0-9]{4,6}$/;
    return !reg.test(value) ? true : false;
}



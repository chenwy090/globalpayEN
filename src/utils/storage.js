/**
 * Created by Toyuye on 20/05/2017.
 * @desc 初始化本地localStorage,如果被阻止,使用cookie存储
 */
import  cookie from './cookie';
let
    localStorage = (function () {
        let
            testKey = '__LOCALSTORAGETEST',
            storage = window.localStorage;
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return storage;
        }
        catch (error) {
            storage.setItem = function (key, value) {
                cookie.setCookie(key, value);
            };
            storage.getItem = function (key) {
                return cookie.getCookie(key);
            };
            storage.removeItem = function (key) {
                cookie.delCookie(key);
            };
            storage.clear = function () {
                cookie.delCookie();
            };
            return storage;
        }
    }());

export  default localStorage;

// WEBPACK FOOTER //
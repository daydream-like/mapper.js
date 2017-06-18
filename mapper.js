/**
 * Created by like on 2017/6/18.
 */
;(function(){
    function mapper() {
        var idCount = 0;

        //生成客户端ID
    var uniqueId = function (prefix) {
            var id = ++idCount+ '';
            return prefix?prefix+id:id;
        }
       this.elements = [];
       //获取map元素的个数
        this.size = function () {
            return this.elements.length;
        }
        //判断map是否为空
        this.isEmpty = function () {
            return this.elements.length === 0 ;
        }
        //删除map所有元素
        this.clear = function () {
            this.elements = [];
        }

        //向map中增加元素
        this.put = function (value) {
            var key = uniqueId('c');
            this.elements.push({
                cid:key,
                attributes:value
            })
        }
        //删除指定的key元素
        this.removeByCid = function (cid) {
            var flag = false ;
            try{
                for(var i=0,len = this.elements.length;i<len;i++){
                    if(this.elements[i]['cid'] === cid){
                        this.elements.splice(i,1);
                        flag = true;
                    }
                }
            }catch (e){
                flag = false ;
            }
            return flag ;
        }
        //获取指定的cid的元素
        this.get = function (cid) {
            var attributes ={};
           for(var i=0,len = this.elements.length;i<len;i++){
                if(this.elements[i]['cid'] === cid){
                    attributes = this.elements[i]['attributes'];
                    break;
                }
            }
            return attributes;
        }
        function getObjSize(obj) {
            var count = 0;
            for(var key in obj){
                count ++;
            }
            return count
        }
          //更改指定的cid元素的内容
        this.set = function (cid,obj) {
            if(!obj || Object.prototype.toString.call(obj) !== '[object Object]'||getObjSize(obj) === 0){
                return ;
             }
            for(var i=0,len = this.elements.length;i<len;i++){
                if(this.elements[i]['cid'] !== cid){
                    var attrs = this.elements[i]['attributes'];
                   for(var key in obj){
                      for(var attr in attrs){
                          if(key === attr){
                              attrs[attr] = obj[key];
                              break;
                          }
                      }
                   }
                }

            }
        }
        //获取指定元素的index
        this.getIndex = function (cid) {
            var index ;
            for(var i=0,len = this.elements.length;i<len;i++){
                if(this.elements[i]['cid'] === cid){
                     index = i;
                     break;
                }
            }
            return index;
        }
        //获取elements中有没有这个元素
        this.isContainerCid = function (cid) {
            for(var i=0,len = this.elements.length;i<len;i++){
                if(this.elements[i]['cid'] === cid){
                    return true;
                }
            }
            return false;
        }
        //获取map中所有的value
        this.value = function () {
            var arr = [] ;
            for(var i=0,len = this.elements.length;i<len;i++){
                arr.push(this.elements[i]["attributes"]);
            }
            return arr ;
        }
        //获取所有的cid
        this.cid = function () {
            var arr = [] ;
            for(var i=0,len = this.elements.length;i<len;i++){
                arr.push(this.elements[i]["cid"]);
            }
            return arr ;
        }
        //解析业务中的数据
        this.parse = function (data) {
            if(Object.prototype.toString.call(data) !== '[object Array]'){
                return false ;
            }
            if(data.length === 0){
                return [];
            }
            for(var i=0,len = data.length;i<len;i++){
                this.put(data[i]);
            }
        }
     }

    var moduleName = mapper;
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = moduleName;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() { return moduleName; });
    } else {
        this.mapper = moduleName;
    }
}).call((function() {
    return this || (typeof window !== 'undefined' ? window : global);
})());
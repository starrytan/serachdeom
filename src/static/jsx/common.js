
module.exports={
    lazyload:(dom)=>{
        const callback = function(entries, observer) { 
            entries.forEach(entry => {
                if(entry.intersectionRatio > 0){
                    entry.target.src = entry.target.getAttribute('data');
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target)
                }
                // entry.time;               // 触发的时间
                // entry.rootBounds;         // 根元素的位置矩形，这种情况下为视窗位置
                // entry.boundingClientRect; // 被观察者的位置举行
                // entry.intersectionRect;   // 重叠区域的位置矩形
                // entry.intersectionRatio;  // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
                // entry.target;             // 被观察者
            });
        };
            // threshold 表示重叠面积占被观察者的比例，从 0 - 1 取值，
            // 1 表示完全被包含
        const observer = new IntersectionObserver(callback, {thresholds:0.5});
        observer.observe(dom);
    },
    geturldata:(url)=>{
        if(url===''){
            return {};
        }
        console.log('url: ', url);
        let obj = {};
        url.split('?')[1].split('&').map((item)=>{
           let o = item.split('=');
           obj[o[0]] = o[1];
        })
        return obj
    }
}
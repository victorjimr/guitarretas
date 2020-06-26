const memcache = require('memory-cache')

module.exports = (cacheDurationInS) => {
    
    cacheDurationInS = cacheDurationInS || 60*60
    
    return (req,res,next)=>{
    
        let cacheKey = req.originalURL || req.url
        let cachedResponse = memcache.get(cacheKey)
    
        if(cachedResponse){
            res.send(cachedResponse)
            return
        }
    
        res.sendResponse = res.send
    
        res.send = (body)=>{
            memcache.put(cacheKey, body, cacheDurationInS*1000)
            res.sendResponse(body)
        }
    
        next()
    }
}     
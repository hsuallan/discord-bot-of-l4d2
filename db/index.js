const mongoose = require("mongoose")
const schema = require('./schema')
class crud {
     constructor() {
        this.db;
    }
    async _clear(){
        return await schema.deleteMany()
    }
    async connect(url) {
        return new Promise((res,rej)=>{
            mongoose.connect(url,{useNewUrlParser: true},(err)=>{rej(err)})
            this.db = mongoose.connection;
            this.db.once('open', function() {
                res()
            });

        })
    }
    async is_reapeat(data){
        return  await this.map_find(data) === null ? false : true   
    }
    async addMap(map){
        if(map.time == undefined) map.time = 0
        const m = new schema({
           "url": map.url,
           "title":map.title,
           "time": map.time,//0 = unfinished
        });
        try {
            return await m.save();
        } catch (error) {
            throw error
        }
    }
    async map_find(data) {
        return  /http/.test(data)? await schema.findOne({ "url": data }) :await schema.findOne({ "title": data });
    }
    async change_to_finish(data,time){
       const query =  /http/.test(data)?{ "url": data } :{ "title": data };
       const res = await schema.updateOne(query, { 'time':time });
       return res.n //update number
    }
    async finished(num){
        num = parseInt(num)
        if(isNaN(num)) num = 0
        if(num<0) num = 0
        if(num == 0){
            const docs = await schema.find({ time: {$gte:1} })
            docs.reverse()
            return docs
        }
        else{
            const docs = await schema.find({ time: {$gte:1} })
            docs.reverse()
            if(docs.length>num)docs.length = num
            return docs
        }
    }
    async now(){
        return await schema.findOne({time:0},'url')
    }
}
module.exports = crud;
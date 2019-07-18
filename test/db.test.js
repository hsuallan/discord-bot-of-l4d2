const crud  = require('../db/index')
const cfg = require('../cfg.json')
const db = new crud();
describe('DB test',()=>{
    it('db is alive',(done)=>{
        db.connect(cfg.testdb)
        .then((err)=>{if(err)console.log(err);else{done()}})
    })
    it('write data correctly', async ()=>{
        const test = {'title':'aaa','url':'https://testcase.jpg'}
        db.addMap(test).then((data)=>{
            data.title.should.equal(test.title)
            data.url.should.equal(test.url)
            data.time.should.equal(0)
        })
        
    })
    it('find by url',async()=>{
        const data = await db.map_find('https://testcase.jpg')
    })
    it('find by title',async ()=>{
        const data = await db.map_find('aaa')
        data.title.should.equal('aaa')
    })
    it('update correctly by title',async ()=>{
        const ans = await db.change_to_finish('aaa',new Date().valueOf())
        ans.should.equal(1)
    })
    it('update correctly by url',async ()=>{
        const ans = await db.change_to_finish('https://testcase.jpg',new Date().valueOf())
        ans.should.equal(1)
    })
    it('data is not in Document',async ()=>{
        const {r,ans} = await db.is_reapeat('aaa')
        r.should.equal(true)
    })
    it('data is in Document ',async ()=>{
        const {r,ans} = await db.is_reapeat('bbb')
        r.should.equal(false)
    })
    it('now',async ()=>{
        const test = {'title':'12345','url':'https://now.jpg'}
        await db.addMap(test)
        const ans = await db.now()
        ans.url.should.equal('https://now.jpg')
    })
})

describe('finished() test',()=>{
    before((done)=>{
        db._clear()
        .then(()=>{
            let test1 = {'title':'a0','url':'https://testcase0.jpg','time':1000}
            let test2 = {'title':'a1','url':'https://testcase1.jpg','time':1001}
            let test3 = {'title':'a2','url':'https://testcase2.jpg','time':1002}
            let test4 = {'title':'a3','url':'https://testcase3.jpg','time':1003}
            let test5 = {'title':'a4','url':'https://testcase4.jpg','time':1004}
            let test6 = {'title':'a5','url':'https://testcase4.jpg','time':-100}
            db.addMap(test1)
            .then(db.addMap(test2))
            .then(db.addMap(test3))
            .then(db.addMap(test4))
            .then(db.addMap(test5))
            .then(db.addMap(test6))
            .then(done())
        })
    })
    it('when arg not number',async ()=>{
        const ans = await db.finished('aaaa')
        ans.length.should.equal(5)
    })
    it('query correctly (time>0)',async ()=>{
        const ans = await db.finished(0)
        ans.length.should.equal(5)
    })
    
    it('when arg < 0 ',async ()=>{
        const ans = await db.finished(-10)
        ans.length.should.equal(5)
    })
    it('when arg > length',async ()=>{
        const ans = await db.finished(15)
        ans.length.should.equal(5)
    })
    it('when arg < length',async ()=>{
        const ans = await db.finished(3)
        ans.length.should.equal(3)
    })
})

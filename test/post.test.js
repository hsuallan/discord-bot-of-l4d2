const should = require('should')
const got = require('got')
const post = require('../post')
describe('post test ',()=>{
    it('test url is alive',async ()=>{
        const res = await got('https://www.gamemaps.com/details/21398')
        res.statusCode.should.equal(200)
    })
    it('Get data correctly ',async ()=>{
        const data = await post('https://www.gamemaps.com/details/21398')
        data.title.should.equal('《HOME TOWN》 (Left 4 Dead 2)')
        data.url.should.equal('https://www.gamemaps.com/details/21398')
    })
})
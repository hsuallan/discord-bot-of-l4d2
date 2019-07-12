const should = require('should')
const got = require('got')
const post = require('../post')
describe('post test (gamemaps)',()=>{
    it('test url is alive',async ()=>{
        const res = await got('https://www.gamemaps.com/details/21398')
        res.statusCode.should.equal(200)
    })
    it('Get data correctly ',async ()=>{
        const data = await post('https://www.gamemaps.com/details/21398')
        data.title.should.equal('《HOME TOWN》')
        data.url.should.equal('https://www.gamemaps.com/details/21398')
    })
})
describe('post test(steam)',()=>{
    it('test url is alive',async ()=>{
        const res = await got('https://steamcommunity.com/workshop/filedetails/?id=424688390')
        res.statusCode.should.equal(200)
    })
    it('Get data correctly ',async ()=>{
        const data = await post('https://steamcommunity.com/workshop/filedetails/?id=424688390')
        data.title.should.equal('Spectra Technologies Inc.')
        data.url.should.equal('https://steamcommunity.com/workshop/filedetails/?id=424688390')
    })
})
const got =require('got')
const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-url')()
])

module.exports = async (target)=>{
        const { body: html, url } = await got(target)
        const metadata = await metascraper({ html, url })
        return metadata
    }
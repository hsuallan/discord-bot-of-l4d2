const got =require('got')
const parse = require('node-html-parser')


module.exports = async (target)=>{
  try {
    if(/gamemaps/.test(target)){
      const response = await got(target);
      const data = parse.parse(response.body)
      let metadata = {'title':data.querySelector(".blocktitle").querySelector("span").innerHTML,'url':target}
      return metadata
    }
    if(/steamcommunity/.test(target)){
      const response = await got(target);
      const data = parse.parse(response.body)
      let metadata = {'title':data.querySelector(".workshopItemTitle").innerHTML,'url':target}
      return metadata
    }
  } catch (error) {
    return error
  }
  
}
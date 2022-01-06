import models from '../db/models'
export async function list (req, res, next) {
  console.log('\nAPI:Variant list')
  try {
    const results = await models.Variant.findAll()
    res.jsonp({
      results,
      total: results.length
    })
  } catch (e) {
    console.log(e)
    next(e)
  }
}
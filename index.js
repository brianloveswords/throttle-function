module.exports = throttle

function throttle(fn, opts) {
  opts = opts || {}
  const window = opts.window || 1
  const limit = opts.limit || 1
  const exact = opts.exact || false

  var  msBetweenCalls = ((window / limit) * 1000)
  if (!exact) msBetweenCalls += 10

  var lastCall;

  if (isNaN(msBetweenCalls))
    throw new Error('opts.window and opts.limit must both be numbers')

  return function limitedFn() {
    const args = arguments
    if (!lastCall) {
      lastCall = Date.now()
      return fn.apply(null, args)
    }
    const sinceLastCall = Date.now() - lastCall
    const timeRemaining = msBetweenCalls - sinceLastCall

    if (sinceLastCall < msBetweenCalls) {
      lastCall = lastCall + msBetweenCalls
      return setTimeout(function () {
        return fn.apply(null, args)
      }, timeRemaining)
    }
  }
}

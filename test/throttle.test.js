const throttle = require('..')
const test = require('tap').test

test('throttling', function (t) {
  var first, second, third

  const opts = { window: 60, limit: 180 }
  const getDate = throttle(function getDate(callback) {
    process.nextTick(function () { return callback(Date.now()) })
  }, opts)

  const ops = [
    getDate(function (date) { proceed() }),
    getDate(function (date) { first = date; proceed() }),
    getDate(function (date) { second = date; proceed() }),
    getDate(function (date) { third = date; proceed() }),
  ]

  var waiting = ops.length

  function proceed() {
    if (--waiting > 0) return

    const diff1 = second - first
    const diff2 = third - second

    t.notEqual(first, second, 'should not be the same')
    t.ok(diff1 >= 333, 'diff1 should be at least 333 ms')
    t.ok(diff2 >= 333, 'diff2 should be at least 333 ms')
    t.end()
  }
})

/*jshint -W030 */
var gremlin = require('../');

describe('Bindings', function() {
  it('should support bindings with client.execute()', function(done) {
    var client = gremlin.createClient();

    client.execute('g.v(x)', { x: 1 }, function(err, result) {
      (err === null).should.be.true;
      result.length.should.equal(1);
      done();
    });
  });

  it('should support bindings with client.stream()', function(done) {
    var client = gremlin.createClient();
    var stream = client.stream('g.v(x)', { x: 1 });

    stream.on('data', function(result) {
      result.id.should.equal(1);
    });

    stream.on('end', function() {
      done();
    });
  });
});
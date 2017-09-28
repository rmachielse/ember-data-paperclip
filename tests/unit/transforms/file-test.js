import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Transform | file', function() {
  setupTest('transform:file');

  it('exists', function() {
    let transform = this.subject();

    expect(transform).to.be.ok;

    expect(typeof transform.serialize).to.equal('function');
    expect(typeof transform.deserialize).to.equal('function');
  });
});

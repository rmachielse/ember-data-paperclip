import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import Ember from 'ember';
import { initialize } from 'dummy/initializers/file';
import destroyApp from '../../helpers/destroy-app';

const { Application, run } = Ember;

describe('Unit | Initializer | file', function() {
  let application;

  beforeEach(function() {
    run(function() {
      application = Application.create();
      application.deferReadiness();
    });
  });

  afterEach(function() {
    destroyApp(application);
  });

  // Replace this with your real tests.
  it('works', function() {
    initialize(application);

    // you would normally confirm the results of the initializer here
    expect(true).to.be.ok;
  });
});

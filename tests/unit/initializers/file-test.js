/* jshint expr:true */
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import { initialize } from 'ember-data-paperclip/initializers/file';

describe('FileInitializer', function() {
  let container, application;

  beforeEach(() => {
    Ember.run(() => {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  });

  it('works', function() {
    initialize(container, application);

    expect(true).to.be.ok;
  });
});

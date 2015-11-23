import DS from 'ember-data';

const { RootState } = DS;

export function initialize() {
  RootState.rolledBack = function(internalModel) {
    internalModel.triggerLater('rolledBack');
  };
}

/**
 * An initializer that ensures the `rolledBack` event
 *
 * @module ember-data-paperclip/initializers/file
 * @public
 */
export default {
  name: 'file',
  initialize
};

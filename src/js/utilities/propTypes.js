
function createRequiredPropType(validator) {
  return function (props, propName, componentName) {
    if (props[propName] == null) {
      throw new Error(`Prop '${propName}' is required but wasn't specified!`);
    }

    return validator(props, propName, componentName);
  };
}


export function haEntity(props, propName) {
  // From HA docs:
  // All states will always have an entity id, a state
  // and a timestamp when last updated and last changed.

  if (props[propName]) {
    const value = props[propName];

    if (typeof value !== 'object') {
      return new Error('Entity isn\'t an object!');
    }
    if (
      !Object.prototype.hasOwnProperty.call(value, 'entity_id') ||
      !Object.prototype.hasOwnProperty.call(value, 'state')
    ) {
      return new Error('Entity doesn\'t contain an entity_id property!');
    }
  }

  // assume all ok
  return null;
}

haEntity.isRequired = createRequiredPropType(haEntity);

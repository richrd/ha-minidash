
export function getEntityIcon(entity, fallback = 'checkbox-blank') {
  if (entity.attributes.icon) {
    return entity.attributes.icon.split(':')[1];
  }
  return fallback;
}


export function getEntityDomain(entity) {
  return entity.entity_id.split('.')[0];
}


export function getEntityIconWithState(entity) {
  console.log(entity);
  const switchTypes = ['switch', 'input_boolean'];

  let icon = 'checkbox-blank';

  const type = entity.entity_id.split('.')[0];

  if (entity.attributes.icon) {
    // Get provided icon and use an appropriate variant if available
    [, icon] = entity.attributes.icon.split(':');
    if (icon === 'led-off' && entity.state === 'on') {
      icon = 'led-on';
    }
  } else if (switchTypes.includes(type)) {
    // Switch on/off icons
    icon = 'toggle-switch-off';
    if (entity.state === 'on') {
      icon = 'toggle-switch';
    }
  } else if (entity.entity_id.startsWith('light.')) {
    // Light on/off icons
    icon = 'lightbulb';
    if (entity.state === 'on') {
      icon = 'lightbulb-on';
    }
  /*
  } else if (entity.attributes.device_class && entity.attributes.device_class === 'opening') {
    // Opening icons
    if (entity.entity_id.includes('door')) {
      return entity.state === 'off' ? 'door-closed' : 'door-open';
    }
    */
  }


  return icon;
}


export function entityIsHidden(entity) {
  if (entity.attributes.hidden) {
    return true;
  }
  return false;
}


export function entityIsToggleable(entity) {
  const toggleableDomains = ['switch', 'light', 'input_boolean'];
  return toggleableDomains.includes(getEntityDomain(entity));
}


export function entityIsGroup(entity) {
  return getEntityDomain(entity) === 'group';
}


export function entityIsRoom(entity) {
  return entity.entity_id.startsWith('group.room_');
}


export function getGroups(entities) {
  const groups = [];
  entities.forEach((item) => {
    if (entityIsGroup(item)) {
      groups.push(item);
    }
  });

  return groups;
}


export function getGroupsWithoutRooms(entities) {
  const groups = [];
  entities.forEach((item) => {
    if (entityIsGroup(item) && !entityIsRoom(item)) {
      groups.push(item);
    }
  });

  return groups;
}


export function getRoomGroups(entities) {
  const groups = [];
  entities.forEach((item) => {
    if (entityIsRoom(item)) {
      groups.push(item);
    }
  });

  return groups;
}


export function getEntityById(entities, entityId) {
  const match = entities.find(e => e.entity_id === entityId);
  if (!match) {
    return null;
  }
  return match;
}


export function getEntitiesByIds(entities, entityIdArr) {
  return entityIdArr.map(id => getEntityById(entities, id));
}


export function getEntitiesInGroup(entities, groupId) {
  const group = getEntityById(entities, `group.${groupId}`);
  if (!group) {
    return [];
  }
  return getEntitiesByIds(entities, group.attributes.entity_id);
}


export function getWundergroundIconName(entity) {
  if (entity.attributes.entity_picture && entity.attributes.entity_picture.includes('icons.wxug.com')) {
    let iconName = entity.attributes.entity_picture.split('/').pop().split('.')[0];
    iconName = iconName.startsWith('nt_') ? iconName.substr(3) : iconName;
    return iconName;
  }
  return null;
}

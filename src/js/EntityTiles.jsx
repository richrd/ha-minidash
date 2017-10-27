import React from 'react';
import PropTypes from 'prop-types';

import EntityTile from './EntityTile';


export default function EntityTiles({ entities }) {
  let tiles;

  if (entities) {
    tiles = entities.map((entity) => {
      if (!entity) {
        return null;
      }
      return <EntityTile key={entity.entity_id} entity={entity} />;
    });
  }

  return (
    <div className="entity-tiles layout-grid">
      {tiles}
    </div>
  );
}


EntityTiles.defaultProps = {};

EntityTiles.propTypes = {
  entities: PropTypes.any.isRequired,
};

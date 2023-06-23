import React from 'react';

function ArchiveTitle({ city }) {
  return <h2 className="archive-body-header">{city ? 'Chosen city - ' + city : 'Select city'}</h2>;
}

export default ArchiveTitle;

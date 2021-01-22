import PropTypes from 'prop-types';
import React from 'react';

export default function i18nEditorPreview({ value }) {
  return <div>blabla { value }</div>;
}

i18nEditorPreview.propTypes = {
  value: PropTypes.node,
};
import PropTypes from 'prop-types';
import React from 'react';

const ParagraphSection = ({content}) => {
    return (
        <p id='paragraph-section' className="text-lg my-2" aria-label='Paragraph section'>{content}</p>
    );
};
ParagraphSection.PropTypes = {
    content: PropTypes.string.isRequired,
};
export default ParagraphSection;

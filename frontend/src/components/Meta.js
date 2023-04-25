import React from 'react';
import Helmet from 'react-helmet';

const Meta = ({ title, description, keyword }) => {
    return (
        <Helmet>
            <title>
                {title}
            </title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keyword} />

        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Websklep',
    description: 'Web jak sklep!',
    keywords: 'spend money, shop, spend more money'
};

export default Meta;
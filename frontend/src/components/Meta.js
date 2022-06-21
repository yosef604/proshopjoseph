import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcom To  ProShop',
    description: 'We sell the best products for Cheap price',
    keywords: 'electronics, buy electronics, cheap electronics'
}

export default Meta
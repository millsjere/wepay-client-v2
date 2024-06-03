import React from 'react'
import PageHeader from './dashboard/PageHeader'

const Transactions = (props) => {


  return (
    <div>
        <PageHeader title={'Transactions'} link2={'payment'} user={props.user} />
        
    </div>
  )
}

export default Transactions
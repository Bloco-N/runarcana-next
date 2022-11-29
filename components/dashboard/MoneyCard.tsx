import React from 'react';
import Card from '../Card';

const MoneyCard = () => {
  return (
    <Card className='money-card'>
      <div>
        <input defaultValue={0} name='PL' className='attribute-value' type="number" />
        <p>pl</p>
      </div>
      <div>
        <input defaultValue={0} name='PO' className='attribute-value' type="number" />
        <p>po</p>
      </div>
      <div>
        <input defaultValue={0} name='PE' className='attribute-value' type="number" />
        <p>pe</p>
      </div>
      <div>
        <input defaultValue={0} name='PP' className='attribute-value' type="number" />
        <p>pp</p>
      </div>
      <div>
        <input defaultValue={0} name='PC' className='attribute-value' type="number" />
        <p>pc</p>
      </div>
    </Card>
  );
};

export default MoneyCard;
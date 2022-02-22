import React from 'react';

function Summary(props) {
  const { totalNumber, totalPrice } = props;
  return (
    <>
      <div className="col-md-4 summary">
        <div>
          <h5>
            <b>Summary</b>
          </h5>
        </div>
        <hr />
        <div className="row">
          <div className="col" style={{ paddingLeft: '0' }}>
            ITEMS {totalNumber}
          </div>
        </div>
        <div
          className="row"
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            padding: '2vh 0',
          }}
        >
          <div className="col">TOTAL PRICE</div>
          <div className="col text-right">${totalPrice}</div>
        </div>
        <button className="btn">CHECKOUT</button>
      </div>
    </>
  );
}

export default Summary;

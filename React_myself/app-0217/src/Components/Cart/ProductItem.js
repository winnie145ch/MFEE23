function ProductItem(props) {
  // every product item
  // {
  //    id:1,
  //    name: '咖啡色 T-shirt',
  //    categroy:'Shirt',
  //    image:'https://i.imgur.com/1GrakTl.jpg',
  //    price:300
  // }

  const { id, name, category, image, price, count, setCount } = props;

  return (
    <>
      <div className="row border-top border-bottom">
        <div className="row main align-items-center">
          <div className="col-2">
            <img className="img-fluid" src={image} alt="clothes" />
          </div>
          <div className="col">
            <div className="row text-muted">{category}</div>
            <div className="row">{name}</div>
          </div>
          <div className="col">
            <a
              href="#/"
              onClick={() => {
                if (count - 1 >= 1) setCount(count - 1);
              }}
            >
              -
            </a>
            <a href="#/" className="border">
              {count}
            </a>
            <a
              href="#/"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +
            </a>
          </div>
          <div className="col">
            ${price} <span className="close">&#10005;</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;

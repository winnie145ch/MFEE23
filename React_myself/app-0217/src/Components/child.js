function Child(props) {
  console.log(props);
  return (
    <>
      {props.name},{props.text}
    </>
  );
}
export default Child;

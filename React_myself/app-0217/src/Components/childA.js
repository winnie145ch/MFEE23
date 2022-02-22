function ChildA(props) {
  console.log(props);
  return (
    <>
      <h3>ChildA</h3>
      <p>{props.pData}</p>
    </>
  );
}
export default ChildA;

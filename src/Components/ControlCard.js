export default function ControlCard({ title }) {
  const alertStart = () => {
    window.alert("คุณกำลังกด Start" + title);
  };
  const titleArray = ["Logistic", "E-Commerce", "Banking"];
  const showData = () => {
    return (
      <div>
        <li>Hello</li>
        <li>World</li>
      </div>
    );
  };
  return (
    <div>
      <h1> {title} </h1>
      <button className="btn btn-success" onClick={() => alertStart()}>
        Start
      </button>
      <button className="btn btn-warning" onClick={() => alertStart()}>
        Restart
      </button>
      <button className="btn btn-danger" onClick={() => alertStart()}>
        Down
      </button>
      {showData()}
      {
        <div>
          {titleArray.map((eachData) => (
            <ControlCard title={eachData} />
          ))}
        </div>
      }
    </div>
  );
}

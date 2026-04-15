import "../style/component/button.css";
function Button(props) {
  return <button className={props.className}>{props.label}</button>;
}

export default Button;

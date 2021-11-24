export const Persons = (props) => {
    
    const {name, number} = props;
  
    return (
        <p>
          <span>
            {name}
            &nbsp;
            {number}
            <button onClick={props.action}>delete</button>
          </span>
        </p>
    )
  }

export default Persons;
export const Filter = (props) => {

    return (
        <div>
          Find countries: <input type='text' onChange={props.setValue} value={props.text}/>
        </div>
    )
}

export default Filter;
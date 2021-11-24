export const Filter = (props) => {
    return (
        <div>
          Filter shown with: <input type='text' onChange={props.setValue} value={props.text}/>
        </div>
    )
}

export default Filter;
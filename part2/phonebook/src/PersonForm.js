export const PersonForm = (props) => {
    return (
        <form onSubmit={props.setForm}>
            <div>
                name: <input type='text' onChange={props.setNameValue} value={props.textName}/>
            </div>
            <div>
                phone: <input type='tel' onChange={props.setNumberValue} value={props.textNumber}/>
            </div>
            <div>
                <button>add</button>
            </div>
        </form>
    )
}

export default PersonForm;
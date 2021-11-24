export const Notification = ((props) => {
    const {value, type} = props
    if (value === '') {
      return null
    }else if(type === 'success'){
        return (
            <div className="errorSuccess">
              {value}
            </div>
          )
    }else if(type === 'failure'){
        return (
            <div className="errorFailure">
              {value}
            </div>
          )
    }
  })

  export default Notification;
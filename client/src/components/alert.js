import React from 'react'

function Alert(props) {
  return (
   props.alert && <div style={{textAlign : 'center'}}>
      <div className={`alert alert-${props.alert.type}`} role="alert">
      {props.alert.message}
</div>
    </div>
  )
}

export default Alert

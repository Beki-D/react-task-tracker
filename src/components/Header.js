import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, showAddTasks, onShowAddTasks, likeCount, onLike }) => {
  // const onClick = (e) => {
  //   console.log(e.target.childNodes[0].data + " clicked!")
  // }
  // const onAdd = (e) => {
  //   console.log(e.target.childNodes[0].data + " clicked!")
  // }
  return (
    <header className="header">
        <h1>{title}</h1>
        <div>
          <Button color={showAddTasks ?  "red" : "#024110"} text={showAddTasks ? "Close" : "Add"} onClick={onShowAddTasks}/>
          <h4 style={{display:'inline'}}>{likeCount}</h4>
          <Button color="#437cac" text="Like" onClick={onLike} />
        </div>
    </header>
  )
}
Header.defaultProps = {
  title : "Task tracker"
}

Header.propTypes = {
  title : PropTypes.string.isRequired
}

// <h1 style = {headerStyle}>{title}</h1> 
// CSS in JS
// const headerStyle = {
//   color : "lime", 
//   backgroundColor: "rgba(178, 165, 100, 0.3)"
// }

export default Header
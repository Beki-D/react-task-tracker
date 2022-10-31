import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, showAddTasks, onShowAddTasks, likeCount, onLike }) => {
  // const onClick = (e) => {
  //   console.log(e.target.childNodes[0].data + " clicked!")
  // }
  // const onAdd = (e) => {
  //   console.log(e.target.childNodes[0].data + " clicked!")
  // }
  const location = useLocation();

  return (
    <header className="header">
        <h1>{title}</h1>
        <div>
          {location.pathname === '/' && <Button color={showAddTasks ?  "red" : "#024110"} text={showAddTasks ? "Close" : "Add"} onClick={onShowAddTasks}/>}
          {/* <h4 style={{display:'inline'}}>{likeCount}</h4> */}
          <Button text="Like" onClick={onLike} likes={likeCount} />
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
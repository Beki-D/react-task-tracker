import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {
  const onClick = (e) => {
    console.log(e.target.childNodes[0].data + " clicked!")
  }
  return (
    <header className="header">
        <h1>{title}</h1>
        <Button color="green" text="Boldy" onClick={onClick}/>
        <Button color="purple" text="old" onClick={onClick}/>
        <Button color="cyan" text="Boy" onClick={onClick}/>
    </header>
  )
}
Header.defaultProps = {
  title : "Task tracker default"
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
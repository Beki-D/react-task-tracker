import PropTypes from 'prop-types'
import { FiThumbsUp } from 'react-icons/fi'

const Button = ({ color, text, onClick}) => {
    return (
        <button onClick={onClick} className="btn" style={{ backgroundColor: color}}>
            {text+" "}
            {text === 'Like' && <FiThumbsUp /> }
        </button>
  )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button
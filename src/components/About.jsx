import { Link } from 'react-router-dom'

const About = () => {
    return ( 
        <div className='about'>
            <h3>React App made by Beki-D</h3>
            <p>&#10084; Traversy </p>
            <h4>Version 1.0.0</h4>
            <Link style={{display:"block"}} to='/'>Go back</Link>
        </div>
     );
}
 
export default About;
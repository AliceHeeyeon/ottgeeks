import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFigma } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
     <div className='footer-menu'>
        <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Privacy</li>
            <li>Terms of use</li>
        </ul>
     </div>
     <div className='footer-social'>
         <Link to='https://www.linkedin.com/in/alice-heeyeon-kim/'>
            <FaLinkedin />
         </Link>
         <Link to='https://github.com/AliceHeeyeon/ottgeeks'>
            <FaGithub />
         </Link>
         <Link to='https://www.figma.com/design/Trc0KBPhlPyYmaPCTye378/ottgeeks?node-id=0-1&t=Xv6ODoukVw8t7ClA-1'>
            <FaFigma />
         </Link>
     </div> 
     <div className='footer-copyright'>
        <p>©OTTGEEKS. All Rights Reserved</p>
     </div>
    </footer>
  )
}

export default Footer

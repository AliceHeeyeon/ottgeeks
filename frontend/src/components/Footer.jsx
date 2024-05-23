import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFigma } from "react-icons/fa";

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
        <FaLinkedin />
        <FaGithub />
        <FaFigma />

     </div> 
     <div className='footer-copyright'>
        <p>©OTTGEEKS. All Rights Reserved</p>
     </div>
    </footer>
  )
}

export default Footer

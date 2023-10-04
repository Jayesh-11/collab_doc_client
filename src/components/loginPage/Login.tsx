import { Button } from '@mui/material'
import styles from './Login.module.css'
import { useAuth } from '../../auth/Auth'
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { fbUser, login } = useAuth()
    const navigate = useNavigate()
    if (fbUser) {
        navigate("/")
    }
    return (
        <div className={styles.primaryBox}>
            <Button onClick={() => login()}>
                <GoogleIcon />
            </Button>
        </div>
    )
}

export default Login
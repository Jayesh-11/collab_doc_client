import { ColorRing } from 'react-loader-spinner'
import styles from './LoadingLogin.module.css'

const LoadingLogin = () => {
    return (
        <div className={styles.loaderContainer}>
            <ColorRing
                visible={true}
                height="100"
                width="100"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#66a0ff', '#ffcc29', '#4db6ac']}
            />
        </div>
    )
}

export default LoadingLogin
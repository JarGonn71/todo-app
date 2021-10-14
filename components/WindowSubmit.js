import styles from '../styles/Notice.module.scss'
import {useRef, useEffect} from 'react'


export default function WindowSubmit({setShowWindow, id, deleteNotice}) {
    const windowRef = useRef()

    const closeWindow = (e) => {
        const path = e.path
        if(!path.includes(windowRef.current)){
            setShowWindow(false)
        }
    }

    useEffect(()=>{
        document.body.addEventListener('click', closeWindow)
        return function(){
            document.body.removeEventListener('click', closeWindow)
        }
    }, [])


    return (
       <div ref={windowRef} className={styles.wrapperWindow}>
           <p>Вы действительно желаете удалить заметку?</p>
            <div onClick={() => {deleteNotice(id, setShowWindow)}}>Да</div>
       </div>
    )
}

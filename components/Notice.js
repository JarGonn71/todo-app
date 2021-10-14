import styles from '../styles/Notice.module.scss'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import {ru} from 'date-fns/locale'
import MyLink from './MyLink'
import WindowSubmit from './WindowSubmit'
import { BsFillPlusCircleFill } from "react-icons/bs";
import {useState} from 'react'
import { BsFillLightbulbFill, BsFillCheckSquareFill } from "react-icons/bs";



export default function Notice({_id, title, timeInfo, todo=[], deleteNotice}) {
    const newTodo = todo.slice(0, 2)
    const [showWindow, setShowWindow] = useState(false)
   
    return (
            <li className={styles.Notice}>
                <MyLink href={`/notice/${_id}`}>
                    <div className={styles.Notice__title}>{title}</div>
                    {timeInfo && <div className={styles.Notice__time}>{formatDistanceToNowStrict(Date.parse(timeInfo), { locale: ru })}</div>}
                    <ul>{newTodo.map((item,index)=>{
                        return <li  className={item.progress? styles.Notice__todo_active : styles.Notice__todo } key={index}>
                                {item.progress? <BsFillCheckSquareFill color="#05f505"/> : <BsFillLightbulbFill color="yellow"/>}
                                {item.text}
                            </li>
                    })}
                    </ul>
                </MyLink>
                <div className={styles.Notice__btnDelete}>
                    <BsFillPlusCircleFill onClick={()=> setShowWindow(prev=> !prev)}/>
                </div>
                { showWindow && <WindowSubmit setShowWindow={setShowWindow} id={_id} deleteNotice={deleteNotice}/> }
            </li>
       
        
    )
}

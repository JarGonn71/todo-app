import {useState} from 'react'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import {ru} from 'date-fns/locale'
import {BsFillPlusCircleFill, BsFillLightbulbFill, BsFillCheckSquareFill } from "react-icons/bs";

import {MyLink, WindowSubmit} from './'

import styles from '../styles/Notice.module.scss'

export default function Notice({_id, title, timeInfo, todo=[], deleteNotice}) {
    //Обрезания массива до двух элементов
    const newTodo = todo.slice(0, 2)

    //Состояние окна
    const [showWindow, setShowWindow] = useState(false)
    
    //Массив из TODO
    const listTodos = newTodo.map((item,index)=>{
            return  <li  className={item.progress? styles.Notice__todo_active : styles.Notice__todo } key={index}>
                        {item.progress? <BsFillCheckSquareFill color="#05f505"/> : <BsFillLightbulbFill color="yellow"/>}
                        {item.text}
                    </li>})

    return (
        <li className={styles.Notice}>
            <MyLink href={`/notice/${_id}`}>
                <div className={styles.Notice__title}>{title}</div>
                {timeInfo && <div className={styles.Notice__time}>{formatDistanceToNowStrict(Date.parse(timeInfo), { locale: ru })}</div>}
                <ul> {listTodos} </ul>
            </MyLink>

            <div className={styles.Notice__btnDelete}>
                <BsFillPlusCircleFill onClick={()=> setShowWindow(prev=> !prev)}/>
            </div>

            { showWindow && <WindowSubmit setShowWindow={setShowWindow} id={_id} deleteNotice={deleteNotice}/> }
        </li>
    )
}

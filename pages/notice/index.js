import { useState } from "react"
import {useRouter} from 'next/router'
import { AiOutlinePlus} from "react-icons/ai";
import axios from 'axios'

import {MainLayout, ComeBack} from '../../components'

import styles from '../../styles/AddNotice.module.scss'

export default function Notice() {
    const router = useRouter()
    //Состояния
    const [newTitle, setNewTitel] = useState('')
    const [todo, setTodo] = useState('')
    const [todoList, setTodoList] = useState([])

    const MyPlaceholder = "Новая заметка"

    const handleChange = (e) =>{
        setTodo(e.target.value)
    }
    
    //Создание todo
    const handleSubmit = () =>{
        if(todo){
            setTodoList([ ...todoList, {text: todo, progress: false} ])
            setTodo('')
        }
    }

    //Удаление todo
    const handleDelete = (todo) => {
        const updatedArr = todoList.filter(todoItem => todoList.indexOf(todoItem) != todoList.indexOf(todo))
        setTodoList(updatedArr)
    }

    //Функция создания новой заметки
    const createNewNotice = async () => {
        let time = new Date()
        let options = !newTitle? { title: MyPlaceholder, todo: todoList, timeInfo: time } : { title: newTitle, todo: todoList, timeInfo: time }
        try{
            await axios.post('https://jargon-todo.herokuapp.com/api/notice/add', options).then(() => router.push('/') )
        }catch(error){
            console.log(error)
        }
    }

    //Массив из Todo
    const listTodos = todoList.map((item, index)=>{
         return <li className={styles.AddNotice__todoItem} key={index}> 
                    <span>{index}</span>

                    <p>{item.text}</p>

                    <div onClick={()=>{ handleDelete(item)}} className={styles.AddNotice__btnDelete}>
                        <AiOutlinePlus/>
                    </div>
                </li>
    })

    return (
        <MainLayout titlePage={"create new Todo"}>
            <ComeBack/>
            <div className={styles.AddNotice}>

                <div className={styles.AddNotice__title}>
                    <input placeholder={MyPlaceholder} type="text" value={newTitle} onChange={(e) => setNewTitel(e.target.value)}/>
                </div>

                <div className={styles.AddNotice__addTodo}>
                    <input type="text" value={todo} onChange={handleChange}/>
                    <div className={styles.AddNotice__btnAdd} onClick={handleSubmit} >
                        <AiOutlinePlus />
                    </div>
                </div>
                
                <ul className={styles.AddNotice__todoItems}>
                    {listTodos}
                </ul>

                <div className={styles.AddNotice__btnSubmit}>
                    <button onClick={createNewNotice}>Создать заметку</button>
                </div>
                
            </div>

        </MainLayout>
        
    )
}
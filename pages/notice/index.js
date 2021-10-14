import { useState } from "react"
import MainLayout from '../../components/MainLayout'
import styles from '../../styles/AddNotice.module.scss'
import { AiOutlinePlus, AiOutlineSync } from "react-icons/ai";
import ComeBack from "../../components/ComeBack"
import axios from 'axios'
import {useRouter} from 'next/router'


export default function Notice() {
    const router = useRouter()
    const [newTitle, setNewTitel] = useState('')
    const MyPlaceholder = "Новая заметка"
    const [todo, setTodo] = useState('')
    const [todoList, setTodoList] = useState([])
   

    const handleChange = (e) =>{
        setTodo(e.target.value)
    }
    
    const handleSubmit = () =>{
        if(todo){
            setTodoList([ ...todoList,
                {
                text: todo,
                progress: false
                }])
            setTodo('')
        }
    }

    const handleDelete = (todo) => {
        const updatedArr = todoList.filter(todoItem => todoList.indexOf(todoItem) != todoList.indexOf(todo))

        setTodoList(updatedArr)

    }

    const createNewNotice = async () => {
        let time = new Date()
        let options = {}
        if(!newTitle){
            options = {
                title: MyPlaceholder,
                todo: todoList,
                timeInfo: time,
            }
        }else{
            options = {
                title: newTitle,
                todo: todoList,
                timeInfo: time,
            }
        }
        try{
            await axios.post('http://localhost:5000/api/notice/add', options)
            .then(() => router.push('/') )

        }catch(error){
            console.log(error)
        }
    }

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
                    {todoList.map((item, index)=>{
                        return <li className={styles.AddNotice__todoItem} key={index}> 
                        <span>{index}</span>
                        <p>{item.text}</p>
                        <div onClick={(e)=>{
                            e.preventDefault()
                            handleDelete(item)
                        }} className={styles.AddNotice__btnDelete}>
                        <AiOutlinePlus/></div>
                    </li>
                    })}
                </ul>
                <div className={styles.AddNotice__btnSubmit}>
                    <button onClick={createNewNotice}>Создать заметку</button>
                </div>
            </div>

        </MainLayout>
        
    )
}
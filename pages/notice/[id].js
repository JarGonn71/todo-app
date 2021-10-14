import { useRouter } from "next/router"
import {useState} from 'react'
import { AiOutlinePlus} from "react-icons/ai";
import { BsFillLightbulbFill, BsFillCheckSquareFill } from "react-icons/bs";
import axios from 'axios'

import {MainLayout, ComeBack} from "../../components"

import styles from '../../styles/AddNotice.module.scss'

export default function Named({notice}) {
    const router = useRouter()
    //Состояния
    const [activTitle, setActiveTitle] = useState(notice.title)
    const [todoList, setTodoList] = useState(notice.todo)
    const [todo, setTodo] = useState('')
    
    //Функция обновления заметки
    async function updateTodo(options){
      try{
        await axios.post(`https://jargon-todo.herokuapp.com/api/notice/update/${router.query.id}`, options)
      }catch(error){
          console.log(error)
      }
    }

    //Изменение состояния Тайтла
    const updateActiveItem = async (e) => {
        const options = {title: e.target.value}
        updateTodo(options).then(()=>{
          setActiveTitle(e.target.value)
        })
    }

    //Добавление TODO
    const addTodo = async () => {
      if(todo){
        const options = [ ...todoList, { text: todo, progress: false} ]
        updateTodo(options).then(()=>{
          setTodo('')
          setTodoList(options)
        })
      }
    }

    //Удаление TODO
    const deleteTodo = async (todo) => {
        const options = todoList.filter(todoItem => todoList.indexOf(todoItem) != todoList.indexOf(todo))
        updateTodo(options).then(()=>{
          setTodoList(options)
        })
    }

    //Изменение состояние TODO
    const handleChange = (e) =>{
      setTodo(e.target.value)
    }
    
    //Изменение состояния прогресса TODO
    const setProgress = async (item) => {
      item.progress = !item.progress
      const options = todoList.filter(obj => obj === item? item : obj)
      updateTodo(options).then(()=>{
        setTodoList(options)
      })
    }

    //Массив из TODO
    const listTodos = todoList.map((item, index)=> { return <li className={styles.AddNotice__todoItem} key={index}>
          <span onClick={() => { setProgress(item) }}>
            {item.progress? <BsFillCheckSquareFill color="#0db90d"/> : <BsFillLightbulbFill color="yellow"/>}
          </span>
          <p>{item.text}</p>
          <div onClick={() => { deleteTodo(item) }} className={styles.AddNotice__btnDelete}>
            <AiOutlinePlus/>
          </div>
         </li>
    })


    return (
        <MainLayout titlePage={`Notice ${router.query.id}`}>
            <ComeBack/>

            <div className={styles.AddNotice}>
                <div className={styles.AddNotice__title}>
                    <input onChange={(e) => updateActiveItem(e)} defaultValue={activTitle} type="text"/>
                </div>

                <div className={styles.AddNotice__addTodo}>
                    <input placeholder="Добавить Todo" type="text" value={todo} onChange={handleChange}/>
                    <div className={styles.AddNotice__btnAdd} onClick={addTodo}>
                        <AiOutlinePlus />
                    </div>
                </div>
                
                <ul className={styles.AddNotice__todoItems}>
                    {listTodos}
                </ul>
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`https://jargon-todo.herokuapp.com/api/notice/${context.query.id}`)
    const notice = await res.json()
  

    if (!notice) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {notice}, // will be passed to the page component as props
    }
  }


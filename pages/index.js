import {useState} from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios'

import {MyLink, MainLayout, Notice} from '../components'

import styles from '../styles/Home.module.scss'

export default function Home({data}) {
  //Получение с сервера даных
  const [listNotice, setListNotice] = useState(data)

  //Функция удаления заметки
  const deleteNotice = async (id, setShowWindow) => {
    const newListNotice = listNotice.filter(item => item._id != id)
    try{
        await axios.delete(`https://jargon-todo.herokuapp.com/api/notice/delete/${id}`).then(()=>{
            setShowWindow(false)
            setListNotice(newListNotice)
        })
      }catch(error){
          console.log(error)
      }
  }

  //Массив из Заметок
  const listNotices = listNotice.map((item, index) => { return <Notice key={item._id} {...item} deleteNotice={deleteNotice} /> })

  return (
    <MainLayout titlePage = "Todo Home">
      <div className={styles.Home}>

        <div className={styles.Home__link}>
          <MyLink href={"/notice"}><AiOutlinePlus/> Добавить заметку </MyLink>
        </div>

        <div className={styles.Home__container}>
            {listNotices}
        </div>

      </div>
    </MainLayout>
    
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://jargon-todo.herokuapp.com/api/notice/`)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {data}, // will be passed to the page component as props
  }
}

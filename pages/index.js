import styles from '../styles/Home.module.scss'
import MyLink from '../components/MyLink'
import MainLayout from '../components/MainLayout'
import Notice from '../components/Notice'
import { AiOutlinePlus } from "react-icons/ai";
import {useState} from 'react'
import axios from 'axios'


export default function Home({data, notFound}) {
  const [listNotice, setListNotice] = useState(data)

  const deleteNotice = async (id, setShowWindow) => {
    const newListNotice = listNotice.filter(item => item._id != id)
    console.log(newListNotice)
    try{
        await axios.delete(`http://localhost:5000/api/notice/delete/${id}`).then(()=>{
            setShowWindow(false)
            setListNotice(newListNotice)
        })
      }catch(error){
          console.log(error)
      }
}

  return (
    <MainLayout>
      <div className={styles.Home}>
        <div className={styles.Home__link}>
          <MyLink href={"/notice"}><AiOutlinePlus/> Добавить заметку </MyLink>
        </div>
        <div className={styles.Home__container}>
            {listNotice.map((item, index) => {
              return <Notice key={item._id} {...item} deleteNotice={deleteNotice} />
            })}
        </div>
      </div>
    </MainLayout>
    
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:5000/api/notice/`)
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

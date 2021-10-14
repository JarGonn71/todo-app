import MyLink from "./MyLink"
import styles from "../styles/ComeBack.module.scss"
import { AiOutlineArrowLeft } from "react-icons/ai";


export default function ComeBack() {
    return (
       <>
        <div className={styles.ComeBack}><MyLink href="/"><AiOutlineArrowLeft />Вернуться назад</MyLink></div>
       </>
    )
}

import MyLink from "./MyLink"
import { AiOutlineArrowLeft } from "react-icons/ai";

import styles from "../styles/ComeBack.module.scss"

export default function ComeBack() {
    return (
       <>
        <div className={styles.ComeBack}>
             <MyLink href="/"><AiOutlineArrowLeft />Вернуться назад</MyLink>
        </div>
       </>
    )
}

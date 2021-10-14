export default function TodoBox({text, progress}) {
   
    return (
        <li className={styles.AddNotice__todoItem} key={index}>
            <span>{index}</span>
            <p>{item.text}</p>
            <div className={styles.AddNotice__btnDelete}>
            <AiOutlinePlus/></div>
        </li>
    )
}

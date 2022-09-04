import style from './UpContainer.module.css'


export default function UpContainer({children}) {

    return (
        <div className={style.container}>

            <div className={style.shadow} />

            <div className={style.children}>
                {children}
            </div>
           
        </div>
    )
}
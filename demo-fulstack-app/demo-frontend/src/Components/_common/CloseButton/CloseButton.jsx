import style from './CloseButton.module.css'


const CloseButton  = ({onClick}) => {

    return (
        <div className={style.container} >

            <div className={style.icon} onClick={onClick} >
                X
            </div>
            
        </div>
    )
}

export default CloseButton;
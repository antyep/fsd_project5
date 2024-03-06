import "./CustomInput.css"

export const CustomInput = ({placeholder, type, name, handler, label, value }) => {
    return (
        <div>
            <div><label>{label}</label></div>
            <input placeholder={placeholder} type={type} name={name} onChange={(e) => handler(e)} value={value} />
        </div>
    )
}

type TextFiledViewProps = {
  label: string;
  placeholder: string;
}

export const TextFiledView = ({label, placeholder}: TextFiledViewProps) => {
  return (
    <div>
      <p>{label}</p>
      <div className="">
        <input type="text" placeholder={placeholder} />
      </div>
    </div>
  )
}

interface InputType{
    label: string;
    value: string;
    type: string;
    OnChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input(data: InputType) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700">{data.label}</label>
            <input onChange={data.OnChange} className="px-3 my-2 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" value={data.type === "number"? Number(data.value):data.value} type={data.type} />
        </div>
    )
}

export default Input
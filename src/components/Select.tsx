
interface SelectType {
    label: string;
    value: number;
    data: {id: number; option: string}[];
    OnChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}
function Select(data: SelectType) {
    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">{data.label}</label>

            <select onChange={e => data.OnChange(e)} value={data.value} className="px-3 my-1 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                {
                    data.data.length != 0 ? data.data.map((x) => <option key={x.id} value={x.id}> {x.option} </option>) : <option>test</option>
                }
            </select>

        </div>
    )
}

export default Select
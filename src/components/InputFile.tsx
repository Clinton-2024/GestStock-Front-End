
interface IData{
    label: string;
    handleFileChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputFile(data: IData) {
  return (
    <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-900 dark:text-white">
          {data.label}
        </label>
        <input className="px-3 py-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file" type="file" onChange={data.handleFileChange} />
    </div>
  )
}

export default InputFile
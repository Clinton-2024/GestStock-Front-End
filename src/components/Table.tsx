import React from 'react'

interface Props{
  setShowFormEdit : (value: React.SetStateAction<string>,key: number) => void;
  handleOnClickDetails : (value: React.SetStateAction<string> ,key: number) => void;
  setPhoto : (value: React.SetStateAction<string>, key: number) => void;
  handleOnClickDeleteMarchandise: ( value: React.SetStateAction<string>, key : number) => void; 
  handleOnClickUpdateStatusMarchandise: ( value: React.SetStateAction<string>, key : number) => void; 
  data: {id:number;
  Photo : string;
  Référence :string;
  Désignation : string;
  Catégorie : string;
  Unité : string;
  Seuil_d_alerte : string;
  Stock_initial : string;
  Prix_Unitaire : string;
  Total : string;}[]
} 
function Table(props :Props) {
  return (
    <table className="table-auto w-full text-center   border-collapse border border-slate-500">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="border border-slate-600 ">Photo</th>
              <th className="border border-slate-600 ">Référence</th>
              <th className="border border-slate-600 ">Désignation</th>
              <th className="border border-slate-600 ">Catégorie</th>
              <th className="border border-slate-600 ">Unité</th>
              <th className="border border-slate-600 ">Seuil d'alerte</th>
              <th className="border border-slate-600 ">Stock initial</th>
              <th className="border border-slate-600 ">Prix Unitaire</th>
              <th className="border border-slate-600 ">Total</th>
              <th className="border border-slate-600 ">Actions</th>
            </tr>
          </thead>
          <tbody>
           {props.data.map((d) => (
             <tr key={d.id}>
             <td onClick={() => {props.setPhoto("",d.id)}} className="border border-slate-700 py-2 text-sm">
               <img className="object-cover rounded-lg h-12 mx-auto cursor-pointer" src={d.Photo} alt="" />
             </td>
             <td className="border border-slate-700 py-2 text-sm ">{d.Référence}</td>
             <td className="border border-slate-700 py-2 text-sm ">{d.Désignation}</td>
             <td className="border border-slate-700 py-2 text-sm" >{d.Catégorie}</td>
             <td className="border border-slate-700 py-2 text-sm" >{d.Unité}</td>
             <td className="border border-slate-700 py-2 text-sm" >{d.Seuil_d_alerte}</td>
             <td className="border border-slate-700 py-2 text-sm" > {d.Stock_initial} </td>
             <td className="border border-slate-700 py-2 text-sm" > {d.Prix_Unitaire} </td>
             <td className="border border-slate-700 py-2 text-sm" > {d.Total} </td>
             <td className="border border-slate-700 py-2 text-sm ">
               <button key={d.id} onClick={() => { props.setShowFormEdit("", d.id) }} className="border-2 rounded-3xl text-xs border-black px-3 py-1 font-bold">Update</button>
               <button key={d.id} onClick={() => { props.handleOnClickDetails('', d.id) }} className="border-2 rounded-3xl text-xs border-black px-3 py-1 font-bold ml-2">Detail</button>
               <button key={d.id} onClick={() => {props.handleOnClickUpdateStatusMarchandise("",d.id)}} className="border-2 rounded-3xl text-xs border-black px-3 py-1 bg-green-500 text-white font-bold ml-2">Active</button>
               <button key={d.id} onClick={() => {props.handleOnClickDeleteMarchandise("",d.id)}} className="border-2 rounded-3xl text-xs border-black px-3 py-1 bg-red-500 text-white font-bold ml-2">Delete</button>
             </td>
           </tr>
           ))}
          </tbody>
        </table>
  )
}

export default Table
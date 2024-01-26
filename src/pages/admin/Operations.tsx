import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IOperationGetAllDto } from "../../types/global.type";
import httpModule from "../../helpers/http.module";


function Operations() {

  const [operations, setOperations] = useState<IOperationGetAllDto[]>([])


  const getDataOperations = () => {
    httpModule
      .get<IOperationGetAllDto[]>("/Operation/Get")
      .then((response) => {
        setOperations(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }
  useEffect(() => {

    getDataOperations();

  }, [])

  return (
    <div className="pt-5 bg-gray-100 h-full">
      <div className="flex flex-col gap-3 px-5">

        <div className="flex justify-between">
          <div className="ml-5 text-start text-2xl font-bold">Opérations</div>
          <Link to={"/admin/Operations/add"}>
            <button className="w-44 mr-5 border-2 font-bold rounded-2xl px-3 py-1 text-sm border-black content-start my-3">Nouvelle Opération</button>
          </Link>
        </div>

        <table className="table-auto w-full text-center  border-collapse border border-slate-500">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="border border-slate-600 ">Num</th>
              <th className="border border-slate-600 ">Référence</th>
              <th className="border border-slate-600 ">Désignation</th>
              <th className="border border-slate-600 ">Catégorie</th>
              <th className="border border-slate-600 ">Unité</th>
              <th className="border border-slate-600 ">Type</th>
              <th className="border border-slate-600 ">Qantité</th>
              <th className="border border-slate-600 ">Prix Unitaire</th>
              <th className="border border-slate-600 ">Total</th>
              <th className="border border-slate-600 ">Crée à</th>
              <th className="border border-slate-600 ">Mise à jour à</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((d: IOperationGetAllDto) => (
              <tr key={d.reference}>
                <td className="border border-slate-700  text-sm ">{d.num}</td>
                <td className="border border-slate-700  text-sm ">{d.reference}</td>
                <td className="border border-slate-700  text-sm ">{d.designation}</td>
                <td className="border border-slate-700  text-sm ">{d.categoryName}</td>
                <td className="border border-slate-700  text-sm ">{d.unite}</td>
                <td className="border border-slate-700  text-sm ">{d.type}</td>
                <td className="border border-slate-700  text-sm ">{d.quantity}</td>
                <td className="border border-slate-700  text-sm ">{d.price}</td>
                <td className="border border-slate-700  text-sm ">{d.total}</td>
                <td className="border border-slate-700  text-sm ">
                   {d.createdAt.split("T",1)}
                </td>
                <td className="border border-slate-700  text-sm ">
                  {d.updatedAt.split("T",1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </div>
  )
}

export default Operations
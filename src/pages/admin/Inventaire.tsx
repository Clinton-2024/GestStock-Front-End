import React, { useEffect, useState } from 'react'
import httpModule from '../../helpers/http.module';
import { IInventaireGetAllDto, StaticStatutInventaire } from '../../types/global.type';

function Inventaire() {

    const [inventaires, setInventaires] = useState<IInventaireGetAllDto[]>([])

    const getDataInventaire = () => {
        httpModule
            .get<IInventaireGetAllDto[]>("/Inventaire/Get")
            .then((response) => {
                console.log(response.data);
                setInventaires(response.data);
            })
            .catch((error) => {
                alert("Error");
                console.log(error);
            });
    }
    useEffect(() => {

        getDataInventaire();

    }, [])


    return (
        <div className="pt-5 bg-gray-100 h-full">
            <div className="flex flex-col gap-3 px-5">

                <div className="justify-between">
                    <div className="ml-5 text-start text-2xl font-bold">Inventaire</div>

                </div>

                <table className="table-auto w-full text-center  border-collapse border border-slate-500">
                    <thead>
                        <tr className="bg-gray-100 ">
                            <th className="border border-slate-600 ">Référence</th>
                            <th className="border border-slate-600 ">Désignation</th>
                            <th className="border border-slate-600 ">Catégorie</th>
                            <th className="border border-slate-600 ">Unité</th>
                            <th className="border border-slate-600 ">Seui d'alerte</th>
                            <th className="border border-slate-600 ">Stock initial</th>
                            <th className="border border-slate-600 ">Entrées</th>
                            <th className="border border-slate-600 ">Sortie</th>
                            <th className="border border-slate-600 ">Stock Final</th>
                            <th className="border border-slate-600 ">CUMP</th>
                            <th className="border border-slate-600 ">Valeur</th>
                            <th className="border border-slate-600 ">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            inventaires.map((d: IInventaireGetAllDto) => (
                                <tr key={d.reference}>
                                    <td className="border border-slate-700  text-sm ">{d.reference}</td>
                                    <td className="border border-slate-700  text-sm ">{d.designation}</td>
                                    <td className="border border-slate-700  text-sm ">{d.categoryName}</td>
                                    <td className="border border-slate-700  text-sm ">{d.unite}</td>
                                    <td className="border border-slate-700  text-sm ">{d.seuilAlerte}</td>
                                    <td className="border border-slate-700  text-sm ">{d.stockInitial}</td>
                                    <td className="border border-slate-700  text-sm ">{d.entries}</td>
                                    <td className="border border-slate-700  text-sm ">{d.output}</td>
                                    <td className="border border-slate-700  text-sm ">{d.stockFinal}</td>
                                    <td className="border border-slate-700  text-sm ">{d.cump}</td>
                                    <td className="border border-slate-700  text-sm ">{d.valeur}</td>
                                    {
                                    d.statut == StaticStatutInventaire.Normal?
                                     <td className="bg-green-200 border border-slate-700  text-sm ">{d.statut}</td>:
                                    d.statut == StaticStatutInventaire.Disponible?
                                    <td className="bg-orange-200 border border-slate-700  text-sm ">{d.statut}</td>:
                                    <td className="bg-red-200 border border-slate-700  text-sm ">{d.statut}</td>
                                    }
                                   
                                </tr>
                            ))
                        }
                    </tbody>
                </table>


            </div>
        </div>
    )
}

export default Inventaire
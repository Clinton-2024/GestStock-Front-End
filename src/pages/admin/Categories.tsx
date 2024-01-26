import React, { useState } from 'react'
import Input from '../../components/Input'
import { ICategoryCreateDto } from '../../types/global.type'
import httpModule from '../../helpers/http.module';

function Categories() {

    const [showFormNew, setShowFormNew] = useState<string>("hidden")
    const [categorie, setCategorie]= useState<ICategoryCreateDto>({name: ""});
    
    const handleOnChangeInputReference = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setCategorie({...categorie, name: e.target.value})
    }

    const handleClickSaveButton = () => {

        
        httpModule
          httpModule
            .post("/Category/Create", categorie)
            .then(() => {
                
                setShowFormNew("hidden")

            })
            .catch((error) => alert(error));
      };


    return (
        <div className="pt-5 bg-gray-100 h-full">
            <div className="flex flex-col gap-3 px-5">

                <div className="flex justify-between">
                    <div className="ml-5 text-start text-2xl font-bold">Catégories</div>
                    <button onClick={() => {setShowFormNew("")}} className="w-44 mr-5 border-2 font-bold rounded-2xl px-3 py-1 text-sm border-black content-start my-3">Nouvelle catégorie</button>

                </div>
                <table className="table-auto w-full text-center  border-collapse border border-slate-500">
                    <thead>
                        <tr className="bg-gray-100 ">
                            <th className="border border-slate-600 ">Id</th>
                            <th className="border border-slate-600 ">Nom</th>
                            <th className="border border-slate-600 ">Statut</th>
                            <th className="border border-slate-600 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td className="border border-slate-700  text-sm "></td>
                            <td className="border border-slate-700  text-sm "></td>
                            <td className="border border-slate-700  text-sm "></td>
                            <td className="border border-slate-700  text-sm ">

                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Formulaire pour modifier une marchandise */}
                <div className={showFormNew + " fixed top-0 right-0 bottom-0 left-0 w-full h-full p-1"} style={{ backgroundColor: "rgba(0,0,0,0.10)" }}>
                    <div className="bg-white w-2/5 mx-auto my-5 p-5 rounded-xl">
                        <h1 className="mb-5 text-lg font-bold">Nouvelle catégorie  </h1>
                        <div className="flex flex-col gap-5">
                            <div className="w-full flex flex-col gap-3">
                                <Input label={"Nom"} type={"text"} value={categorie.name} OnChange={handleOnChangeInputReference} />

                            </div>
                            <div className="flex gap-2 justify-end">
                                <button onClick={() => { setShowFormNew("hidden") }} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-red-500 text-white">Annuler</button>
                                <button onClick={handleClickSaveButton} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-green-500 text-white">Enregistrer</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Categories
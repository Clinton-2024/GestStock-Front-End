import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { ICategoryCreateDto, ICategoryGetAllDto } from '../../types/global.type'
import httpModule from '../../helpers/http.module';

function Categories() {

    const [showFormNew, setShowFormNew] = useState<string>("hidden")
    const [category, setCategory] = useState<ICategoryCreateDto>({ name: "" });
    const [categories, setCategories] = useState<ICategoryGetAllDto[]>([]);

    const handleOnChangeInputReference = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory({ ...category, name: e.target.value })
    }

    const handleClickSaveButton = () => {


        httpModule
        httpModule
            .post("/Category/Create", category)
            .then(() => {

                setShowFormNew("hidden")

            })
            .catch((error) => alert(error));
    };

    useEffect(() => {

        const getDataListCategory = () => {
            httpModule
                .get<ICategoryGetAllDto[]>("/Category/Get")
                .then((response) => {
                    console.log(response.data);
                    setCategories(response.data);
                })
                .catch((error) => {
                    alert("Error");
                    console.log(error);
                });
        }


        getDataListCategory();

    }, []);


    return (
        <div className="pt-5 bg-gray-100 h-full">
            <div className="flex flex-col gap-3 px-5">

                <div className="flex justify-between">
                    <div className="ml-5 text-start text-2xl font-bold">Catégories</div>
                    <button onClick={() => { setShowFormNew("") }} className="w-44 mr-5 border-2 font-bold rounded-2xl px-3 py-1 text-sm border-black content-start my-3">Nouvelle catégorie</button>

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
                        {
                            categories.map((d, index) => (
                                <tr key={index} >
                                    <td className="border border-slate-700  text-sm "> {d.isActive} </td>
                                    <td className="border border-slate-700  text-sm "> {d.name} </td>
                                    <td className="border border-slate-700  text-sm text-black my-2 ">
                                        <span className={"border-2 rounded-2xl text-xs  px-2 py-1 " + (String(d.isActive) === "true" ? "bg-green-500" : "bg-red-500") + " text-white font-bold ml-2"}></span>
                                    </td>
                                    <td className="border border-slate-700  text-sm ">test  </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                {/* Formulaire pour modifier une marchandise */}
                <div className={showFormNew + " fixed top-0 right-0 bottom-0 left-0 w-full h-full p-1"} style={{ backgroundColor: "rgba(0,0,0,0.10)" }}>
                    <div className="bg-white w-2/5 mx-auto my-5 p-5 rounded-xl">
                        <h1 className="mb-5 text-lg font-bold">Nouvelle catégorie  </h1>
                        <div className="flex flex-col gap-5">
                            <div className="w-full flex flex-col gap-3">
                                <Input label={"Nom"} type={"text"} value={category.name} OnChange={handleOnChangeInputReference} />

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
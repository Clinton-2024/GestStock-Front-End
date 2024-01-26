import React, { useEffect, useState } from 'react'
import Input from '../Input';
import Select from '../Select';
import InputFile from '../InputFile';
import { ICategoryGetAllDto } from '../../types/global.type';
import httpModule from '../../helpers/http.module';
import { useNavigate } from 'react-router-dom';
import { IMarchandiseCreateDto } from '../../types/global.type';



function NewFormMarchandise() {
    const [ListCategory, setListCategory] = useState<ICategoryGetAllDto[]>([]);
    const [marchandise, setMarchandise] = useState<IMarchandiseCreateDto>({
        reference: "",
        photo: "",
        designation: "",
        unite: "",
        seuilAlerte: 0,
        stockInitial: 0,
        prixUnitaire: 0,
        categoryId: 0
    });
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<string>("");

    const handleOnChangeInputReference = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarchandise({ ...marchandise, reference: e.target.value })
    }
    const handleOnChangeInputDesignation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarchandise({ ...marchandise, designation: e.target.value })

    }

    const handleOnChangeInputSeuilAlerte = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarchandise({ ...marchandise, seuilAlerte: Number(e.target.value) })
    }

    const handleOnChangeInputUnite = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMarchandise({ ...marchandise, unite: e.target.value })
    }

    const handleOnChangeInputStockInitial = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarchandise({ ...marchandise, stockInitial: Number(e.target.value) })
    }

    const handleOnChangeInputPrixUnitaire = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarchandise({ ...marchandise, prixUnitaire: Number(e.target.value) })
    }

    const handleOnChangeInputCategorie = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMarchandise({ ...marchandise, categoryId: Number(e.target.value) })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setMarchandise({ ...marchandise, photo: e.target.files[0].name });
            setPhoto(URL.createObjectURL(e.target.files[0]));

        }
    };

    const getData = () => {
        httpModule
            .get<ICategoryGetAllDto[]>("/Category/Get")
            .then((response) => {
                console.log(response.data);
                setListCategory(response.data);
            })
            .catch((error) => {
                alert("Error");
                console.log(error);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const handleClickSaveButton = () => {
        httpModule
            .post("/Marchandise/Create", marchandise)
            .then(() => {
                navigate('/admin/Marchandises', { replace: true });

            })
            .catch((error) => alert(error));
    };

    const handleClickBackButton = () => {
        navigate('/admin/Marchandises', { replace: true });

    };

    return (


        <div className="bg-white w-3/5 mx-auto mt-5 rounded-xl border-2 p-8 ">
            <h1 className="text-center  text-2xl mb-5 font-bold">Nouvelle Marchandise</h1>
            <div className="flex gap-5">
                <div className="w-full flex flex-col gap-3">
                    <Input label={"Référence"} type={"text"} value={marchandise.reference} OnChange={handleOnChangeInputReference} />

                    <InputFile label={"choisissez un fichier"} handleFileChange={handleFileChange} />
                    <img className='object-cover rounded-lg w-20 h-26 ' src={photo !== "" ? photo : "https://i.pinimg.com/564x/f0/a2/c4/f0a2c41001bb3bafc7d10705c51d62b2.jpg"} alt="" />
                </div>
                <div className="w-full flex flex-col gap-3">
                    <Input label={"Désignation"} type={"text"} value={marchandise.designation} OnChange={handleOnChangeInputDesignation} />
                    <Input label={"Seuil d'alerte"} type={"text"} value={marchandise.seuilAlerte.toString()} OnChange={handleOnChangeInputSeuilAlerte} />
                    <Select label={"Catégorie"} value={marchandise.categoryId.toString()} OnChange={handleOnChangeInputCategorie} data={ListCategory} />
                </div>
                <div className="w-full flex flex-col gap-3">
                    <Input label={"Stock initial"} type={"text"} value={marchandise.stockInitial.toString()} OnChange={handleOnChangeInputStockInitial} />
                    <Input label={"Prix unitaire"} type={"text"} value={marchandise.prixUnitaire.toString()} OnChange={handleOnChangeInputPrixUnitaire} />
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Unité</label>

                        <select onChange={handleOnChangeInputUnite} value={marchandise.unite} className="px-3 my-1 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                            {
                                ["$", "€"].map((x: string) => (<option key={x} value={x}> {x} </option>)) 
                            }
                        </select>

                    </div>

                </div>

            </div>
            <div className="flex gap-2 justify-end">
                <button onClick={handleClickBackButton} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-red-500 text-white">Annuler</button>
                <button onClick={handleClickSaveButton} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-green-500 text-white">Enregistrer</button>
            </div>
        </div>
    )
}

export default NewFormMarchandise
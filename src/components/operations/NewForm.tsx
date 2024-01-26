import { useEffect, useState } from "react"
import { IMarchandise, IMarchandiseGetDto, IOperationCreateDto } from "../../types/global.type"
import Input from "../Input"
import httpModule from "../../helpers/http.module";
import { useNavigate } from "react-router-dom";


function NewForm() {

    const navigate = useNavigate();
    const [operation, setOperation] = useState<IOperationCreateDto>(
        {
            price: 0,
            quantity: 0,
            type: "",
            reference: ""
        }
    );
    const [marchandise, setMarchandise] = useState<IMarchandiseGetDto>(
        {
            reference: "",
            photo: "",
            designation: "",
            unite: "",
            seuilAlerte: 0,
            stockInitial: 0,
            prixUnitaire: 0,
            total: 0,
            createdAt: "",
            updatedAt: "",
            isActive: true,
            categoryId: 0,
            categoryName: "",
        }
    )
    const [marchandises, setMarchandises] = useState<IMarchandise[]>([])
    const [result, setResult] = useState<IMarchandise[]>([])
    const [showBoxSerach, setShowBoxSerach] = useState<string>("hidden");
    const [showpointerColor, setShowpointerColor] = useState<string>("")
    const [elementList, setElementList] =useState<string>("")

    const handleOnChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMarchandise({ ...marchandise, reference: event.target.value })

    }

    const filterData = (element: IMarchandise) => {
        let i: number;
        let f: boolean = false;
        for (i = 0; i < element.reference.length; i++) {
            if (marchandise.reference.length == 1) {
                if (element.reference.split("")[i] === marchandise.reference) {
                    f = true
                }
            }else if(marchandise.reference.length > 1){
                if (element.reference.split("", marchandise.reference.length).join("") === marchandise.reference) {
                    f = true
                }
            }

        }
        return f

    }

    useEffect(() => {
        const resultSearch = marchandises.filter(filterData)
        setResult(
            resultSearch
        );
    }, [marchandise.reference])

    const handleOnClickInputReference = () => {
        getDataListMarchandise();
        setShowBoxSerach("");
    }
    const handleOnChangeInputDesignation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarchandise({ ...marchandise, designation: e.target.value })

    }
    const handleOnChangeInputUnite = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarchandise({ ...marchandise, unite: e.target.value })
    }
    const handleOnChangeInputCategorie = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarchandise({ ...marchandise, categoryName: e.target.value })
    }

    const handleOnChangeInputPrixUnitaire = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOperation({ ...operation, price: Number(e.target.value) })
    }
    const handleOnChangeInputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOperation({ ...operation, quantity: Number(e.target.value) })
    }

    const getDataListMarchandise = () => {
        httpModule
            .get<IMarchandise[]>("/Marchandise/Get")
            .then((response) => {
                console.log(response.data);
                setMarchandises(response.data);
            })
            .catch((error) => {
                alert("Error");
                console.log(error);
            });
    }



    const handleClickEntrieButton = () => {
        
        httpModule
            .post("/Operation/Create_Entrie", operation)
            .then(() => {
                navigate('/admin/Operations', { replace: true });

            })
            .catch((error) => alert(error));
    };

    const handleClickOutputButton = () => {
        
        httpModule
            .post("/Operation/Create_Output", operation)
            .then(() => {
                navigate('/admin/Operations', { replace: true });

            })
            .catch((error) => alert(error));
    };

    const handleClickBackButton = () => {
        navigate('/admin/Operations', { replace: true });

    };

    const handleClickSetReference =(data: IMarchandise) => {
         setMarchandise(data);
         setOperation({...operation, reference: data.reference});
         setShowBoxSerach("hidden")
    }

    const setPointerList = (data:string) => {
        setShowpointerColor("bg-blue-200 border-none rounded-lg");
        setElementList(data);
    }

    return (


        <div className="bg-white w-3/5 mx-auto mt-5 rounded-xl border-2 p-8 ">
            <h1 className="text-center  text-2xl mb-5 font-bold">Nouvelle Opération</h1>
            <p className="text-center text-sm">Veuillez saisir les détails de l'opération de vente ou d'achat</p>
            <div className="flex gap-5">
                <div className="w-full flex flex-col gap-3">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Référence</label>
                        <input onClick={handleOnClickInputReference} className="px-3 my-2 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" value={marchandise.reference} type="text" />
                    </div>
                    <Input label={"Désignation"} type={"text"} value={marchandise.designation} OnChange={handleOnChangeInputDesignation} />
                    <Input label={"Catégorie"} type={"text"} value={marchandise.categoryName} OnChange={handleOnChangeInputCategorie} />

                </div>
                <div className="w-full flex flex-col gap-3">
                    <Input label={"Unité"} type={"text"} value={marchandise.unite} OnChange={handleOnChangeInputUnite} />
                    <Input label={"Prix unitaire"} type={"text"} value={operation.price.toString()} OnChange={handleOnChangeInputPrixUnitaire} />
                    <Input label={"Quantité"} type={"text"} value={operation.quantity.toString()} OnChange={handleOnChangeInputQuantity} />

                </div>

            </div>
            <div className="flex gap-2 justify-end">
                <button onClick={handleClickBackButton} className="border-2 font-bold rounded-2xl px-5 py-1 text-sm border-blue my-3 bg-red-500 text-white">Annuler</button>
                <button onClick={handleClickEntrieButton} className="border-2 font-bold rounded-2xl px-5 py-1 text-sm border-blue my-3 bg-blue-500 text-white">Entrée</button>
                <button onClick={handleClickOutputButton} className="border-2 font-bold rounded-2xl px-5 py-1 text-sm border-blue my-3 bg-blue-500 text-white">Sortie</button>
            </div>
            {/* Formulaire pour consulter les détails d'une marchandise */}
            <div className={showBoxSerach + " fixed top-0 right-0 bottom-0 left-0 w-full h-full p-1"} style={{ backgroundColor: "rgba(0,0,0,0.10)" }}>
                <div className="bg-white w-2/5 mx-auto my-5 p-5 rounded-xl flex flex-col">
                    <div className="flex gap-2">
                        <input className="px-3 my-2 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" type="text" value={marchandise.reference} onChange={handleOnChangeInputSearch} />
                        <button onClick={() => { setShowBoxSerach("hidden") }} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-red-500 text-white">Annuler</button>

                    </div>
                    <ul className=" my-2 w-full mx-3">
                        {
                            result.map((d: IMarchandise) =>
                            (
                                <li key={d.reference} className={ (elementList == d.reference&& showpointerColor) + " flex gap-2 cursor-pointer my-1 p-2 text-xs"} onClick={() => {handleClickSetReference(d)}} onPointerOut={() => {setShowpointerColor("")}} onPointerOver={() => {setPointerList(d.reference)}}>
                                    <span>{d.reference}</span>
                                    <span>{d.designation}</span>
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default NewForm
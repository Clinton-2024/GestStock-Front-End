import { useEffect, useState } from "react"
import { IMarchandise, IMarchandiseEditDto } from "../../types/global.type"
import httpModule from "../../helpers/http.module";
import { Link } from "react-router-dom";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ICategoryGetAllDto, IMarchandiseGetDto } from '../../types/global.type';
import Input from "../../components/Input";
import Select from "../../components/Select";





function Marchandises() {

  const [reference, setReference] = useState<string>("");
  const [listmarchandises, setListMarchandises] = useState<IMarchandise[]>([]);
  const [showFormEdit, setShowFormEdit] = useState<string>('hidden');
  const [showFormDetail, setShowFormDetail] = useState<string>('hidden');
  const [ListCategory, setListCategory] = useState<ICategoryGetAllDto[]>([]);
  const [marchandise, setMarchandise] = useState<IMarchandiseGetDto>({
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
    isActive: false,
    categoryId: 0,
    categoryName: ""
  });
  const [marchandiseEditForm, setMarchandiseEditForm] = useState<IMarchandiseEditDto>(
    {
      reference: "",
      designation: "",
      unite: "",
      seuilAlerte: 0,
      stockInitial: 0,
      prixUnitaire: 0,
      categoryId: 0
    }
  )


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
    alert(e.target.value);
    setMarchandise({ ...marchandise, categoryId: Number(e.target.value) })
  }



  const getDataCategorie = () => {
    httpModule
      .get<ICategoryGetAllDto[]>("/Category/Get")
      .then((response) => {
        setListCategory(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }

  const handleShowFormUpdateMarchandise = (_marchandise: IMarchandiseGetDto) => {
    setReference(_marchandise.reference);
    getDataCategorie();
    setMarchandise(_marchandise);
    setShowFormEdit('');
  }

  const getDataListMarchandise = () => {
    httpModule
      .get<IMarchandise[]>("/Marchandise/Get")
      .then((response) => {
        console.log(response.data);
        setListMarchandises(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }

  useEffect(() => {
    getDataListMarchandise();

  }, []);

  const handleClickDeleteButton = (e: React.MouseEvent, key: string) => {
    e.preventDefault()
    httpModule
      .delete("/Marchandise/" + key)
      .then(() => {
        getDataListMarchandise();
      })
      .catch((error) => alert(error));
  };

  const handleClickSaveButton = () => {

    setMarchandiseEditForm({
      ...marchandiseEditForm, reference: marchandise.reference,
      designation: marchandise.designation,
      unite: marchandise.unite,
      seuilAlerte: marchandise.seuilAlerte,
      stockInitial: marchandise.stockInitial,
      prixUnitaire: marchandise.prixUnitaire,
      categoryId: marchandise.categoryId
    });

    httpModule
      .put("/Marchandise/" + reference, marchandiseEditForm)
      .then(() => {
        getDataListMarchandise();
        setShowFormEdit('hidden');
      })
      .catch((error) => alert(error));
  };




  return (
    <div className="pt-5 bg-gray-100 h-full">
      <div className="flex flex-col gap-3 px-5">

        <div className="flex justify-between">
          <div className="ml-5 text-start text-2xl font-bold">Marchandises</div>
          <Link to={"/admin/Marchandises/add"}>
            <button className="w-44 mr-5 border-2 font-bold rounded-2xl px-3 py-1 text-sm border-black content-start my-3">Nouvelle Marchandise</button>
          </Link>
        </div>

        <table className="table-auto w-full text-center  border-collapse border border-slate-500">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="border border-slate-600 ">Photo</th>
              <th className="border border-slate-600 ">Référence</th>
              <th className="border border-slate-600 ">Désignation</th>
              <th className="border border-slate-600 ">Catégorie</th>
              <th className="border border-slate-600 ">Statut</th>
              <th className="border border-slate-600 ">Unité</th>
              <th className="border border-slate-600 ">Seuil d'alerte</th>
              <th className="border border-slate-600 ">Stock initial</th>
              <th className="border border-slate-600 ">Prix Unitaire</th>
              <th className="border border-slate-600 ">Total</th>
              <th className="border border-slate-600 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listmarchandises.map((d: IMarchandise) => (
              <tr key={d.reference}>
                <td onClick={() => { setShowFormDetail('') }} className="border border-slate-700  text-sm">
                  <img  className="object-cover rounded-lg h-12 mx-auto cursor-pointer" src="https://i.pinimg.com/564x/f0/a2/c4/f0a2c41001bb3bafc7d10705c51d62b2.jpg" alt="" />
                </td>
                <td className="border border-slate-700  text-sm ">{d.reference}</td>
                <td className="border border-slate-700  text-sm ">{d.designation}</td>
                <td className="border border-slate-700  text-sm" >{d.categoryName}</td>
                <td className="border border-slate-700  text-sm" > <span className="border-2 rounded-2xl text-xs  px-2 py-1 bg-green-500 text-white font-bold ml-2"></span> </td>
                <td className="border border-slate-700  text-sm" >{d.unite}</td>
                <td className="border border-slate-700  text-sm" >{d.seuilAlerte}</td>
                <td className="border border-slate-700  text-sm" > {d.stockInitial} </td>
                <td className="border border-slate-700  text-sm" > {d.prixUnitaire} </td>
                <td className="border border-slate-700  text-sm" > {d.total} </td>
                <td className="border border-slate-700  text-sm ">
                  <button onClick={() => { handleShowFormUpdateMarchandise(d) }} > <EditRoundedIcon /> </button>
                  
                  <button onClick={(event) => { handleClickDeleteButton(event, d.reference) }}  > <DeleteOutlineIcon /> </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulaire pour modifier une marchandise */}
      <div className={showFormEdit + " fixed top-0 right-0 bottom-0 left-0 w-full h-full p-1"} style={{ backgroundColor: "rgba(0,0,0,0.10)" }}>
        <div className="bg-white w-3/5 mx-auto my-5 p-5 rounded-xl">
          <h1 className="mb-5 text-lg font-bold">Modifier la Marchandise : <span className=" text-red-400 ">  {marchandise.designation} </span> </h1>
          <div className="flex gap-5">
            <div className="w-full flex flex-col gap-3">
              <Input label={"Référence"} type={"text"} value={marchandise.reference} OnChange={handleOnChangeInputReference} />
              <Input label={"Stock initial"} type={"text"} value={marchandise.stockInitial.toString()} OnChange={handleOnChangeInputStockInitial} />
              <Select label={"Catégorie"} value={marchandise.categoryId.toString()} OnChange={handleOnChangeInputCategorie} data={ListCategory} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Input label={"Désignation"} type={"text"} value={marchandise.designation} OnChange={handleOnChangeInputDesignation} />
              <Input label={"Seuil d'alerte"} type={"text"} value={marchandise.seuilAlerte.toString()} OnChange={handleOnChangeInputSeuilAlerte} />

            </div>
            <div className="w-full flex flex-col gap-3">

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
            <button onClick={() => { setShowFormEdit("hidden") }} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-red-500 text-white">Annuler</button>
            <button onClick={handleClickSaveButton} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-green-500 text-white">Enregistrer</button>
          </div>
        </div>
      </div>

      {/* Formulaire pour consulter les détails d'une marchandise */}
      <div className={showFormDetail + " fixed top-0 right-0 bottom-0 left-0 w-full h-full p-1"} style={{ backgroundColor: "rgba(0,0,0,0.10)" }}>
        <div className="bg-white w-2/5 mx-auto my-5 p-5 rounded-xl flex flex-col">
          <h1 className="mb-5 text-lg font-bold">Détails d'une marchandise</h1>

          <div className="mx-auto">
            <img className='object-cover rounded-lg w-40 h-40 ' src="https://i.pinimg.com/564x/f0/a2/c4/f0a2c41001bb3bafc7d10705c51d62b2.jpg" alt="" />
          </div>
          

          <div className="flex gap-2 justify-end">
            <button onClick={() => { setShowFormDetail("hidden") }} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-red-500 text-white">Annuler</button>
            <button className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-green-500 text-white">Enregistrer</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Marchandises
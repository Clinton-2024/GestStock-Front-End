import { useState } from "react"
import Input from "../../components/Input"
import Select from "../../components/Select"
import InputFile from "../../components/InputFile"
import Table from "../../components/Table"


function Marchandises() {
  const Data = [
    {id:0,
      Photo : "https://i.pinimg.com/564x/c5/74/b3/c574b3e83b9e17387f64c6ede50f86da.jpg",
      Référence : "CH123",
      Désignation : "Chaussure 123",
      Catégorie : "Chausure",
      Unité : "$",
      Seuil_d_alerte : "5",
      Stock_initial : "5",
      Prix_Unitaire : "100",
      Total : "500"
    },
    {id:1,
      Photo : "https://i.pinimg.com/564x/c5/74/b3/c574b3e83b9e17387f64c6ede50f86da.jpg",
      Référence : "CH123",
      Désignation : "Chaussure 123",
      Catégorie : "Chausure",
      Unité : "$",
      Seuil_d_alerte : "5",
      Stock_initial : "5",
      Prix_Unitaire : "100",
      Total : "500"
    },{id:2,
      Photo : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      Référence : "CH123",
      Désignation : "Chaussure 123",
      Catégorie : "Chausure",
      Unité : "$",
      Seuil_d_alerte : "5",
      Stock_initial : "5",
      Prix_Unitaire : "100",
      Total : "500"
    },{id:3,
      Photo : "https://i.pinimg.com/564x/c5/74/b3/c574b3e83b9e17387f64c6ede50f86da.jpg",
      Référence : "CH123",
      Désignation : "Chaussure 123",
      Catégorie : "Chausure",
      Unité : "$",
      Seuil_d_alerte : "5",
      Stock_initial : "5",
      Prix_Unitaire : "100",
      Total : "500"
    },{id:4,
      Photo : "https://i.pinimg.com/564x/c5/74/b3/c574b3e83b9e17387f64c6ede50f86da.jpg",
      Référence : "CH123",
      Désignation : "Chaussure 123",
      Catégorie : "Chausure",
      Unité : "$",
      Seuil_d_alerte : "5",
      Stock_initial : "5",
      Prix_Unitaire : "100",
      Total : "500"
    },
  ]

  const [showFormNew, setShowForm] = useState("hidden")
  const [showFormEdit, setShowFormEdit] = useState("hidden")
  const [showFormDetail, setShowFormDetail] = useState("hidden")
  const [showPhoto, setPhoto] = useState("hidden")
  const [key, setKey] = useState<number | null>(null);

  const [reference, setReference] = useState({ reference: "", status: false, message: "" })
  const [designation, setDesignation] = useState({ designation: "", status: false, message: "" })
  const [categorie, setCategorie] = useState({ categorie: 0, status: false, message: "" })
  const [seuilAlerte, setSeuilAlerte] = useState({ seuilAlerte: 0, status: false, message: "" })
  const [stockInitial, setStockInitial] = useState({ stockInitial: 0, status: false, message: "" })
  const [prixUnitaire, setprixUnitaire] = useState({ prixUnitaire: 0, status: false, message: "" })
  const [file, setFile] = useState<File | null>(null);




  const handleOnChangeInputReference = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReference({ ...reference, reference: e.target.value })
  }
  const handleOnChangeInputDesignation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesignation({ ...designation, designation: e.target.value })

  }

  const handleOnChangeInputSeuilAlerte = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeuilAlerte({ ...seuilAlerte, seuilAlerte: Number(e.target.value) })
  }

  const handleOnChangeInputStockInitial = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockInitial({ ...stockInitial, stockInitial: Number(e.target.value) })
  }

  const handleOnChangeInputPrixUnitaire = (e: React.ChangeEvent<HTMLInputElement>) => {
    setprixUnitaire({ ...prixUnitaire, prixUnitaire: Number(e.target.value) })
  }

  const handleOnChangeInputCategorie = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategorie({ ...categorie, categorie: Number(e.target.value) })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleOnClick = (event: React.SetStateAction<string>, key: number) =>{
     setShowFormEdit("");
     setKey(key);
  }

  const handleOnClickDetails = (event: React.SetStateAction<string>, key: number) =>{
    alert("Form details : " + key);
     setShowFormDetail("");
  }

  const handleOnClickPhoto = (event: React.SetStateAction<string>, key: number) => {
     alert( "Form update photo : " + key);
      setPhoto("");
  }

  const handleOnClickDeleteMarchandise = (event: React.SetStateAction<string>,key: number) => {
    alert("Delete : " + key);
 }

 const handleOnClickUpdateStatusMarchandise = (event: React.SetStateAction<string>,key: number) => {
  alert("Status : " + key);
}



  return (
    <div className="pt-5 bg-gray-100 h-full">
      <div className="flex flex-col gap-3 px-5">
        <div className="flex justify-between">
          <div className="ml-5 text-start text-2xl font-bold">Marchandises</div>
          <button onClick={() => { setShowForm("") }} className="w-44 mr-5 border-2 font-bold rounded-2xl px-3 py-1 text-sm border-black content-start my-3">Nouvelle Marchandise</button>
        </div>
        <Table  setShowFormEdit={handleOnClick} handleOnClickDetails={handleOnClickDetails} setPhoto={handleOnClickPhoto} data={Data} handleOnClickDeleteMarchandise={handleOnClickDeleteMarchandise} handleOnClickUpdateStatusMarchandise={handleOnClickUpdateStatusMarchandise} />
      </div>
      {/* Formulaire pour créer une nouvelle marchandise */}
      <div className={showFormNew + " fixed top-0 right-0 bottom-0 left-0 w-full h-full p-1"} style={{ backgroundColor: "rgba(0,0,0,0.10)" }}>
        <div className="bg-white w-3/5 mx-auto my-5 p-5 rounded-xl">
          <h1 className="mb-5 text-lg font-bold">Nouvelle Marchandise</h1>
          <div className="flex gap-5">
            <div className="w-full flex flex-col gap-3">
              <Input label={"Référence"} type={"text"} value={reference.reference} OnChange={handleOnChangeInputReference} />
              <Input label={"Désignation"} type={"text"} value={designation.designation} OnChange={handleOnChangeInputDesignation} />
              <Select label={"Catégorie"} value={categorie.categorie} OnChange={handleOnChangeInputCategorie} data={[{ id: 1, option: "list" }]} />
              <InputFile label={"choisissez un fichier"} handleFileChange={handleFileChange} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Input label={"Seuil d'alerte"} type={"text"} value={seuilAlerte.seuilAlerte.toString()} OnChange={handleOnChangeInputSeuilAlerte} />
              <Input label={"Stock initial"} type={"text"} value={stockInitial.stockInitial.toString()} OnChange={handleOnChangeInputStockInitial} />
              <Input label={"Prix unitaire"} type={"text"} value={prixUnitaire.prixUnitaire.toString()} OnChange={handleOnChangeInputPrixUnitaire} />
            </div>

          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => { setShowForm("hidden") }} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-red-500 text-white">Annuler</button>
            <button className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-green-500 text-white">Enregistrer</button>
          </div>
        </div>
      </div>

      {/* Formulaire pour modifier une marchandise */}
      <div className={showFormEdit + " fixed top-0 right-0 bottom-0 left-0 w-full h-full p-1"} style={{ backgroundColor: "rgba(0,0,0,0.10)" }}>
        <div className="bg-white w-3/5 mx-auto my-5 p-5 rounded-xl">
          <h1 className="mb-5 text-lg font-bold">Modifier une Marchandise</h1>
          <div className="flex gap-5">
            <div className="w-full flex flex-col gap-3">
              <Input label={"Référence"} type={"text"} value={reference.reference} OnChange={handleOnChangeInputReference} />
              <Input label={"Désignation"} type={"text"} value={designation.designation} OnChange={handleOnChangeInputDesignation} />
              <Select label={"Catégorie"} value={categorie.categorie} OnChange={handleOnChangeInputCategorie} data={[{ id: 1, option: "list" }]} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Input label={"Seuil d'alerte"} type={"text"} value={seuilAlerte.seuilAlerte.toString()} OnChange={handleOnChangeInputSeuilAlerte} />
              <Input label={"Stock initial"} type={"text"} value={stockInitial.stockInitial.toString()} OnChange={handleOnChangeInputStockInitial} />
              <Input label={"Prix unitaire"} type={"text"} value={prixUnitaire.prixUnitaire.toString()} OnChange={handleOnChangeInputPrixUnitaire} />
            </div>

          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => { setShowFormEdit("hidden") }} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-red-500 text-white">Annuler</button>
            <button className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-green-500 text-white">Enregistrer</button>
          </div>
        </div>
      </div>
      
      {/* Formulaire pour consulter les détails d'une marchandise */}

      <div className={showFormDetail + " fixed top-0 right-0 bottom-0 left-0 w-full h-full p-1"} style={{ backgroundColor: "rgba(0,0,0,0.10)" }}>
        <div className="bg-white w-3/5 mx-auto my-5 p-5 rounded-xl">
          <h1 className="mb-5 text-lg font-bold">Détails d'une marchandise</h1>
          <div className="h-full w-full">

          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => { setShowFormDetail("hidden") }} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-red-500 text-white">Annuler</button>
            <button className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-green-500 text-white">Enregistrer</button>
          </div>
        </div>
      </div>

      <div className={showPhoto + " fixed top-0 right-0 bottom-0 left-0 w-full h-full p-1"} style={{ backgroundColor: "rgba(0,0,0,0.10)" }}>
        <div className="bg-white w-2/5 mx-auto my-5 p-5 rounded-xl">
          <h1 className="mb-2 text-lg font-bold">Modifier la photo d'une marchandise</h1>
          <div className="h-full w-full">
          <InputFile label={"choisissez une photo"} handleFileChange={handleFileChange} />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => { setPhoto("hidden") }} className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-red-500 text-white">Annuler</button>
            <button className="border-2 font-bold rounded-2xl px-3 py-1 text-sm border-blue my-3 bg-green-500 text-white">Enregistrer</button>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default Marchandises
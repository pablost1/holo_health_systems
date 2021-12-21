import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
// import { Formik, Field, Form } from 'formik';
// import * as Yup  from 'yup';
import { useState, useEffect, useContext, } from 'react';
import { Add, Delete} from '@material-ui/icons';
import http from '../../http/index';
import {  AuthContext } from '../../auth/authContext'




export default function VincularConsultorio() {
    
    const { handleError } = useContext(AuthContext)
    const [consultorios, setConsultorios ] = useState([])
    const [vinculos, setVinculos ] = useState([])


    async function VincularAoConsultorio(vinculo) {
        
        try {
            const { data } = await http.post('/medico/novo_consultorio', vinculo)
            handleError(data.mensagem)
        }

        catch(err) {
            
        }        
    }

    function DeletarVinculo(vinculoParaExcluir) {
        const vinculosFiltrados = vinculos.filter( vinculo => vinculo.id_consultorio !== vinculoParaExcluir.id_consultorio)
        setVinculos(vinculosFiltrados)
    }

    function AdicionarVinculo(VinculoParaAdicionar) {
        console.log(VinculoParaAdicionar)
        VincularAoConsultorio(VinculoParaAdicionar)
        
    }

    useEffect(() => {
        (
            async () => {
                const { data } = await http.get('/consultorio')
                setConsultorios(data.consultorio)
            }
        )()
        setVinculos(vinculos)
    }, [vinculos])


    return (
        <div className="vincular-consultorio-container">
            <DescriptionHeader path="medico-home">Vínculos do médico</DescriptionHeader>
            <div className="vincular-consultorio">
                
                <div className="">
                    <h1>Vincular a um consultório</h1>
                    <ListaItems onAdd={AdicionarVinculo} fetchData={consultorios}/>
                </div>
                <div className="">
                    <h1>Meus vínculos</h1>
                    <ListaItems forDelete={true} onDelete={DeletarVinculo} fetchData={vinculos}/>
                </div>
            </div>
        </div>
    )
}
  
  function ListaItems(props) {
    
    const [itemsPesquisados, setItemsPesquisados] = useState([]);
    const [itemBusca, setItemBusca] = useState('');
  
    function BuscaPorNome(nome) {
      const itemsFiltrados = props.fetchData.filter((item) => item.nome.includes(nome));
      setItemsPesquisados(itemsFiltrados);
    }
  
    useEffect(() => {
      //Execução do fetch dos items da lista
      BuscaPorNome(itemBusca);
    }, [itemBusca, props.fetchData]);
  
    return (
        <div>
            
            <div className="area-busca">
                <h2>Buscar</h2>
                <BarraDePesquisa value={itemBusca} handleChange={setItemBusca}/>
            </div>
            
            <div className="lista-consultorio-vinculo">
                {itemsPesquisados.map((item, index) => (
                    props.onAdd ? 
                <ConsultorioVinculado
                    className="consultorio consultorio-selecionado"
                    consultorio={item}
                    index={index}
                    add={props.onAdd}
                    
                /> : 
                <ConsultorioVinculado
                className="consultorio consultorio-selecionado"
                consultorio={item}
                index={index}
                delete={props.onDelete}
                forDelete={true}
                />
                ))}
                {
                    itemsPesquisados.length === 0 ? <h2>Nada foi encontrado</h2> : ''
                }
            </div>
        </div>
    );
  }

  const trashStyle = {
      marginLeft: 'auto',
      marginRight: '1rem'
  }
  
  function ConsultorioVinculado(props) {
    
    if(props.forDelete) {
        return (
            <p className={props.className}>

                {props.consultorio.nome} 
                <Delete style={trashStyle} onClick={() => props.delete(props.consultorio)} />   
            </p>
        )
    }
  
    return (
      <p className={props.className}>
        {props.consultorio.nome}
        <Add style={trashStyle} onClick={() => props.add(props.consultorio)}/>   
      </p>
    );
  }
  
  function BarraDePesquisa(props) {
    function handleChange(e) {
      props.handleChange(e.target.value);
    }
  
    return <input className="input-busca" value={props.value} onChange={handleChange} />;
  }
  
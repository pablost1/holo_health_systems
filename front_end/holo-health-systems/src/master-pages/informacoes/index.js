
import './style.css'
import DescriptionHeader from '../../sharable-components/description-header'
import Button from '../../sharable-components/button/index';



function Informacao(props) {

    if(props.type === 'estado') {
        return (
            <div className="informacao">
                <h3 className="nome">Estado</h3>
                <Button
                    size="small"  
                    status="danger"
                    style={{ marginLeft: 'auto', marginRight: '.5rem' }}
                >
                    Cancelar
                </Button>
            </div>
        )
    }


    if(props.type === 'cidade') {
        return (
            <div className="informacao-cidade">
                <h3 className="nome">Cidade</h3>
                <span>Estado</span>
                <Button
                    size="small"  
                    status="danger"
                    style={{ marginLeft: 'auto', marginRight: '.5rem' }}
                >
                    Cancelar
                </Button>
            </div>
        )

    }
}

export default function Informacoes() {


    return (
        <div className="informacoes-container">
            <DescriptionHeader>Informações</DescriptionHeader>
            <div className="informacoes">
                <h2>Estados</h2>
                <div className="lista-informacoes">
                    <Informacao type="estado"/>
                    <Informacao type="estado"/>
                    <Informacao type="estado"/>
                    <Informacao type="estado"/>
                    <Informacao type="estado"/>
                </div>
                <h2>Cidades</h2>
                <div className="lista-informacoes">
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>s
                </div>
            </div>
        </div>
    )
}
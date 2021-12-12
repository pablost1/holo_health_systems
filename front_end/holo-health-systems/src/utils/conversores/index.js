import moment from 'moment'
import { cpf } from 'cpf-cnpj-validator'



export function ConverterCPF(cpfEntrada) {
    return cpf.strip(cpfEntrada)
}

export function ConverterDataFrontParaBD(data) {
    return moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD')
}

export function ConverterDataBDparaFront(data) {
    return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY')
}

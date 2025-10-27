document.addEventListener('DOMContentLoaded', function () {
    carregarClientes();
    inicializarSelect2Cidades();

});

function inicializarSelect2Cidades() {
    const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Curitiba', 'Porto Alegre', 'Recife', 'Fortaleza', 'Campo Mourão', 'Florianópolis',
         'Goiânia', 'Manaus', 'Belém', 'João Pessoa', 'Natal', 'Maceió', 'Aracaju', 'Cuiabá', 'Vitória', 'Teresina','Palmas', 'Macapá', 'Rio Branco', 
         'Porto Velho', 'Boa Vista', 'São Luís', 'Campinas', 'São José dos Campos', 'Ribeirão Preto', 'Sorocaba', 'Jundiaí', 'Piracicaba', 'Bauru',
          'Franca', 'Londrina', 'Maringá', 'Caxias do Sul', 'Pelotas', 'Santa Maria', 'Joinville', 'Blumenau', 'Itajaí', 'Chapecó',
          'Dourados', 'Rondonópolis', 'Anápolis', 'Luziânia', 'Aparecida de Goiânia', 'Santarém', 'Marabá', 'Parauapebas','Itu', 'Barueri','Embu das Artes'];

    $('#clientCidade').select2({
        theme: 'bootstrap5',
        placeholder: 'Selecione a cidade',
        allowClear: true,
        data: cidades.map(cidade => ({ id: cidade, text: cidade }))
    }); 
}

// Validação de CPF (algoritmo da Receita Federal)
function validateCPF(cpf) {
    if (!cpf) return false;
    const onlyDigits = cpf.replace(/\D+/g, '');
    if (onlyDigits.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(onlyDigits)) return false; // todos os dígitos iguais -> inválido

    const digits = onlyDigits.split('').map(d => parseInt(d, 10));

    // primeiro dígito
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += digits[i] * (10 - i);
    let rem = sum % 11;
    let check1 = (rem < 2) ? 0 : 11 - rem;
    if (check1 !== digits[9]) return false;

    // segundo dígito
    sum = 0;
    for (let i = 0; i < 10; i++) sum += digits[i] * (11 - i);
    rem = sum % 11;
    let check2 = (rem < 2) ? 0 : 11 - rem;
    if (check2 !== digits[10]) return false;

    return true;
}

document.getElementById('clientCPF').addEventListener('blur', function () {
    const value = this.value;
    if (!validateCPF(value)) {
        alert('CPF inválido. Por favor, verifique e digite novamente.');
    }
});

document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('clientName').value;
    const cpf = document.getElementById('clientCPF').value;
    const telefone = document.getElementById('clientTelefone').value;
    const cidade = $('#clientCidade').select2('data')[0]?.text || '';
    const dtNascimento = document.getElementById('clientDtNascimento').value;
    const salario = document.getElementById('clientSalario').value;

    const salarioConvertivo = converterEmCentavos(salario);
    const credito = salarioConvertivo * 0.3;
    const creditoEmReal = converterEmReal(credito);

    const cliente = {
        name, cpf, telefone,cidade, dtNascimento, salario, creditoEmReal
    };


    function existCPFCadastro(cpf) {
        const total = obterTotalClientes();

        for (let i = 0; i < total; i++) {
            const cpfExistente = localStorage.getItem(`cliente_${i}_cpf`);

            if (cpfExistente === cpf) {
                return true;
            }
        }
        return false;
    }




    if (existCPFCadastro(cpf)) {
        alert('CPF já cadastrado. Por favor, verifique e digite novamente.');
    } else {
        salvarCliente(cliente);
        limparFormulario();
        alert('Cliente cadastrado com sucesso!');
    }

});



function obterTotalClientes() {
    return parseInt(localStorage.getItem('totalClientes') || '0', 10);
}

function salvarCliente(cliente) {

    const index = obterTotalClientes();

    localStorage.setItem(`cliente_${index}_name`, cliente.name);
    localStorage.setItem(`cliente_${index}_cpf`, cliente.cpf);
    localStorage.setItem(`cliente_${index}_telefone`, cliente.telefone);
    localStorage.setItem(`cliente_${index}_dtNascimento`, cliente.dtNascimento);
    localStorage.setItem(`cliente_${index}_salario`, cliente.salario);
    localStorage.setItem(`cliente_${index}_cidade`, cliente.cidade);
    localStorage.setItem(`cliente_${index}_creditoEmReal`, cliente.creditoEmReal);

    localStorage.setItem('totalClientes', index + 1);

    carregarClientes();

}

function limparFormulario() {
    document.getElementById('clientName').value = '';
    document.getElementById('clientCPF').value = '';
    document.getElementById('clientTelefone').value = '';
    document.getElementById('clientDtNascimento').value = '';
    document.getElementById('clientSalario').value = '';
}
function buscarClientes() {
    const total = obterTotalClientes();
    const clientes = [];

    for (let i = 0; i < total; i++) {
        const client = {
            name: localStorage.getItem(`cliente_${i}_name`),
            cpf: localStorage.getItem(`cliente_${i}_cpf`),
            telefone: localStorage.getItem(`cliente_${i}_telefone`),
            dtNascimento: localStorage.getItem(`cliente_${i}_dtNascimento`),
            salario: localStorage.getItem(`cliente_${i}_salario`),
            creditoEmReal: localStorage.getItem(`cliente_${i}_creditoEmReal`),
            cidade: localStorage.getItem(`cliente_${i}_cidade`) || '',
        };
        clientes.push(client);
    }

    return clientes;
}

function carregarClientes() {
    const clientes = buscarClientes();
    const tbody = document.getElementById('listaClientes');

    tbody.innerHTML = '';
    clientes.forEach(cli => {
        const tr = document.createElement('tr');
        const date = formatDate(cli.dtNascimento);
        tr.innerHTML = `
                    <td>${cli.name}</td>
                    <td>${cli.cpf}</td>
                    <td>${cli.telefone}</td>
                    <td>${date}</td>
                    <td>${cli.salario}</td>
                    <td>${cli.creditoEmReal}</td>
                    <td>${cli.cidade}</td>
                    `;
        tbody.appendChild(tr);
    });
}

function formatDate(dataStr) {
    if (!isNaN(dataStr)) return '';

    const parts = dataStr.split('-');
    if (parts.length === 3) {
        const [y, m, d] = parts;
        return `${d}/${m}/${y}`;
    }
}




function converterEmCentavos(salario) {
    const salarioEmCentavos = salario.replace(/[^\d,]/g, "").replace(",", ".");
    const salarioEmNumero = parseFloat(salarioEmCentavos);

    return Math.round(salarioEmNumero * 100);
}

function converterEmReal(credito) {
    const creditoConvertido = (credito / 100).toFixed(2);
    return creditoConvertido.replace(".", ",")
        .replace(/\d(?=(\d{3})+,)/g, '$&.');
}

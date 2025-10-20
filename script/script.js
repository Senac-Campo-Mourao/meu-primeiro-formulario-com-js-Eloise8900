
        $('#clientCPF').mask('000.000.000-00');
        $('#clientTelefone').mask('(00) 00000-0000');

        $('#clientSalario').maskMoney({
            prefix: 'R$ ',
            allowNegative: false, thousands: '.', decimal: ',', affixesStay: false
        });

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

        // Listener blur para validar CPF
        const cpfInput = document.getElementById('clientCPF');
        cpfInput.addEventListener('blur', function () {
            const value = cpfInput.value || '';
            const onlyDigits = value.replace(/\D+/g, '');
            if (onlyDigits.length === 0) return; // se vazio, não validar

            if (!validateCPF(value)) {
                alert('CPF inválido. Por favor, verifique e digite novamente.');

            }
        });

        document.getElementById('formCadastro').addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('clientName').value;
            const cpf = document.getElementById('clientCPF').value;
            const telefone = document.getElementById('clientTelefone').value;
            const dtNascimento = document.getElementById('clientDtNascimento').value;
            const salario = document.getElementById('clientSalario').value;

            const salarioConvertivo = converterEmCentavos(salario);
            const credito = salarioConvertivo * 0.3;
            const creditoEmReal = converterEmReal(credito);

            localStorage.setItem('name',name);
            localStorage.setItem('cpf',cpf);
            localStorage.setItem('telefone',telefone);
            localStorage.setItem('dtNascimento',dtNascimento);
            localStorage.setItem('salario',salario);
            localStorage.setItem('creditoEmReal',creditoEmReal);

   
        });
            limparFormulario();
                alert('Cliente cadastrado com sucesso!');
            

            function limparFormulario(){
                document.getElementById('clientName').value = '';
                document.getElementById('clientCPF').value = '';
                document.getElementById('clientTelefone').value = '';
                document.getElementById('clientDtNascimento').value = '';
                document.getElementById('clientSalario').value = '';
            }

            function mostrarCliente(){
                const name = localStorage.getItem('name');
                const cpf = localStorage.getItem('cpf');
                const telefone = localStorage.getItem('telefone');
                const dtNascimento = localStorage.getItem('dtNascimento');
                const salario = localStorage.getItem('salario');
                const credito = localStorage.getItem('creditoEmReal');

            alert(
                'Nome do cliente: ' + name + '\n' +
                'CPF: ' + cpf + '\n' +
                'Telefone: ' + telefone + '\n' +
                'Data de Nascimento: ' + dtNascimento + '\n' +
                'Salário: ' + salario + '\n' +
               'Crédito Disponível: R$ ' + converterEmReal(credito)
                 );
            }

        function converterEmCentavos(salario){
            const salarioEmCentavos = salario.replace(/[^\d,]/g,"").replace(",",".");
            const salarioEmNumero = parseFloat(salarioEmCentavos);

            return Math.round(salarioEmNumero * 100);
        }
        
        function converterEmReal(credito){
            const creditoConvertido = (credito / 100).toFixed(2);
            return creditoConvertido.replace(".", ",")
                .replace(/\d(?=(\d{3})+,)/g, '$&.');
        }

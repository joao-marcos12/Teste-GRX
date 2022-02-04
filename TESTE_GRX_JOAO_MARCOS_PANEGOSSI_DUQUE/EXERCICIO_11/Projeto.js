class Pessoa {
	constructor(nome, idade) {
		this.nome = nome;
		this.idade = idade;
	}
}

var listaPessoas = [];
var posicao = -1;

function adicionarPessoa(lista, pessoas) {
	lista.push(pessoas);
}

function atualizarPessoa(lista, pessoas, pos) {
	lista[pos] = pessoas;
}

function excluirPessoa(lista, pos) {
	lista.splice(pos, 1);
}

function ordernaIdade(a, b) {
	if (a.idade < b.idade) {
		return 1;
	} if (a.idade > b.idade) {
		return -1;
	}
	return 0;
}

function verificarNome(lista,pessoas){
	for (var i = 0; i < lista.length; i++) {
		if (pessoas.nome == lista[i].nome && posicao !== i)
			return true;
	}
	return false;
}

function listarPessoa(lista) {
	var auxHtml = '<thead' +
		'<tr>' +
		'<th>Nome</th>' +
		'<th>Idade</th>' +
		'<th>Alterar</th>' +
		'<th>Excluir</th>' +
		'</tr>' +
		'</thead>';
	for (var i = 0; i < lista.length; i++) {
		auxHtml += '<tr>' +
			'<td>' + lista[i].nome + '</td>' +
			'<td>' + lista[i].idade + '</td>' +
			'<td><a class="btn btn-warning btAlterar" rel="' + i + '">A</a></td>' +
			'<td><a class="btn btn-danger btExcluir" rel="' + i + '">X</a></td>' +
			'</tr>';
	}
	return auxHtml;
}

$(document).ready(function () {
	$('#btSalvar').click(function () {

		var nome = $('#nome').val();
		var idade = $('#idade').val();
		var pessoas = new Pessoa(nome, idade);
		var existe = verificarNome(listaPessoas,pessoas);
		
		if (!existe) {

			if (posicao === -1) {
				adicionarPessoa(listaPessoas, pessoas);

			}
			else {
				atualizarPessoa(listaPessoas, pessoas, posicao);
				posicao = -1;
			}

			listaPessoas.sort(ordernaIdade);

			$('#tabela').html(listarPessoa(listaPessoas));

			$('input').val('');
		}
		else {
			alert('Está pessoa já existe!');
		}
	});

	$('body').on('click', '.btAlterar', function (evento) {
		var elemento = evento.target || evento.SrcElement;
		posicao = parseInt(elemento.rel);
		if (confirm('Deseja Alterar?')) {
			$('#nome').val(listaPessoas[posicao].nome);
			$('#idade').val(listaPessoas[posicao].idade);
		}

	});


	$('body').on('click', '.btExcluir', function (evento) {
		var elemento = evento.target || evento.srcElement;
		if (confirm('Excluir Pessoa?') == true) {
			excluirPessoa(listaPessoas, elemento.rel);
			$('#tabela').html(listarPessoa(listaPessoas));
		}
	});


	$('#btCancelar').click(function () {
		$('input').val('');
		posicao = -1;
	});

});

